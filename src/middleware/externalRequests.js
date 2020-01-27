'use strict'

const axios = require('axios')
const logger = require('../logger')
const {createOrchestration} = require('../orchestrations')
const {constructOpenhimResponse} = require('../openhim')

const performRequests = requests => {
  return requests.map(requestDetails => {
    return axios(prepareRequestConfig(requestDetails))
      .then(res => {
        // Assign any data received from the response to the assigned id in the context
        return {[requestDetails.id]: res.data}
      })
      .catch(error => {
        logger.error(
          `Failed Request Config ${JSON.stringify(error.config, null, 2)}`
        )
        if (error.response) {
          throw new Error(
            `Incorrect status code ${error.response.status}. ${error.response.data.message}`
          )
        } else if (error.request) {
          throw new Error(
            `No response from lookup '${requestDetails.id}'. ${error.request}`
          )
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error(`Unhandled Error: ${error.message}`)
        }
      })
  })
}

const prepareLookupRequests = ctx => {
  const requests = Object.assign({}, ctx.state.metaData.requests)
  if (requests && requests.lookup && requests.lookup.length > 0) {
    const responseData = performRequests(requests.lookup)

    return Promise.all(responseData)
      .then(data => {
        logger.info(
          `${ctx.state.metaData.name} (${ctx.state.uuid}): Successfully performed request/s`
        )
        ctx.externalRequests = Object.assign({}, ...data)
      })
      .catch(err => {
        throw new Error(`Rejected Promise: ${err}`)
      })
  } else {
    logger.debug(
      `${ctx.state.metaData.name} (${ctx.state.uuid}): No request/s to make`
    )
  }
}

const prepareRequestConfig = requestDetails => {
  const requestOptions = Object.assign({}, requestDetails.config)
  // This step is separated out as in future the URL contained within the config
  // can be manipulated to add URL parameters taken from the body of an incoming request
  return requestOptions
}

exports.requestsMiddleware = () => async (ctx, next) => {
  await prepareLookupRequests(ctx)
  await next()
  await orchestrateMappingResult(ctx)
}

// For now only json data is processed
const orchestrateMappingResult = async ctx => {
  const requests = ctx.state.metaData.requests

  // Send request downstream only when mapping has been successful
  if (ctx && ctx.status === 200) {
    if (
      requests &&
      Array.isArray(requests.response) &&
      requests.response.length
    ) {
      //Create orchestrations
      if (!ctx.orchestrations) {
        ctx.orchestrations = []
      }

      const promises = requests.response.map(request => {
        if (request && request.url && request.method && request.id) {
          const body = ctx.body
          const axiosConfig = createAxiosConfig(request, body)

          // Empty the request body. It contains the mapped data
          ctx.body = {}
          return sendMappedObject(ctx, axiosConfig, request, body)
        }
      })

      await Promise.all(promises)
        .then(() => {
          logger.info('Mapped object successfully orchestrated')
          setStatusText(ctx)
        })
        .catch(err => {
          logger.error(`Mapped object orchestration failure: ${err.message}`)
        })

      // Respond in openhim mediator format if request came from the openhim
      if (ctx.request.header && ctx.request.header['X-OpenHIM-TransactionID']) {
        ctx.set('Content-Type', 'application/json+openhim')
        const date = new Date()

        constructOpenhimResponse(ctx, date)
      }
    }
  }
}

/*
  Function that handles request errors.
  It also sets the status code and flags which are used to determine the status Text for the response.
  The function also sets the koa response
*/
const handleRequestError = (ctx, request, err) => {
  let response, error

  if (err.response) {
    response = err.response

    // Axios response has the data property not the body
    response.body = response.data

    if (response.status >= 500) {
      if (request.primary) {
        setKoaResponseBodyFromPrimary(ctx, request, response.data)

        ctx.primaryReqFailError = true
        ctx.status = response.status
      } else {
        ctx.secondaryFailError = true

        setKoaResponseBody(ctx, request, response.data)
      }
    } else {
      if (request.primary) {
        setKoaResponseBodyFromPrimary(ctx, request, response.data)

        ctx.primaryCompleted = true
        ctx.status = response.status
      } else {
        ctx.secondaryCompleted = true

        setKoaResponseBody(ctx, request, response.data)
      }
    }
  } else {
    if (request.primary) {
      setKoaResponseBodyFromPrimary(ctx, request, err.message)

      ctx.primaryReqFailError = true
      ctx.status = 500
    } else {
      ctx.secondaryFailError = true

      setKoaResponseBody(ctx, request, err.message)
    }
    error = {message: err.message}
  }

  return {response, error}
}

// Sets the koa response body from the primary request's response body
const setKoaResponseBodyFromPrimary = (ctx, request, body) => {
  ctx.hasPrimaryRequest = true
  ctx.body = {}
  ctx.body[request.id] = body
}

// Sets the koa response body if there is no primary request
const setKoaResponseBody = (ctx, request, body) => {
  if (!ctx.hasPrimaryRequest) {
    ctx.body[request.id] = body
  }
}

const createAxiosConfig = (request, body) => {
  const axiosConfig = {
    url: request.url,
    method: request.method,
    body: body
  }

  if (
    request.credentials &&
    request.credentials.username &&
    request.credentials.password
  ) {
    axiosConfig.auth = {
      username: request.credentials.username,
      password: request.credentials.password
    }
  }

  if (request.headers) {
    axiosConfig.headers = request.headers
  }

  return axiosConfig
}

const sendMappedObject = (ctx, axiosConfig, request, body) => {
  const reqTimestamp = new Date()
  let response, error, responseTimestamp

  return axios(axiosConfig)
    .then(resp => {
      response = resp
      response.body = resp.data
      responseTimestamp = new Date()

      if (request.primary) {
        setKoaResponseBodyFromPrimary(ctx, request, response.body)

        ctx.status = response.status
      } else {
        setKoaResponseBodyFromPrimary(ctx, request, response.body)
      }
    })
    .catch(err => {
      responseTimestamp = new Date()

      const result = handleRequestError(ctx, request, err)
      response = result.response
      error = result.error
    })
    .finally(() => {
      if (ctx.request.header && ctx.request.header['X-OpenHIM-TransactionID']) {
        const orch = createOrchestration(
          request,
          body,
          response,
          reqTimestamp,
          responseTimestamp,
          request.id,
          error
        )

        ctx.orchestrations.push(orch)
      }
    })
}

const setStatusText = ctx => {
  if (ctx.primaryReqFailError) {
    ctx.statusText = 'Failed'
  } else if (!ctx.primaryReqFailError && ctx.secondaryFailError) {
    ctx.statusText = 'Completed with error(s)'
  } else if (
    !ctx.primaryReqFailError &&
    !ctx.secondaryFailError &&
    (ctx.primaryCompleted || ctx.secondaryCompleted)
  ) {
    ctx.statusText = 'Completed'
  } else {
    ctx.statusText = 'Successful'
  }
}

if (process.env.NODE_ENV === 'test') {
  exports.orchestrateMappingResult = orchestrateMappingResult
  exports.setStatusText = setStatusText
  exports.prepareRequestConfig = prepareRequestConfig
  exports.setKoaResponseBody = setKoaResponseBody
  exports.setKoaResponseBodyFromPrimary = setKoaResponseBodyFromPrimary
  exports.createAxiosConfig = createAxiosConfig
  exports.handleRequestError = handleRequestError
}

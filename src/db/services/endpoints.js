'use strict'

const EndpointModel = require('../models/endpoints')

exports.createEndpoint = body => {
  const endpoint = new EndpointModel(body)
  return endpoint.save()
}

exports.readEndpoint = endpointId => {
  return EndpointModel.findById(endpointId)
}

exports.readEndpoints = () => {
  return EndpointModel.find({})
}

exports.updateEndpoint = (endpointId, body) => {
  return EndpointModel.findOneAndUpdate({_id: endpointId}, body, {
    new: true,
    runValidators: true
  })
}

exports.deleteEndpoint = endpointId => {
  return EndpointModel.deleteOne({_id: endpointId})
}

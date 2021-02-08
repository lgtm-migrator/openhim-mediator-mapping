/*! For license information please see 46044242.7877d988.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{130:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return p})),n.d(t,"rightToc",(function(){return u})),n.d(t,"default",(function(){return b}));var a=n(1),o=n(9),r=(n(0),n(147)),i=n(151),l=n(152),c={id:"content-negotiation",title:"Content Negotiation",sidebar_label:"Content Negotiation"},p={id:"features/content-negotiation",title:"Content Negotiation",description:"import Tabs from '@theme/Tabs';",source:"@site/docs/features/content-negotiation.md",permalink:"/openhim-mediator-mapping/docs/features/content-negotiation",editUrl:"https://github.com/jembi/openhim-mediator-mapping/edit/master/docs/docs/features/content-negotiation.md",sidebar_label:"Content Negotiation",sidebar:"someSidebar",previous:{title:"Sample Endpoint Schemas",permalink:"/openhim-mediator-mapping/docs/gettingStarted/samples"},next:{title:"Validation",permalink:"/openhim-mediator-mapping/docs/features/validation"}},u=[{value:"How does this work?",id:"how-does-this-work",children:[]},{value:"Content Negotiation in practice",id:"content-negotiation-in-practice",children:[]}],s={rightToc:u};function b(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"The Content Negotiation feature within each endpoints allows the implementer to define the ",Object(r.b)("inlineCode",{parentName:"p"},"Content-Type")," of the incoming request payload to ensure the correct formatted data is being sent, as well as to define the ",Object(r.b)("inlineCode",{parentName:"p"},"Content-Type")," of the outgoing response payload."),Object(r.b)("p",null,"This features can be used completely on its own without having to execute any of the other features if you purely just want to convert a document from one format to another."),Object(r.b)("p",null,"Supported Content Types:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"JSON"),Object(r.b)("li",{parentName:"ul"},"XML")),Object(r.b)("h2",{id:"how-does-this-work"},"How does this work?"),Object(r.b)("p",null,"When creating a new ",Object(r.b)("inlineCode",{parentName:"p"},"endpoint")," you can supply a section called ",Object(r.b)("inlineCode",{parentName:"p"},"transformation")," to the root of the ",Object(r.b)("inlineCode",{parentName:"p"},"endpoint")," schema."),Object(r.b)("p",null,"This object will contain the ",Object(r.b)("inlineCode",{parentName:"p"},"Content-Type")," for both the ",Object(r.b)("inlineCode",{parentName:"p"},"input")," and ",Object(r.b)("inlineCode",{parentName:"p"},"output")," payloads"),Object(r.b)("h2",{id:"content-negotiation-in-practice"},"Content Negotiation in practice"),Object(r.b)("p",null,"The example is just to illustrate how to go about defining the payload ",Object(r.b)("inlineCode",{parentName:"p"},"Content-Type")," for both incoming and outgoing payloads for a specific ",Object(r.b)("inlineCode",{parentName:"p"},"endpoint"),"."),Object(r.b)("p",null,"The below Content Negotiation settings accepts an incoming payload in ",Object(r.b)("inlineCode",{parentName:"p"},"XML")," format and then converts it into ",Object(r.b)("inlineCode",{parentName:"p"},"JSON")," for the response payload"),Object(r.b)(i.a,{defaultValue:"endpoint",values:[{label:"Endpoint Schema",value:"endpoint"},{label:"Request",value:"request"}],mdxType:"Tabs"},Object(r.b)(l.a,{value:"endpoint",mdxType:"TabItem"},Object(r.b)("p",null,"Below is a basic example of the ",Object(r.b)("inlineCode",{parentName:"p"},"state")," object within the ",Object(r.b)("inlineCode",{parentName:"p"},"endpoint")," schema"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json",metastring:"{6-9}","{6-9}":!0}),'{\n  "name": "A Sample Endpoint",\n  "endpoint": {\n    "pattern": "/sample-endpoint"\n  },\n  "transformation": {\n    "input": "XML",\n    "output": "JSON"\n  }\n}\n'))),Object(r.b)(l.a,{value:"request",mdxType:"TabItem"},Object(r.b)("p",null,"The sample ",Object(r.b)("inlineCode",{parentName:"p"},"transformation")," schema definition shows us how we go about converting the ",Object(r.b)("inlineCode",{parentName:"p"},"input")," and ",Object(r.b)("inlineCode",{parentName:"p"},"ouptut")," payloads of the ",Object(r.b)("inlineCode",{parentName:"p"},"endpoint")," request"),Object(r.b)("p",null,"Lets make use of a sample ",Object(r.b)("inlineCode",{parentName:"p"},"payload.xml")," document that will be sent to this endpoint to illustrate the transformation of the payload"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-xml"}),'<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n  <uuid>e6c2e4fd-fd90-401c-8820-1abb9713944a</uuid>\n  <display>Sample S Patient</display>\n  <height>1.77</height>\n  <weight>91</weight>\n</root>\n')),Object(r.b)("p",null,"The sample POST request to this endpoint would look like the below:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-curl"}),'curl -X POST -d "@payload.xml" -H "Content-Type: application/xml" http://localhost:3003/sample-endpoint\n')))))}b.isMDXComponent=!0},146:function(e,t,n){var a;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var r=typeof a;if("string"===r||"number"===r)e.push(a);else if(Array.isArray(a)&&a.length){var i=o.apply(null,a);i&&e.push(i)}else if("object"===r)for(var l in a)n.call(a,l)&&a[l]&&e.push(l)}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(a=function(){return o}.apply(t,[]))||(e.exports=a)}()},147:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return m}));var a=n(0),o=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=o.a.createContext({}),u=function(e){var t=o.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l({},t,{},e)),n},s=function(e){var t=u(e.components);return o.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),s=u(n),d=a,m=s["".concat(i,".").concat(d)]||s[d]||b[d]||r;return n?o.a.createElement(m,l({ref:t},p,{components:n})):o.a.createElement(m,l({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<r;p++)i[p]=n[p];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},151:function(e,t,n){"use strict";n(23),n(17),n(18);var a=n(0),o=n.n(a),r=n(146),i=n.n(r),l=n(118),c=n.n(l),p=37,u=39;t.a=function(e){var t=e.block,n=e.children,r=e.defaultValue,l=e.values,s=Object(a.useState)(r),b=s[0],d=s[1],m=[];return o.a.createElement("div",null,o.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:i()("tabs",{"tabs--block":t})},l.map((function(e){var t=e.value,n=e.label;return o.a.createElement("li",{role:"tab",tabIndex:"0","aria-selected":b===t,className:i()("tab-item",c.a.tabItem,{"tab-item--active":b===t}),key:t,ref:function(e){return m.push(e)},onKeyDown:function(e){return function(e,t,n){switch(n.keyCode){case u:!function(e,t){var n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()}(e,t);break;case p:!function(e,t){var n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()}(e,t)}}(m,e.target,e)},onFocus:function(){return d(t)},onClick:function(){return d(t)}},n)}))),o.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},a.Children.toArray(n).filter((function(e){return e.props.value===b}))[0]))}},152:function(e,t,n){"use strict";var a=n(0),o=n.n(a);t.a=function(e){return o.a.createElement("div",null,e.children)}}}]);
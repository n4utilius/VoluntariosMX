IBM Cloud Code Template
===

IBM Cloud Code Template Introduction
---
IBM Cloud Code Template contains following sample code:

1. resource URIs creation
2. static file service creation

For more details, please read the code comments in app.js.

Write your own code
---
IBM Cloud Code Template is running in node.js runtime. To develop your own code, simply open the app.js and edit the content with any text
editor. There is no restriction on writing the node code at all which means you can any third party modules available on the web.

Test it locally
---
1. Download and install the node.js runtime from http://nodejs.org/
2. From the template app directory, run ```npm install --production``` to install the dependent modules
3. From the template app directory, run ```node app.js```
4. The services in template app can be access from endpoint http://localhost:3000/mbaas/v1/apps/applicationId

Debug your code
---
1. Download and install node-inspector as a global module from https://github.com/node-inspector/node-inspector
2. From the template app directory, run ```node-debug app.js```

Deploy to Bluemix
---
1. Download and install the Cloud Foundry CLI from https://github.com/cloudfoundry/cli/releases/tag/v6.0.0
2. From the template app directory, run ```cf push ${yourAppName}``` to deploy the app to Bluemix.
3. The services in template app can be access from endpoint https://mobile.ng.bluemix.net/${appHostName}/v1/apps/${applicationId}

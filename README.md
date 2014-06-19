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
=======
This README.md file is displayed on your project page. You should edit this 
file to describe your project, including instructions for building and 
running the project, pointers to the license under which you are making the 
project available, and anything else you think would be useful for others to
know.

We have created an empty license.txt file for you. Well, actually, it says,
"<Replace this text with the license you've chosen for your project.>" We 
recommend you edit this and include text for license terms under which you're
making your code available. A good resource for open source licenses is the 
[Open Source Initiative](http://opensource.org/).

Be sure to update your project's profile with a short description and 
eye-catching graphic.

Finally, consider defining a timeline and work items on the "Current Work" tab 
to give interested developers a sense of your cadence and upcoming enhancements.
>>>>>>> 8561fa13d50c80b32be55a14bd29eaf2da9323a3

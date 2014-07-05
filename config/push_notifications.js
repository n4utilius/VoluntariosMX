var ibmbaas = require('ibmbaas');
var applicationId = 'e09ae593-2013-4a3e-adda-30d850c7025b';
ibmbaas.initializeSDK(applicationId);
var ibmpush = require('ibmpush');
var push = ibmpush.initializeService();

//push services config


push.setEnvironment("sandbox").then(
	function () { return Q.when("Environment is set");}).then(
	function(msg) {
    	return push.setGCMCredentials(  //Set the GCM Credentials
    		"sandbox", "AIzaSyAlcbVQbPA9jqC21vba2AKW85-kYq2APek", "489358930213"
    	);
	}).then(
	function(response) { 
		console.log(response);
	    //push.createTag("Test tag3", "A sample tag3")
			
		//push.createTag(data._id, data.name)
		//console.log(push)

		var message = {
		    alert : "Push Notification from Javascript SDK",
		    url : "https://www.ng.bluemix.net"
		}

		push.sendBroadcastNotification(message).then(function(response) {
		    console.log(response);
		},function(err) {
		    console.log(err);
		});
				/*
		push.sendNotification(push.msg['app'], ["Test tag3"], null, function(error, response){ //send push notification
				if (error) {
					console.log("no se pudo enviar el push notification");
				} else {
					console.log("push notification enviado exitosamente");
					console.log(response);
					result.data = response;
				}
			})
		/**/ 
	 }, 
	function(err) { console.log(err); }
);

//console.log(push.createTag)
/*
push.insertTag = function(tag){
	tags = push.getTags();
	if (tags.indexOf(tag) > -1) return false
	push.createTag(tag);
	return true;
}
*/

/*
push.msg = {
	"app": {
	    alert : "Tienes una solicitud de pasajero",
	    url : "https://www.ng.bluemix.net"
	},
	"add": {
	    alert : "Te han agregado a una ruta",
	    url : "https://www.ng.bluemix.net"
	},
	"del": {
	    alert : "Te han elimindao de una ruta",
	    url : "https://www.ng.bluemix.net"
	}
}

push.send = function(message, tag, callback){
	push.sendBroadcastNotification(message).then(function(response) {
	    return callback(false, response);
	},function(error) {
	    return callback(error, response);
	});
}
*/

module.exports = push;
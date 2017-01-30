var PST_TIMEZONE_OFFSET = 8;

function IntentHandler() {

}

IntentHandler.prototype.welcomeResponse = function() {
var morningGreeting = getMorningGreetingFromCurrentTime();
	// var assistanceGreeting = getAssistanceGreeting();
	// var greetingResponse = morningGreeting + " Mr. Yen. " + assistanceGreeting;
	// var repromptOutput = "What would you like me to do?";

	return {
		"message": "Hello this is linkedin",
		"repromptMessage": "Message"
	}
}

IntentHandler.prototype.welcomeIntent = function(intent, session, responseHandler) {
	responseHandler("Hello this is linkedin", false);
}

// Helper Functions
function getMorningGreetingFromCurrentTime() {
	var date = new Date();
	date.setHours(date.getHours() - PST_TIMEZONE_OFFSET); // Subtract 8 for PST timezone
	var hours = date.getHours();

	console.log("Current time: " + date);

	/* hour is before noon */
	if (hours >= 5 && hours < 12 ) { 
	    return "Good morning";
	} 
	/* Hour is from noon to 5pm (actually to 5:59 pm) */
	else if (hours >= 12 && hours <= 17) { 
	    return "Good afternoon"; 
	} 
	/* the hour is after 5pm, so it is between 6pm and midnight */
	else if ((hours > 17 && hours <= 24) || (hours >= 0 && hours < 5)) { 
	    return "Good evening";
	} else { 
	    return "I'm not sure what time it is";
	} 
}

function getAssistanceGreeting() {
	var randomNumber = Math.floor((Math.random() * 2));
	if (randomNumber == 0) {
		return "How may I be of assistance?";
	} else if (randomNumber == 1) {
		return "Donna at your service";
	} else {
		return "Error";
	}
}

module.exports = IntentHandler;

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

IntentHandler.prototype.goodbyeIntent = function(intent, session, responseHandler) {
	responseHandler("Ok bye for now", false);
}

IntentHandler.prototype.newsIntent = function(intent, session, responseHandler) {
	session.attributes.isNews = true;
	responseHandler("Here are the top stories from linkedin: First Story - Immigration ban fallout and latest reactions to President Trump's executive action on immigration. Second Story - Why are people deleting Uber. It has to do with Trump's immigration ban. Third Story - Snapchat selects NYSE for its IPO. The IPO will likely happen in March. Would you like to know more about any of these stories?", true, "I'm sorry what did you say?");
	/*responseHandler("Would you like to know more about any of these?", true, "I'm sorry what did you say?");*/
}

IntentHandler.prototype.moreNewsIntentOne = function(intent, session, responseHandler) {
	if (session.attributes.isNews) {
		console.log("More News intent 1 handler");
		responseHandler("Ok. Questions, confusion and protests continue to build in wake of President Trump's executive order on immigration. Starbucks responded to Trump's immigration ban by pledging to hire 10000 immigrants worldwide. Do you want to know more about any other story?", true, "I'm sorry what did you say?");
	} else {
		console.log("else More News intent 2 handler");
		responseHandler("I am not sure about the context for this.", false, "I'm sorry what did you say?");		
	}
}

IntentHandler.prototype.moreNewsIntentTwo = function(intent, session, responseHandler) {
	if (session.attributes.isNews) {
		console.log("More News intent 2 handler");
		responseHandler("Ok. After hashtag delete uber got popular the CEO pledged 3 million dollars for drivers affected by immigration ban. Do you want to know more about any other story?", true, "I'm sorry what did you say?");
	} else {
		console.log("else More News intent 2 handler");
		responseHandler("I am not sure about the context for this.", false, "I'm sorry what did you say?");		
	}
}

IntentHandler.prototype.moreNewsIntentThree = function(intent, session, responseHandler) {
	if (session.attributes.isNews) {
		console.log("if More News intent 3 handler");
		responseHandler("Ok. Expect plenty of headlines about upcoming IPO of Snapchat. But it's business technology companies, not consumer ones that have been leading the tech IPO revival. Latest valuation as of 24th January is breathtaking 3.7 billion dollars. Do you want to know more about any other story?", true, "I'm sorry what did you say?");
	} else {
		console.log("else More News intent 3 handler");
		responseHandler("I am not sure about the context for this.", false, "I'm sorry what did you say?");		
	}
}

IntentHandler.prototype.testQuestion = function(intent, session, responseHandler) {
	console.log("test question handler");
	responseHandler("Do you want to go home?", true, "I'm sorry what did you say?");
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

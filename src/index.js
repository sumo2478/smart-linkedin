/*
Alfred Main Code
*/

// TODO: Change this
var APP_ID = 'amzn1.ask.skill.dad5b141-60f0-4c33-bffa-c584fd2702da';

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var Intent = require('./IntentHandler');

var intentHandler = new Intent();

var AlfredHandler = function() {
	AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
AlfredHandler.prototype = Object.create(AlexaSkill.prototype);
AlfredHandler.prototype.constructor = AlfredHandler;

// ----------------------- Override AlexaSkill request and intent handlers -----------------------

AlfredHandler.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

AlfredHandler.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);

    var greeting = intentHandler.welcomeResponse();
    response.ask(greeting.message, greeting.reprompt);
};

AlfredHandler.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

/**
 * override intentHandlers to map intent handling functions.
 */
AlfredHandler.prototype.intentHandlers = {
    "HelloIntent": function(intent, session, responseHandler) {
        intentHandler.welcomeIntent(intent, session, responseHandler);
    },

    "NewsIntent": function(intent, session, responseHandler) {
        intentHandler.newsIntent(intent, session, responseHandler);
    },

	"AMAZON.HelpIntent": function (intent, session, response) {
        response.tell("Help");
    },

    "AMAZON.StopIntent": function (intent, session, responseHandler) {
        intentHandler.goodbyeIntent(intent, session, responseHandler);  
    },

    "AMAZON.CancelIntent": function (intent, session, responseHandler) {
        intentHandler.goodbyeIntent(intent, session, responseHandler);  
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var alfredHandler = new AlfredHandler();
    alfredHandler.execute(event, context);
};

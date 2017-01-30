'use strict';

// Boilerplate setup
let ApiAiAssistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({type: 'application/json'}));

// Create an instance of ApiAiAssistant
app.post('/', function (request, response) {
  const assistant = new ApiAiAssistant(
    {request: request, response: response});

// Create functions to handle requests here
const WELCOME_INTENT = 'input.welcome';  // the action name from the API.AI intent
function welcomeIntent (assistant) {
  assistant.ask('Here are the top stories from Linked in news');
}

let actionMap = new Map();
actionMap.set(WELCOME_INTENT, welcomeIntent);
assistant.handleRequest(actionMap);
});

// Start the server
let server = app.listen(app.get('port'), function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
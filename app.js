var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./LuisDialog');
// Some sections have been omitted

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId:'deca1631-32b6-4897-a8d9-062612ecf68a',
    appPassword:'taMZQS2876(lmullNZJ4%*)'
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user
var bot = new builder.UniversalBot(connector, function (session) {
   
   
    session.send('Sorry, I did not understand \'%s\'. Type \'support\' if you need assistance', session.message.text);
});

// This line will call the function in your LuisDialog.js file
luis.startDialog(bot);


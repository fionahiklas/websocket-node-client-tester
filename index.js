/**
 * Script to allow connection to STOMP endpoints and subscribing to topics
 */
const winston = require('winston');
const log = winston.createLogger({
    level: 'debug',
    format: winston.format.text(),
    transports: [
	new winston.transports.Console()
    ]
});

// Magic to provide WebSocket support on node.js
Object.assign(global, { WebSocket: require('websocket').w3cwebsocket });

const StompJs = require('@stomp/stompjs');

// Get command line arguments
var cliArgs = process.argv.slice(2);
console.log('Command line args: ', cliArgs);

const wsUrl = cliArgs[0];
const wsSubscribeTopic = cliArgs[1];

console.log('Creating STOMP Client with WS URL: ', wsUrl);
const stompClient = new StompJs.Client({
    brokerURL: wsUrl,
    
    debug: function(debugString) {
        console.log('DEBUG: ', debugString);
    },

    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
});


stompClient.onConnect = function(frame) {

    console.log('*** Connected to STOMP connection, frame: ', frame);
    console.log('Subscribing to topic: ', wsSubscribeTopic);

    var subscription = stompClient.subscribe(wsSubscribeTopic, function(message) {
        console.log('*** Got message: ', message);
    });

    if (subscription == null) {
        console.log('*** Error subscribing: ', error);
    }
};

stompClient.onStompError = function(frame) {
    console.log('*** Broker error: ', frame.headers['message']);
    console.log('*** Error from STOMP connect: ', frame.body);
};


stompClient.onDisconnect = function(frame) {
    console.log('*** DISCONNECTED: ', frame.headers['message']);
    console.log('*** Disconnected: ', frame.body);
};

stompClient.onWebSocketClose = function(event) {
    console.log('*** WebSocket Close: ', event);
};

stompClient.onWebSocketError = function(error) {
    console.log('*** WebSocket error: ', error);
};


console.log('Activating STOMP client');
stompClient.activate();

console.log('StompClient has been activated');

/**
 * Script to allow connection to STOMP endpoints and subscribing to topics
 */

// Setup logging infrastructure
const winston = require('winston');
const log = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
	winston.format.splat(),
	winston.format.simple()
    ),
    transports: [
	new winston.transports.Stream({ stream: process.stderr})
    ]
});

// Magic to provide WebSocket support on node.js
Object.assign(global, { WebSocket: require('websocket').w3cwebsocket });

const StompJs = require('@stomp/stompjs');

// Get command line arguments
var cliArgs = process.argv.slice(2);
log.debug('Command line args: %s', cliArgs);

const wsUrl = cliArgs[0];
const wsSubscribeTopic = cliArgs[1];

log.debug('Creating STOMP Client with WS URL: %s', wsUrl);
const stompClient = new StompJs.Client({
    brokerURL: wsUrl,
    
    debug: function(debugString) {
        log.debug('DEBUG: %s', debugString);
    },

    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
});


stompClient.onConnect = function(frame) {

    log.debug('*** Connected to STOMP connection, frame: %s', frame);
    log.debug('Subscribing to topic: %s', wsSubscribeTopic);

    var subscription = stompClient.subscribe(wsSubscribeTopic, function(message) {
        log.debug('*** Got message: %s', message);
	log.debug('*** Got message body: %s', message.body);
    });

    if (subscription == null) {
        log.debug('*** Error subscribing: %', error);
    }
};

stompClient.onStompError = function(frame) {
    log.debug('*** Broker error: %s', frame.headers['message']);
    log.debug('*** Error from STOMP connect: %s', frame.body);
};


stompClient.onDisconnect = function(frame) {
    log.debug('*** DISCONNECTED: %s', frame.headers['message']);
    log.debug('*** Disconnected: %s', frame.body);
};

stompClient.onWebSocketClose = function(event) {
    log.debug('*** WebSocket Close: %s', event);
};

stompClient.onWebSocketError = function(error) {
    log.debug('*** WebSocket error: %s', error);
};


log.debug('Activating STOMP client');
stompClient.activate();
console.log("Started!");

log.debug('StompClient has been activated');

/**
 * Script to allow connection to STOMP endpoints and subscribing to topics
 */


const StompJs = require('@stomp/stompjs');

// Get command line arguments
var cliArgs = process.argv.slice(2);
console.log('Command line args: ', cliArgs);

const wsUrl = cliArgs[0];
const wsSubscribeTopic = cliArgs[1];

console.log('Creating STOMP Client with WS URL: ', wsUrl);
const stompClient = Stomp.Client({
    brokerURL: wsUrl,

    debug: function(debugString) {
        console.log('DEBUG: ', debugString);
    },

    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
});


stompClient.onConnect({ 'X-WS-Client-Header': 'Wibble' }, function(frame) {

    console.log('Connected to STOMP connection, frame: ', frame);
    console.log('Subscribing to topic: ', wsSubscribeTopic);

    var subscription = stompClient.subscribe(wsSubscribeTopic, function(message) {
        console.log('Got message: ', message);
    });

    if (subscription == null) {
        console.log('Error subscribing: ', error);
    }
});

stompClient.onStompError(frame) {
    console.log('Broker error: ', frame.headers['message']);
    console.log('Error from STOMP connect: ', frame.body);
});


console.log('Activating STOMP client');
stompClient.activate();


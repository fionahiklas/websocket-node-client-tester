/**
 * Script to allow connection to STOMP endpoints and subscribing to topics
 */


const Stomp = require('@stomp/stompjs');

// Get command line arguments
var cliArgs = process.argv.slice(2);
console.log('Command line args: ', cliArgs);

const wsUrl = cliArgs[0];
const wsSubscribeTopic = cliArgs[1];

console.log('Creating STOMP Client with WS URL: ', wsUrl);
const stompClient = Stomp.client(wsUrl);

console.log('Connecting to endpoint');
stompClient.connect({ 'X-WS-Client-Header': 'Wibble' }, function(frame) {
    console.log('Connected to STOMP connection, frame: ', frame);
    console.log('Subscribing to topic: ', wsSubscribeTopic);

    stompClient.subscribe(wsSubscribeTopic, function(message) {
        console.log('Got message: ', message);
    }, function(error) {
        console.log('Error subscribing: ', error);
    });
    
}, function(error) {
    console.log('Error from STOMP connect: ', error);
});



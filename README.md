## Overview

Client code to connect to a given 


## Getting started

### Prerequisites

Node LTS, currently tested with [14.15.x](https://nodejs.org/dist/v14.15.4/)

On Ubuntu 20.04 the default node is 10.19.0 and this causes errors regarding promises and TextEncoder
which means that the STOMP client doesn't actually start properly.  Make absolutely sure that the 
node.js LTS version (> 14.15.0) is being used to avoid these problems).


### Install packages


```
yarn install
```


### Run the command

```
node index.js ws://1.2.3.4/websocket/endpoint /topic/messages/user/wibble
```


## Notes

Steps followed to setup this project


### Installing pre-reqs

Download and install nodeJS from [here](https://nodejs.org/en/)

Once installed the Yarn package manager can be installed using 
the following command

```
npm config set prefix=$HOME/.node-modules
export PATH=$PATH:~/.node-modules/bin

npm install -g yarn # Install Yarn "globally" under ~/.node-modules
```


### Adding Packages

Adding the package using yarn

```
yarn add @stomp/stomp.js websocket
```

Development packages

```
yarn add --dev qunit
yarn add --dev csvtojson
```






## References

### Javascript



### Tools

* [Node.js](https://nodejs.org/en/)
* [npm config](https://docs.npmjs.com/cli/config)
* [Yarn](https://yarnpkg.com)



### Node

* [Package.json format](https://nodesource.com/blog/the-basics-of-package-json-in-node-js-and-npm/)
* [Parse node cli args](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)
* [SPDX License strings](https://spdx.org/licenses/)


### Packages

* [Pre-requisite for WebSocket library in node](https://stomp-js.github.io/guide/stompjs/rx-stomp/ng2-stompjs/pollyfils-for-stompjs-v5.html)
* [Stomp.JS package](https://www.npmjs.com/package/@stomp/stompjs)
* [Stomp.JS v5](https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html)
* [Websockets](https://www.npmjs.com/package/websocket)
* [Winston](https://github.com/winstonjs/winston)


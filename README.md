# Multictactoe
``Multitactoe`` is a tic-tac-toe game with online multiplayer mode support. The architecture is divided into a **Client (front-end)** and an **Api (back-end)**.

## Client
The client is written in *Node.js*, using *React.js* in order to display the front-end elements. Besides, it uses *Webpack 4* and *Babel 7* for compiling/bundling all the Javascript code to get it working on browsers.

Live Version: [https://multictactoe-game.web.app](https://multictactoe-game.web.app)

The following commands are necessary for deploys and to run it locally on your machine.
```sh
npm install # install dependencies
npm start # start local server
npm deploy # build project and deploy on firebase
```
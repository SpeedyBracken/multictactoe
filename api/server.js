const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
// const cors = require('cors')

const testAPIRouter = require("./routes/testAPI.js")


// app.set('view engine', 'jade')

// app.use(express.static(__dirname + './../client/dist'))

// app.get("/", (req, res) => {
//     console.log(__dirname)
//     res.render(__dirname + "./../client/dist/index.html")
// })

io.on('connection', newConnection)

function newConnection(socket) {
    console.log('New connection id= ' + socket.id)
}

const listener = server.listen(process.env.PORT || 3030, () => {
    console.log("Node is listening on port: " + listener.address().port)
}) 
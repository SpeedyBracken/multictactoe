const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')

const testAPIRouter = require("./routes/testAPI.js")

app.use(cors())
app.use("/testAPI", testAPIRouter)

app.get("/", (req, res) => {
    res.send("Hello node")
})

// io.on('connection', newConnection)

// function newConnection(socket) {
//     console.log('New connection id= ' + socket.id)
// }

const listener = server.listen(process.env.PORT || 3030, () => {
    console.log("Node is listening on port: " + listener.address().port)
}) 
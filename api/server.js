const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const index = require("./routes/index.js")

app.use(index)

// app.set('view engine', 'jade')

// app.use(express.static(__dirname + './../client/dist'))

// app.get("/", (req, res) => {
//     console.log(__dirname)
//     res.render(__dirname + "./../client/dist/index.html")
// })

let arrRooms = []

setInterval(() => {
    io.emit('concurrent-connections', io.engine.clientsCount)
    console.log('connections', io.engine.clientsCount)
}, 5000)

io.on('connection', newConnection)

function newConnection(socket) {
    console.log('New connection id= ' + socket.id)
    socket.on('loguei', () => {
        socket.emit('arrIds', socket.id)
    })

    socket.on('newRoom', data => {
        arrRooms.unshift(data)
        console.log("A new room was created", data)
    })

    setInterval(() => {
        io.emit('tableOfRooms', arrRooms)
    }, 200)

    socket.on('Pair Room', (idLocal, idSala) => {
        arrRooms[idSala].playersId.push(idLocal)
        console.log('arrRooms', arrRooms)

        socket.join('room')

        socket.on('playerClick', (data, index) => {
            console.log('Player clicked', data)
            io.sockets.to('room').emit('renderPlayerClick', data, index)
        })
    })

    socket.on('disconnect', () => console.log("Client disconnected"))
}

// const listenRoomCreation = () => {
//     try {
//         socket.on('newRoom', () => {
//             console.log("A new room was created")
//         })
//     } catch (error) {
//         console.error(`Error: ${error.code}`)
//     }
// }

const listener = server.listen(process.env.PORT || 3030, () => {
    console.log("Node is listening on port: " + listener.address().port)
}) 
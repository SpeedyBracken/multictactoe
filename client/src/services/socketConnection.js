import socketIOClient from "socket.io-client"

socketIOClient.connect(process.env.API_URL)
const socket = socketIOClient(process.env.API_URL)

export default socket
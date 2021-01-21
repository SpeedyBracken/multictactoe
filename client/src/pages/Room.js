import React, { Component } from 'react'
import Slide from 'react-reveal/Slide'
import socketIOClient from "socket.io-client"
import Auth from '../modules/Auth'

import socket from '../services/socketConnection'

import './Room.scss'

export default class Room extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: +this.props.match.params.id,
            title: '',
            gameArea: [],
            player: {
                nickname: Auth.userData.nickname,
                id: Auth.userData.id,
            },
            type: '',
            rooms: [],
            loading: true,
            error: false
        }

		socket.emit('Pair Room', Auth.userData.id, this.state.id)
        console.log('Auth.userData', Auth.userData)

        this.handlePlayerClick = this.handlePlayerClick.bind(this)
        this.getRoomTitle = this.getRoomTitle.bind(this)
    }

    componentDidMount(){
        if(this.props.location.state){
            this.setState({
                loading: false,
                rooms: this.props.location.state.rooms,
                title: this.props.location.state.title
            })
		}

		socket.on('assignMark', playersInRoom => {
			console.log('playersInRoom', playersInRoom)
			for(let player of playersInRoom) {
				console.log(player, this.state.player.id)
				if(player.id === this.state.player.id) this.setState({ type: player.mark })
			}
		})

        socket.on('tableOfRooms', rooms => {
            this.setState({ rooms, loading: false })
        })

        socket.on('renderPlayerClick', (mark, dexin) => {
            let gameArea = this.state.gameArea

            gameArea.map((area, index) => {
                if(dexin === index) {
                    gameArea[index].mark = mark
                }
            })
        })

        let gameArea = []
        for(let i=0; i<9; i++){
            gameArea.push({ id: i, mark: '' })
        }

        console.log('gameArea', this.state.gameArea)
        setInterval(() => {this.setState({ gameArea })}, 100)
    }

    handlePlayerClick(areaId){
        let gameArea = this.state.gameArea

        gameArea.map((area, index) => {
            if(area.id === areaId && !gameArea[index].mark){
				console.log(this.state.type)
                gameArea[index].mark = this.state.type
                socket.emit('playerClick', gameArea[index].mark, index)
            }
        })
    }

    getRoomTitle(){
        const [ currentRoom ] = this.state.rooms.filter(room => +room.id === +this.state.id)

        if (!currentRoom) return this.setState({ error: true })

        return currentRoom.title
    }

    render(){
        return(
            this.state.error
            ?   !this.state.loading
                && <div className="not-found-warning"><h1>Room not found</h1></div>

            :   !this.state.loading
                &&  <Slide top>
                        <div className="room-container">
                            <h1>{this.getRoomTitle()}</h1>
                            <div className="tictactoe-grid">
                                {
                                    this.state.gameArea
                                    .map(area =>
                                        <button
                                            className="tictactoe-item"
                                            onClick={() => this.handlePlayerClick(area.id)}
                                        >
                                            {area.mark}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </Slide>
        )
    }
}
import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import { Link } from 'react-router-dom'
import socketIOClient from "socket.io-client"

import RoomCard from '~/components/RoomCard'

import Logo from '~/assets/logo_white.png'

import './Dashboard.scss'

const socket = socketIOClient(process.env.API_URL)

export default class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            rooms: [],
            title: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        socket.on('tableOfRooms', rooms => {
            console.log(rooms)
            this.setState({ rooms })
        })
    }

    handleChange(key, value){
        this.setState({
            [key]: value
        })
    }

    handleSubmit(event){
        event.preventDefault()

        let rooms = this.state.rooms
        rooms.unshift({ 
            title: this.state.title,
            id: this.state.title.toLowerCase().replace(/[' ']/g, '_')
        })

        this.setState({ rooms, title: '' })

        socket.emit('newRoom', {title: this.state.title, id: this.state.id})
    }

    render(){
        return (
            <Fade>
                <div className="dashboard-container">
                    <img src={Logo} alt='' />
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            placeholder="Room title" 
                            value={this.state.title} 
                            onChange={event => this.handleChange('title', event.target.value)}
                        />
                        <button type="submit">Create Room</button>
                    </form>
                    <div className="rooms-container">
                        {
                            this.state.rooms
                            .map((room, index) => 
                                <Link 
                                    key={room.id}
                                    to={{
                                        pathname: '/room/' + index,
                                        state: { id: room.id, title: room.title }
                                    }}
                                >
                                    <RoomCard 
                                        title={room.title} 
                                        key={room.title} 
                                    />
                                </Link>
                            )
                        }
                    </div>
                </div>
            </Fade>
        )
    }
}
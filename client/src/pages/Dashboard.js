import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import { Link } from 'react-router-dom'
import Auth from '../modules/Auth'

import RoomCard from '~/components/RoomCard'

import Logo from '~/assets/logo_white.png'

import socket from '../services/socketConnection'

import './Dashboard.scss'

export default class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            rooms: this.props.location.state,
            title: '',
            nickname: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentDidMount(){
        if (!Auth.userData) this.props.history.push('/login')

        const { nickname } = Auth.userData
        this.setState({ nickname })

        socket.on('tableOfRooms', rooms => {
            this.setState({ rooms })
        })
    }

    handleLogout(){
        Auth.logout()
        this.props.history.push('/login')
    }

    handleChange(key, value){
        this.setState({
            [key]: value
        })
    }

    handleSubmit(event){
        event.preventDefault()

        let rooms = this.state.rooms
        const title = this.state.title
		const id = rooms.length
		const players = []

        rooms.unshift({ title, id })
        console.log(rooms)
        this.setState({ rooms, title: '' })
        socket.emit('newRoom', { title, id, players })
    }

    render(){
        return (
            <Fade>
                <div className="navbar-container">
                    <h1>Hello, <strong>{this.state.nickname}</strong></h1>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
                <div className="dashboard-container">
                    <img src={Logo} alt='' />
                    <form onSubmit={this.handleSubmit}>
                        <input
                            placeholder="Room title"
                            value={this.state.title}
                            onChange={event => this.handleChange('title', event.target.value)}
                            required
                        />
                        <button type="submit">Create Room</button>
                    </form>
                    <div className="rooms-container">
                        {
                            this.state.rooms
                            .map((room, index) =>
                                <Link
                                    key={'room-link-' + room.id}
                                    to={{
                                        pathname: '/room/' + room.id,
                                        state: { id: room.id, title: room.title, rooms: this.state.rooms }
                                    }}
                                >
                                    <RoomCard
                                        title={room.title}
                                        key={'room-card-' + room.id}
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
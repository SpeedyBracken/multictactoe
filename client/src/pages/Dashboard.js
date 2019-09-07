import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'

import RoomCard from '~/components/RoomCard'

import Logo from '~/assets/logo_white.png'

import './Dashboard.scss'

export default class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            rooms: [],
            title: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleEnterRoom = this.handleEnterRoom.bind(this)
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
    }

    handleEnterRoom(id){
        this.props.history.push(`/room/${id}`)
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
                            .map(room => 
                                <RoomCard 
                                    title={room.title} 
                                    id={room.id}
                                    key={room.title} 
                                    handleEnterRoom={this.handleEnterRoom}
                                />
                            )
                        }
                    </div>
                </div>
            </Fade>
        )
    }
}
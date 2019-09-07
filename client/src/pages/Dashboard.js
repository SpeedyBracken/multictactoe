import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'

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
    }

    handleChange(key, value){
        this.setState({
            [key]: value
        })
    }

    handleSubmit(event){
        event.preventDefault()

        let rooms = this.state.rooms
        rooms.unshift({ title: this.state.title })

        this.setState({ rooms, title: '' })
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
                            //rooms.map(room => <Card title={room.title} />)
                        }
                    </div>
                </div>
            </Fade>
        )
    }
}
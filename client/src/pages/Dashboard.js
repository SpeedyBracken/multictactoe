import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'

export default class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            rooms: [],
            title: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(){
        let rooms = this.state.rooms
        rooms.unshift(title)

        this.setState({ rooms })
    }

    render(){
        return (
            <Fade>
                <div className="dashboard-container">
                    <form onSubmit={this.handleSubmit} className="form-container">
                        <input placeholder="Room name" />
                        <button type="submit">Create Room</button>
                    </form>
                </div>
            </Fade>
        )
    }
}
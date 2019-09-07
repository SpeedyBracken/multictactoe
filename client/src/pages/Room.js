import React, { Component } from 'react'
import Slide from 'react-reveal/Slide'

import './Room.scss'

export default class Room extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: '',
            title: ''
        }
    }

    componentDidMount(){
        this.setState({ 
            id: +this.props.match.params.id, 
            title: this.props.location.state.title 
        })
    }

    render(){
        return (
            <Slide top>
                <div className="room-container">
                    <h1>{this.state.title}</h1>
                </div>
            </Slide>
        )
    }
}
import React, { Component } from 'react'
import Slide from 'react-reveal/Slide'

import './Room.scss'

export default class Room extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: '',
            title: '',
            gameArea: []
        }
    }

    componentDidMount(){
        let gameArea = []
        for(let i=0; i<9; i++){
            gameArea.push({ id: i, mark: 'X' })
        }

        this.setState({ 
            gameArea,
            id: +this.props.match.params.id, 
            title: this.props.location.state.title 
        })
    }

    render(){
        return (
            <Slide top>
                <div className="room-container">
                    <h1>{this.state.title}</h1>
                    <div className="tictactoe-grid">
                        {
                            this.state.gameArea
                            .map(area => 
                                <button className="tictactoe-item">
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
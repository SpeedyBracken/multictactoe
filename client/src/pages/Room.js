import React, { Component } from 'react'
import Slide from 'react-reveal/Slide'

import './Room.scss'

export default class Room extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: '',
            title: '',
            gameArea: [],
            player: {
                id: '',
                type: 'X'
            }
        }

        this.handlePlayerClick = this.handlePlayerClick.bind(this)
    }

    componentDidMount(){
        let gameArea = []
        for(let i=0; i<9; i++){
            gameArea.push({ id: i, mark: '' })
        }

        this.setState({ 
            gameArea,
            id: +this.props.match.params.id, 
            title: this.props.location.state.title 
        })
    }

    handlePlayerClick(areaId){
        let gameArea = this.state.gameArea

        gameArea.map((area, index) => {
            if(area.id === areaId && !gameArea[index].mark){
                gameArea[index].mark = this.state.player.type
            }
        })

        this.setState({ gameArea })
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
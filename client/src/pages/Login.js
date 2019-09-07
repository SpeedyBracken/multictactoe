import React, { Component } from 'react'
import Zoom from 'react-reveal/Zoom'

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return (
            <Zoom top>
                <h1>EAE</h1>
            </Zoom>
        )
    }
}
import React, { Component } from 'react'
import Zoom from 'react-reveal/Zoom'

import Logo from '../assets/logo_white.png'

import './Login.scss'

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return (
            <Zoom top>
                <div className="login-container">
                    <img src={Logo} />
                    <form className="form-container">
                        <input placeholder='Nickname' />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </Zoom>
        )
    }
}
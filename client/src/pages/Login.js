import React, { Component } from 'react'
import Zoom from 'react-reveal/Zoom'
import Auth from '../modules/Auth'
import socketIOClient from "socket.io-client"

import Logo from '~/assets/logo_white.png'

import './Login.scss'

const socket = socketIOClient(process.env.API_URL)

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            nickname: '',
            rooms: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        socket.on('tableOfRooms', rooms => {
            this.setState({ rooms })
        })
    }

    handleSubmit(event){
        event.preventDefault()
        Auth.userData = {
            nickname: this.state.nickname,
            id: []
        }

        Auth.userId = socket.id

        this.props.history.push({
            pathname: '/dashboard',
            state: this.state.rooms
        })
    }

    handleChange(key, value){
        this.setState({
            [key]: value
        })
    }

    render(){
        return (
            <Zoom top>
                <div className="login-container">
                    <img src={Logo} alt='' />
                    <form className="form-container" onSubmit={this.handleSubmit}>
                        <input 
                            placeholder='Nickname' 
                            value={this.state.nickname} 
                            onChange={event => this.handleChange('nickname', event.target.value)} 
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </Zoom>
        )
    }
}
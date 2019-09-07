import React, { Component } from 'react'
import Zoom from 'react-reveal/Zoom'

import Logo from '~/assets/logo_white.png'

import './Login.scss'

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            nickname: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        event.preventDefault()
        this.props.history.push('/dashboard')
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
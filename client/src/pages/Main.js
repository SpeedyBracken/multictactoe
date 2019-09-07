import React, { Component } from 'react'

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        this.props.history.push('/login')
    }

    render(){
        return <div />
    }
}
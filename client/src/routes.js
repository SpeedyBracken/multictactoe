import React from 'react'
import { Route } from 'react-router-dom'

import Main from './pages/Main'
import Login from './pages/Login'

const Routes = () => {
    return (
        <>
            <Route exact path='/' component={Main} />
            <Route path='/login' component={Login} />
        </>
    )
}

export default Routes
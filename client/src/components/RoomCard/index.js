import React from 'react'

import './index.scss'

export default function RoomCard(props){
    return (
        <section className="room-card-container">
            <h1>{props.title}</h1>
        </section>
    )
}
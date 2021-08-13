import React from 'react'

export default function User({ user }) {
    return (
        <div style={{display: "inline-block"}}>
            <span>&nbsp;</span>
            {user.name} ,
        </div>
    )
}
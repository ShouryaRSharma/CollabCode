import React from 'react'
import User from './User'

export default function Users({users}) {
    return(
        <div className="users">
            { users ? 
                users?.map(user => (
                <User key={user.id} user={user} />
                )) : null
            }
        </div>
    )
}
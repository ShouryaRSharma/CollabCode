import React from 'react'
import User from './User'

export function Users({users}) {
    return(
        <div className="users">
            {users?.map(user => (
                <User user={user} />
            ))}
        </div>
    )
}
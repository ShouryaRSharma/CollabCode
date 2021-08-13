import React from 'react'

export default function Dropdown(props) {
    return (
        <div className="dropdown">
            <select value={props.options.default} onChange={props.handleDropdown}>
                {props.options.map(option => (
                    <option key={option} value={option.code}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}
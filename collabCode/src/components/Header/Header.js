import React from 'react'
import logo from './test.png'
export default function Header() {
    return (
        <header>
            <nav class="navbar navbar-light">
            <div class="d-md-flex d-block flex-row mx-md-auto mx-0">
            <a class="navbar-brand" href="/">
                <img src={logo} width="200" height="30" class="d-inline-block align-top" alt=""></img>
                <h3>CollabCode</h3>
            </a>
            </div>
            </nav>

        </header>
    )
}
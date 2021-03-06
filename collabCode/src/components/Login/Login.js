import React, { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '../Header/Header';

export default function Login(props) {
    const login = (e) => {
        e.preventDefault()
        const room = uuidv4()
        props.history.push(`/editor?room=${room}`)
    }

    return (
        <Fragment>
            <Header />
            <main>
                <div className="text-center">
                    <form onSubmit={login}>
                        <input type="submit" className="btn btn-success" value="Get Started" />
                    </form>
                </div>
            </main>
        </Fragment>
    )
}
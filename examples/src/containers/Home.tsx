import React from "react";
import {Link} from 'react-router-dom'

export default function Home() {

    return (
        <>
            <h1>Home</h1>
            <p>some content for home page</p>
            <Link to="/login">Login</Link><br/>
            <Link to="/complex-form">Complex Form</Link><br/>
        </>
    )
}

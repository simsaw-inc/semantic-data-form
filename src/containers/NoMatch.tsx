import React from "react";
import {useLocation} from 'react-router-dom';

export default function NoMatch() {
    const loc = useLocation();

    return (
        <>
            <h1>Not Found</h1>
            <p>Unable to find page {loc.pathname}</p>
        </>
    )
};



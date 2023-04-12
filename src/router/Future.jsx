import React from "react";
import {Link} from "react-router-dom";
import {Button } from 'bootstrap-4-react';
export default function Future() {
    return(
        <div >
            <Link to="/User" className="Button-back" ><Button>Назад</Button></Link>
            <img className="center-img"   src="image/ops.jpeg" alt=""/>
            <h1 className="text-Future">В майбутньому тут буде сторінка</h1>
        </div>
    )
}
import React from "react";
import { NavLink } from "react-router-dom";



export const Home = () => {

    return <div className="home"> 
    <h1>Traillo makes managing projects easy.</h1>
    <p>Take productivity to another level, from business to home. Whether you collab with others or work alone, you can accomlpish anything with Traillo.</p>
    <NavLink to="/signup"><button>Sign up-it's free!</button></NavLink>

    </div>
}
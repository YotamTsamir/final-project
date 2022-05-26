import React from "react";
import { NavLink } from "react-router-dom";
import image from "../imgs/home-image.png"


export const Home = () => {

    return <div className="home"> 
    <div className="home-texts">
    <h1>Tredux - management made easy.</h1>
    <p>Take productivity to another level, from business to personal use. Whether you collab with others or work alone, you can accomplish anything with Tredux.</p>
    <NavLink to="/signup"><button>Sign up-it's free!</button></NavLink>
    </div>
    <div className="img-container">
        <img src={image}  />
    </div>

    </div>
}
// "https://www.kindpng.com/picc/m/663-6630367_transparent-background-teamwork-clipart-hd-png-download.png"

import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import image from "../imgs/home-image.png"
import exampleImg from "../imgs/board-ex.PNG"
import { userService } from "../services/user-service";
import { socketService, SOCKET_EVEN_SET_USER } from "../services/socket.service";


export const Home = () => {

    return <div className="home-page">
        <div className="home-upper">
            <div className="home-texts">
                <h1>Tredux - management made easy.</h1>
                <p>Take productivity to another level, from business to personal use. Whether you collab with others or work alone, you can accomplish anything with Tredux.</p>
                <NavLink to="/boards"><button>Continue as Guest</button></NavLink>
            </div>
            <div className="img-container">
                <img src={image} />
            </div>
        </div>

        <div className="home-lower">
            <article className="sub-home-article">
                <h1>It's more than work. It's a way of working together.</h1>
                <p>Start with a Tredux board, lists, and cards. Customize and expand with more features as your teamwork grows. Manage projects, organize tasks, and build team spirit—all in one place.</p>
            </article>
            <div className="example-img-container">
                <img src={exampleImg} />
            </div>
        </div>
    </div>
}

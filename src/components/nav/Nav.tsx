import React, { useEffect, useState } from "react";

import "./nav_styles.scss";

//svgs, imgs, and icons
import search from "./search.svg";
import home from "./home.svg";
import add from "./add.svg";
import request from "./request.svg";

const Nav:React.FC<any> = () => {
    //input text state
    const [inputText, setInputText] = useState("");


    useEffect(() => {
        console.log(inputText);
    }, [])

    return (
        <nav>
            <h1>Instagram</h1>
            <div className="nav-search">
                <input placeholder="Search" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
                <img src={search} className="icon" alt="" />
            </div>
            <div className="nav-icons">
                <img src={home} alt=""/>
                <img src={add} alt="" />
                <img src={request} alt="" />
                <div className="nav-profile"></div>
            </div>
        </nav>
    )
}

export default Nav;
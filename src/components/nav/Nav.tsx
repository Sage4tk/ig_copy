import { useEffect, useState } from "react";

import "./nav_styles.scss";

//svgs, imgs, and icons
import search from "./search.svg";
import home from "./home.svg";

export default function Nav() {
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
            </div>
        </nav>
    )
}
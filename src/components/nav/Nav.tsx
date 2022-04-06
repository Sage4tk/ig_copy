import React, { useEffect, useState } from "react";

import "./nav_styles.scss";

//svgs, imgs, and icons
import search from "./search.svg";
import home from "./home.svg";
import add from "./add.svg";
import request from "./request.svg";

//context
import { useUser } from "../../context/AuthContext";
import { url } from "inspector";

const Nav:React.FC<any> = () => {
    //input text state
    const [inputText, setInputText] = useState("");
    const { user } = useUser();

    useEffect(() => {
        console.log(user.displayName)
    }, [user])
    //menu toggle
    const [menu, setMenu] = useState(false);

    return (
        <nav>
            <div className="nav-container">
                <h1>Instagram</h1>
                <div className="nav-search">
                    <input placeholder="Search" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
                    <img src={search} className="icon" alt="" />
                </div>
                <div className="nav-icons">
                    <img src={home} alt=""/>
                    <img src={add} alt="" />
                    <img src={request} alt="" />
                    <div className="nav-profile" onClick={() => {setMenu(!menu)}} style={{backgroundImage:`url(${user.photoURL})`, backgroundSize:"cover"}}>
                        {menu && <DropDown user={user} />}
                    </div>   
                </div>
            </div>
        </nav>
    )
}

interface DropProps {
    user: object
}

const DropDown:React.FC<DropProps> = ({ user }) => {
    //logout
    const { signOut } = useUser();

    return (
        <>
        <div className="arrow"></div>
        <div className="drop-down">
            <div>
                <p>Profile</p>
            </div>
            <div>
                <p onClick={signOut}>Log Out</p>
            </div>
        </div>    
        </>
    )
}

export default Nav;
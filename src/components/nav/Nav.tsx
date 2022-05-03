import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./nav_styles.scss";

//svgs, imgs, and icons
import search from "./search.svg";
import home from "./home.svg";
import add from "./add.svg";
import request from "./request.svg";

//context
import { useUser } from "../../context/AuthContext";
import { useName } from "../../context/UserContext";

//components
import Post from "./Post";

const Nav:React.FC<any> = () => {
    //set username
    const { userDeed, login } = useName();

    //input text state
    const [inputText, setInputText] = useState("");
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            login(user.uid);
        }
    }, [user])

    //menu toggle
    const [menu, setMenu] = useState(false);

    //add post toggle
    const [addPost, setAddPost] = useState(false);

    return (
        <>
        <nav>
            <div className="nav-container">
                <h1>Instagram</h1>
                <div className="nav-search">
                    <input placeholder="Search" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
                    <img src={search} className="icon" alt="" />
                </div>
                {user && <div className="nav-icons">
                    <img src={home} alt=""/>
                    <img src={add} alt="" onClick={()=> {setAddPost(!addPost)}}/>
                    <img src={request} alt="" />
                    <div className="nav-profile" onClick={() => {setMenu(!menu)}} style={{backgroundImage:`url(${user.photoURL})`,backgroundSize:"cover"}}>
                        {menu && <DropDown user={user} />}
                    </div>   
                </div>}
                {!user && <NavLink to="/" className="nav-login">Log In</NavLink>}
            </div>
        </nav>
        <Post open={addPost} setOpen={setAddPost} />
        </>
    )
}

// backgroundImage:`url(${user.photoURL})`

interface DropProps {
    user: object
}

const DropDown:React.FC<DropProps> = ({ user }) => {
    //logout
    const { signOut } = useUser();
    const { userDeed } = useName();

    return (
        <>
        <div className="arrow"></div>
        <div className="drop-down">
            <div>
                <NavLink to={`/${userDeed.username}`}>Profile</NavLink>
            </div>
            <div>
                <p onClick={signOut}>Log Out</p>
            </div>
        </div>    
        </>
    )
}

export default Nav;
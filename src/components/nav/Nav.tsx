import React, { Dispatch, useEffect, useState } from "react";

import "./nav_styles.scss";

//svgs, imgs, and icons
import search from "./search.svg";
import home from "./home.svg";
import add from "./add.svg";
import request from "./request.svg";

//context
import { useUser } from "../../context/AuthContext";

const Nav:React.FC<any> = () => {
    //input text state
    const [inputText, setInputText] = useState("");
    const { user } = useUser();

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
                <div className="nav-icons">
                    <img src={home} alt=""/>
                    <img src={add} alt="" onClick={()=> {setAddPost(!addPost)}}/>
                    <img src={request} alt="" />
                    <div className="nav-profile" onClick={() => {setMenu(!menu)}} style={{backgroundImage:`url(${user.photoURL})`, backgroundSize:"cover"}}>
                        {menu && <DropDown user={user} />}
                    </div>   
                </div>
            </div>
        </nav>
        <AddPost open={addPost} setOpen={setAddPost} />
        </>
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

interface AddProps {
    open: boolean,
    setOpen: Dispatch<any>
}

const AddPost:React.FC<AddProps> = ({ open, setOpen }) => {

    const [formHandler, setFormHandler] = useState({
        caption:"",
        img:""
    })

    if (!open) return (null)

    return (
        <>
        <div className="add-container" onClick={() => {setOpen(!open)}}>
        </div>
        <div className="add-window">
                <div className="add-header">
                    <p>Create new post</p>
                </div>
                <div className="add-body">
                    <div>
                        
                    </div>
                    <p>Drag photo here</p>
                    <input type="file" id="img" style={{display:"none"}} />
                    <label htmlFor="img">Select from computer</label>
                </div>
            </div>
        </>
    )
}

export default Nav;
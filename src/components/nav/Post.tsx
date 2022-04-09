import React, { Dispatch, useState } from "react";

interface AddProps {
    open: boolean,
    setOpen: Dispatch<any>
}

const Post:React.FC<AddProps> = ({ open, setOpen }) => {
    
    const [formHandler, setFormHandler] = useState({
        caption:"",
        img:""
    })

    //img checker
    const checkImg = (event:object) => {

    }

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
                    <input type="file" id="img" style={{display:"none"}} accept=".jpg,.png,.jpeg" />
                    <label htmlFor="img">Select from computer</label>
                </div>
            </div>
        </>
    )
}

export default Post;
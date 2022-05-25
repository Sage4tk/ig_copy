//styling
import { useEffect, useState } from "react";
import "./focus_style.scss";

interface PictureFocusProps {
    data: object,
    focus: boolean
    setFocus: Function
}

const PictureFocus:React.FC<any> = ({ open, setOpen, posts }) => {

    const moveLeft = () => {
        if (open > 0) {
            setOpen(open - 1);
        }
    }

    const moveRight = () => {
        if (open < posts.length - 1) {
            setOpen(open + 1);
        }
    }


    if (open === false) return (null)

    return (
        <>
        <div className="background-wrapper" onClick={() => {setOpen(false)}}></div>
        <button className="left-arrow" onClick={() => {moveLeft()}}>Left</button>
        <div className="post-wrapper">
            {posts && <div className="post-picture" style={{backgroundImage: `url(${posts[open].imgUrl})`}}></div>}

            
            <div className="post-details">

            </div>  
        </div>
        <button className="right-arrow" onClick={() => {moveRight()}}>Right</button>
        </>
    )
}

export default PictureFocus;
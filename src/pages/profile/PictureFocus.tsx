//styling
import { useEffect } from "react";
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

    useEffect(() => {
        console.log(posts[open])
    }, [posts])

    if (open === false) return (null)

    return (
        <>
        <div className="background-wrapper" onClick={() => {setOpen(false)}}></div>
        <button className="left-arrow" onClick={() => {moveLeft()}}>Left</button>
        <div className="post-wrapper">
            {posts && <div className="post-picture" style={{backgroundImage: `url(${posts[open].imgUrl})`}}></div>}
            <div className="post-details">
                <div className="post-header">
                    <img src={posts[open].avatar} />
                    <p>{posts[open].username}</p>
                </div>
            </div>
            <div className="post-caption">
                <img src={posts[open].avatar} />
                <div>
                    <p>{posts[open].username}</p>
                    <p>post date: need to be put here</p>
                </div>
            </div>
        </div>
        <button className="right-arrow" onClick={() => {moveRight()}}>Right</button>
        </>
    )
}

export default PictureFocus;
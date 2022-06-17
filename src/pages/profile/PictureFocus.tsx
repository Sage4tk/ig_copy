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

    //add comment
    const [commentHandler, setCommentHandler] = useState<any>({
        comment: ""
    })

    const commentListener = (e:any) => {
        setCommentHandler({
            [e.target.name]: e.target.value
        })
        
        console.log(commentHandler)
    }

    const addComment = (e:any) => {
        e.preventDefault();
    }

    if (open === false) return (null)

    return (
        <>
        <div className="background-wrapper" onClick={() => {setOpen(false)}}></div>
        <button className="left-arrow" onClick={() => {moveLeft()}}>Left</button>
        <div className="post-wrapper">
            {posts && <div className="post-picture" style={{backgroundImage: `url(${posts[open].imgUrl})`}}></div>}
            <div className="post-details">
                <div className="post-header">
                    <img src={posts[open].avatar} className="small-avatar" />
                    <p className="name">{posts[open].username}</p>
                </div>
                <div className="post-caption">
                    <img src={posts[open].avatar} className="small-avatar" />
                    <div className="post-capcap">
                        <p className="name">{posts[open].username}</p>
                        <p>{posts[open].caption}</p>
                    </div>
                </div>
                <div className="comment-input">
                    <form onSubmit={addComment}>
                        <input placeholder="Add a comment..." name="comment" onChange={commentListener}/>
                        <button disabled={commentHandler.comment ? false:true} type="submit">Post</button>
                    </form>
                </div>
            </div>
        </div>
        <button className="right-arrow" onClick={() => {moveRight()}}>Right</button>
        </>
    )
}

export default PictureFocus;
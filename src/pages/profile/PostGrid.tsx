import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { db } from "../../firebase";

//components
import PictureFocus from "./PictureFocus";

const PostGrid:React.FC<any> = ({ userDeed }) => {
    //find posts
    const postRef:any = db.collection("UserImages").where("userId", "==", userDeed.uid);

    const [postPics] = useCollectionData(postRef);

    //set open post
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log(open)
    }, [open])

    return (
        <>
            <div className="post-container">
                {postPics && postPics.map((data:any, index:number) => (
                    <Picture data={data} key={index} setOpen={setOpen} index={index} />
                ))}
            </div>
            <PictureFocus open={open} setOpen={setOpen} posts={postPics} />
        </>
    )
}

const Picture:React.FC<any> = ({ data, setOpen, index }) => {

    return (
        <>
        <div className="picture" style={{backgroundImage: `url(${data. imgUrl})`}} onClick={() => setOpen(index)} >
            <div className="picture-hover">
                <p>{data.likes.length}</p>
                <p>{data.comments.length}</p>
            </div>
        </div>
        </>
    )
}

export default PostGrid;
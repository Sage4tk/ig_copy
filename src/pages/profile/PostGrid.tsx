import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { db } from "../../firebase";

//components
import PictureFocus from "./PictureFocus";

const PostGrid:React.FC<any> = ({ userDeed }) => {
    //find posts
    const postRef:any = db.collection("UserImages").where("userId", "==", userDeed.uid);

    const [postPics] = useCollectionData(postRef);

    useEffect(() => {
        console.log(postPics)
    }, [postPics])

    return (
        <>
            <div className="post-container">
                {postPics && postPics.map((data:any, index:number) => (
                    <Picture data={data} key={index} />
                ))}
            </div>
        </>
    )
}

const Picture:React.FC<any> = ({ data }) => {

    //open picture focus
    const [focus, setFocus] = useState(false);

    return (
        <>
        <div className="picture" style={{backgroundImage: `url(${data. imgUrl})`}} onClick={() => {setFocus(true)}} >
            <div className="picture-hover">
                <p>{data.likes.length}</p>
                <p>{data.comments.length}</p>
            </div>
        </div>
        <PictureFocus data={data} />
        </>
    )
}

export default PostGrid;
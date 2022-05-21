import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { db } from "../../firebase";

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
                    <Picture key={index} />
                ))}
            </div>
        </>
    )
}

const Picture:React.FC<any> = () => {
    return (
        <div className="picture">

        </div>
    )
}

export default PostGrid;
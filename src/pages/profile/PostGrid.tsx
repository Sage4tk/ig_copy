import { useEffect, useState } from "react";

import { db } from "../../firebase";

const PostGrid:React.FC<any> = ({ userDeed }) => {

    //picture state
    const [postPics, setPostPics] = useState<any>([])

    //find posts
    useEffect(() => {

        const findPosts = async () => {
            const find = await db.collection("UserImages").where("userId", "==", userDeed.uid).get();
            find.forEach((doc) => {
                let data = doc.data()
                setPostPics([...postPics, data])
            }) 
        }

        if (userDeed) {
            findPosts();
        }
        
    }, [userDeed]);

    const test = () => {console.log(postPics)}

    return (
        <>
            <div className="post-container" onClick={test}>
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
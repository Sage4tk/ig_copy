import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";


//styles
import "./profile_styles.scss";

//components
import Nav from "../../components/nav/Nav";

const Profile:React.FC = () => {
    const { id } = useParams();

    const [userFind, setUserFind] = useState<boolean | string | object>(false);


    //find profile
    const findUser = async() => {
        const snapshot = await db.collection("users").where("username", "==", id).get();
        
        if (snapshot.empty) {
            setUserFind(true);
        } else {
            snapshot.forEach(doc => {
                setUserFind(doc.data())
            })
        }
    }

    useEffect(() => {
        findUser()
    }, [id])

    useEffect(() => {
        console.log(userFind)
    }, [userFind])

    return (
        <>
        <Nav />
        {userFind === false ? <FindingUser />:
        userFind === true ? <UserNotFound />:
        <UserProfile userFind={userFind}/>
        }        
        </>
    ) 
}

const FindingUser:React.FC = () => {
    return (
        <div>
            
        </div>
    )
}

const UserNotFound:React.FC = () => {
    return (
        <div className="user-not-found">
            <div className="nfound-container">
                <h1>Sorry, this page isn't available.</h1>
                <p>The link you followed may be broken, or the page maye have been removed. <Link to="/">Go back to instagram.</Link></p>
            </div>
        </div>
    )
}

const UserProfile:React.FC<any> = ({ userFind }) => {
    return (
        <div className="user-wrapper">
            <div className="user-container">
                <div className="user-header">
                    <div className="pfp">
                        <img src={userFind.avatar} />
                    </div>
                    <div className="details">
                        <div className="username-section">
                            <p>{userFind.username}</p>
                        </div>
                        <div className="following">
                            <p><span className="bold">{userFind.posts.length}</span> posts</p>
                            <p><span className="bold">{userFind.followers.length}</span> followers</p>
                            <p><span className="bold">{userFind.following.length}</span> following</p>
                        </div>
                        <div>
                            <p>no bio</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
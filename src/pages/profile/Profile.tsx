import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";

//styles
import "./profile_styles.scss";

//components
import Nav from "../../components/nav/Nav";
import PostGrid from "./PostGrid";
import { useName } from "../../context/UserContext";

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
        findUser();
    }, [id])

    return (
        <>
        <Nav />
        {userFind === false ? <FindingUser />:
        userFind === true ? <UserNotFound />:
        <UserProfile userFind={userFind} id={id} />
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

const UserProfile:React.FC<any> = ({ userFind, id }) => {
    const{ userDeed } = useName();

    return (
        <div className="user-wrapper">
            <div className="user-container">
                <div className="user-header">
                    <div className="pfp">
                        <img src={userFind.avatar} referrerPolicy="no-referrer" alt="" />
                    </div>
                    <div className="details">
                        <div className="username-section">
                            <p>{userFind.username}</p>
                            <FollowBtn id={id} userDeed={userDeed} />
                        </div>
                        <div className="following">
                            <p><span className="bold">{userFind.posts}</span> posts</p>
                            <p><span className="bold">{userFind.followers.length}</span> followers</p>
                            <p><span className="bold">{userFind.following.length}</span> following</p>
                        </div>
                        <div>
                            <p>no bio</p>
                        </div>
                    </div>
                </div>
                {id && <PostGrid id={id} />}
            </div>
        </div>
    )
}

const FollowBtn:React.FC<any> = ({ id, userDeed }) => {

    const userRef = db.collection("users")

    //prevent follow again after folling
    const [followed, setFollowed] = useState(0);

    //follow method
    const follow = async () => {
        //prevent spamming follow button
        setFollowed(1);

        //gets current logged user and adds following
        const currentSnap = await userRef.where("uid", "==", userDeed.uid).get();

        currentSnap.forEach(doc => {
            const followingData = doc.data();
            userRef.doc(doc.id).update({following: [...followingData.following, id]});
        })
        
        //gets target account and adds follower
        const targetSnap = await userRef.where("username", "==", id).get();

        targetSnap.forEach(doc => {
            const follwerData = doc.data();
            userRef.doc(doc.id).update({followers: [...follwerData.followers, userDeed.username]})
        })

        setFollowed(2);
        setForce(false)
    }
    
    //force follow button when unfollwed
    const [force, setForce] = useState(false);

    //unfollow mechanism
    const unfollow = async() => {

        //get auth user
        const currentSnap = await userRef.where("uid", "==", userDeed.uid).get();

        //remove in array of auth user
        currentSnap.forEach(doc => {
            //filters user
            let updateFollowing = doc.data().following.filter((e:any) => {
                return e !== id
            })

            //remove in db
            userRef.doc(doc.id).update({
                following: updateFollowing
            })
        })

        //get target user
        const targetSnap = await userRef.where("username", "==", id).get();

        //remove in array of auth target
        targetSnap.forEach(doc => {
            let updateFollwers = doc.data().followers.filter((e:any) => {
                return e !== userDeed.username
            })

            //remeove in db
            userRef.doc(doc.id).update({
                followers: updateFollwers
            })
        })

        setForce(true)
    }

    if (!userDeed) return (null);

    if (id === userDeed.username) return (null);

    if (force) return (
        <button className="follow-btn" onClick={follow} disabled={followed === 1?true:false}>
            Follow
        </button>
    )

    //unfollow button
    if (userDeed.following.includes(id) || followed === 2) return (
        <button className="follow-btn" onClick={unfollow}>
            Unfollow
        </button>
    )

    //follow button
    return (
        <button className="follow-btn" onClick={follow} disabled={followed === 1?true:false}>
            Follow
        </button>
    )
}

export default Profile;
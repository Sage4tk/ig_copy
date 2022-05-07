import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";


//styles
import "./profile_styles.scss";

//components
import Nav from "../../components/nav/Nav";

const Profile:React.FC = () => {
    const { id } = useParams();

    const [userFind, setUserFind] = useState<boolean | string>(false);


    //find profile
    const findUser = async() => {
        const snapshot = await db.collection("users").where("username", "==", id).get();
        
        if (snapshot.empty) {
            setUserFind(true);
        }
    }

    useEffect(() => {
        findUser()
    }, [id])

    return (
        <>
        <Nav />
        {userFind === false ? <FindingUser />:
        userFind === true ? <UserNotFound />:
        <UserProfile />
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

const UserProfile:React.FC = () => {
    return (
        <div>

        </div>
    )
}

export default Profile;
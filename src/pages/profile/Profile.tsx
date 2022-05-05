import { useState } from "react";
import { useParams } from "react-router-dom";
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

        }
    }

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
        <div></div>
    )
}

const UserProfile:React.FC = () => {
    return (
        <div>
            
        </div>
    )
}

export default Profile;
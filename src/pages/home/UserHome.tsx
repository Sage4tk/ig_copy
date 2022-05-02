import { useEffect, useState } from "react";

//db
import { db } from "../../firebase";

//components
import Nav from "../../components/nav/Nav";
import Register from "./Register";

//import context
import { useUser } from "../../context/AuthContext";

const UserHome:React.FC<any> = () => {
    const { user } = useUser();
    
    //check if user has username in db
    const [register, setRegister] = useState(true)

    const findUser = async() => {
        const snapShot = await db.collection("users").where("uid","==",user.uid).get();

        if (snapShot.empty) {
                setRegister(false)
        };
    }

    useEffect(() => {
        if(user) {
            findUser();
        }      
    }, [user])
    
    return (
        <>
        <Nav />
        <div className="home-home">

        </div>
        {user && <Register register={register} setRegister={setRegister} uid={user.uid}/>}
        </>
    )
}

export default UserHome;
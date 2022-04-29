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
        const snapShot = await db.collection("users").where("user","==","iCtX6Wf3mOxOqBk9wE4oOFvfjwJb2d").get();

        if (snapShot.empty) {
                setRegister(false)
                return;
        };
    }

    useEffect(() => {
        findUser();        
    }, [user])
    
    return (
        <>
        <Nav />
        <div className="home-home">

        </div>
        <Register register={register} />
        </>
    )
}

export default UserHome;
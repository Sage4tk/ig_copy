//context
import { useUser } from "../../context/AuthContext"

//components
import Login from "./Login";
import UserHome from "./UserHome";

const Home:React.FC<any> = () => {

    const { user, signOut } = useUser();

    if (localStorage.getItem("login") === "true") return <UserHome />

    return (
        <>
            {user ? <UserHome />:<Login />}
        </>
    )
}

export default Home;
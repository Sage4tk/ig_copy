//context
import { useUser } from "../../context/AuthContext"

//components
import Login from "./Login";

const Home:React.FC<any> = () => {

    const { user, signOut } = useUser();

    return (
        <>
            {user ? <h1>There is user</h1>:<Login />}
        </>
    )
}

export default Home;
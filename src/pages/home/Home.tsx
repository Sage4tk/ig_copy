//context
import { useUser } from "../../context/AuthContext"

const Home:React.FC<any> = () => {

    const { user, signOut } = useUser();

    return (
        <div>
            {user ? <h1>There is user</h1>:<Login />}
            
        </div>
    )
}

const Login:React.FC<any> = () => {

    const { signIn } = useUser();

    return (
        <div>
            <h1>Log in page</h1>
            <button onClick={signIn}>Login</button>
        </div>
    )
}

export default Home;
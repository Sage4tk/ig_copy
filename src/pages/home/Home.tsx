//context
import { useUser } from "../../context/AuthContext"

const Home:React.FC<any> = () => {

    const { user, signIn } = useUser();

    return (
        <div>
            {user ? <h1>There is user</h1>:<Login />}
            <button onClick={signIn}>Login</button>
        </div>
    )
}

const Login:React.FC<any> = () => {
    return (
        <div>
            <h1>Log in page</h1>
        </div>
    )
}

export default Home;
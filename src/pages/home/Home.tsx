//context
import { useUser, useLogin } from "../../context/AuthContext"

const Home:React.FC<any> = () => {

    const user = useUser();
    const login = useLogin();

    return (
        <div>
            {user ? <h1>There is user</h1>:<Login />}
            <button>Login</button>
        </div>
    )
}

const Login:React.FC<any> = () => {
    const login = useLogin();
    return (
        <div>
            <h1>Log in page</h1>
        </div>
    )
}

export default Home;
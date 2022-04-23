//context
import { useUser } from "../../context/AuthContext";

//components
import Nav from "../../components/nav/Nav";

const UserHome:React.FC<any> = () => {
    //signout
    const { signOut } = useUser();

    return (
        <>
        <Nav />
        <div className="home-home">

        </div>
        </>
    )
}

export default UserHome;
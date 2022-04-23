import { useParams } from "react-router-dom";

//components
import Nav from "../../components/nav/Nav";

const Profile:React.FC = () => {
    const { id } = useParams();
    return (
        <>
        <Nav />
        <h1>{id}</h1>
        </>
    ) 
}

export default Profile;
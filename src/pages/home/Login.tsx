import { useState } from "react";

import "./login_styles.scss";

//images
import logHov from './googbtn.png';
import logbtn from "./googbtnf.png";
import press from "./googp.png";

//context
import { useUser } from "../../context/AuthContext";

const Login:React.FC = () => {
    //auth context to login
    const { signIn } = useUser();

    //check hover and mousedown
    const [hoverBtn, setHoverBtn] = useState(false);
    const [down, setDown] = useState(false)

    const mouseChecker = (hover:boolean, down:boolean) => {
        if (hover && down) return press;
        if (hover) return logbtn;
        return logHov;
    }

    return (
        <div className="login-page">
            <div className="container">
                <h1>Instagram</h1>
                <img src={mouseChecker(hoverBtn, down)} alt="" onMouseOver={() => setHoverBtn(true)} onMouseLeave={() => setHoverBtn(false)} onMouseDown={() => setDown(true)}  onMouseUp={() => setDown(false)} onClick={signIn} />
            </div>
        </div>
    )
}

export default Login;
import { useEffect, useState } from "react";
import { db } from "../../firebase";

interface RegisterProps {
    register: boolean
}

const Register:React.FC<RegisterProps> = ({ register }) => {
    //form handler
    const [formHandler, setFormHandler] = useState<string>("");

    //display error
    const [errorInput, setErrorInput] = useState(false);

    //submit string to db
    const submitUsername = () => {
        if ((/\s/g).test(formHandler) || formHandler.length < 3) {
            setErrorInput(true)
        }
    }

    if (register) return (null);

    return (
        <div className="wrapper">
            <div className="container-username">
                <div className="username-header">
                    <h1>Set a Username</h1>
                </div>
                <div className="setusername">
                    <input type="text" name="username" placeholder="username" onChange={(e) => {setFormHandler(e.target.value)}}/>
                    {errorInput && <p className="error">User name must contain more than 3 letters</p>}
                    <button onClick={submitUsername}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Register;
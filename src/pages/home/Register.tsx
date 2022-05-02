import { Dispatch, useEffect, useState } from "react";
import { db } from "../../firebase";

interface RegisterProps {
    register: boolean,
    uid: string,
    setRegister: Dispatch<any>
}

const Register:React.FC<RegisterProps> = ({ register, uid, setRegister }) => {
    //db
    const userRef = db.collection("users");

    //form handler
    const [formHandler, setFormHandler] = useState<string>("");

    //display error
    const [errorInput, setErrorInput] = useState<boolean | string>(false);

    //check db if user exist
    const checkDB = async() => {
        try {
            const snapshot = await userRef.where("username","==",formHandler).get();

            if (snapshot.empty) {
                const addUser = await userRef.add({
                    username: formHandler,
                    uid
                });
                setRegister(true);
            } else {
                setErrorInput("Username already exist")
            }
        } catch(err) {
            console.log(err)
        }
    }

    //submit string to db
    const submitUsername = (e:any) => {
        e.preventDefault();
        if ((/\s/g).test(formHandler) || formHandler.length < 3) {
            setErrorInput("Username must contain more than 3 letters");
        } else {
            checkDB();
        }
    }

    if (register) return (null);

    return (
        <div className="wrapper">
            <div className="container-username">
                <div className="username-header">
                    <h1>Set a Username</h1>
                </div>
                <form className="setusername" onSubmit={submitUsername}>
                    <input type="text" name="username" placeholder="username" onChange={(e) => {setFormHandler(e.target.value)}}/>
                    {errorInput && <p className="error">User name must contain more than 3 letters</p>}
                    <button type="submit" disabled>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register;
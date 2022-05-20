import { Dispatch, useEffect, useState } from "react";
import { db } from "../../firebase";

//context
import { useUser } from "../../context/AuthContext";

interface RegisterProps {
    register: boolean,
    setRegister: Dispatch<any>
}

const Register:React.FC<RegisterProps> = ({ register, setRegister }) => {
    //user context
    const { user } = useUser();

    //db
    const userRef = db.collection("users");

    //form handler
    const [formHandler, setFormHandler] = useState<string>("");

    //display error
    const [errorInput, setErrorInput] = useState<null | string>(null);

    //check db if user exist
    const checkDB = async() => {
        try {
            const snapshot = await userRef.where("username","==",formHandler).get();

            if (snapshot.empty) {
                const addUser = await userRef.add({
                    username: formHandler,
                    uid: user.uid,
                    avatar: user.photoURL,
                    followers: [],
                    following: [],
                    posts: 0,
                    bio: ""
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
            console.log('test')
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
                    {errorInput && <p className="error">{errorInput}</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register;
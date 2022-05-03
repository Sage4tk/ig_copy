import { useState, useContext, createContext } from "react";

//import firebase
import { db } from "../firebase";

const UserContext = createContext<any>({})

//export as hook
export const useName = () => {
    return useContext(UserContext);
}

//create context where you can username and set picture
export const UserProvider:React.FC<any> = ({ children }) => {
    const [userDeed, setUserDeed] = useState(null);

    const login = async (id:string) => {
        const find = await db.collection("users").where("uid","==", id).get();

        if (find.empty) return;

        find.forEach((doc:any) => {
            setUserDeed(doc.data())
        })
    }

    const removeData = () => {
        setUserDeed(null);
    }
    
    return (
        <UserContext.Provider value={{
            userDeed,
            login,
            removeData
        }}>
            {children}
        </UserContext.Provider>
    )
}
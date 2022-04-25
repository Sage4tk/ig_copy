import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

import app from "../firebase";

import { createContext, useContext } from "react";

import { useAuthState } from "react-firebase-hooks/auth";

const auth:any = app.auth();

const AuthContext = createContext<any>({});

//user hook
export const useUser = () => {
    return useContext(AuthContext);
}

export const AuthProvider:React.FC<any> = ({children}) => {
    const [user]:any = useAuthState(auth);

    const signIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        localStorage.setItem("login", "true")
    }

    const signOut = () => {
        if (user) {
            auth.signOut();
            localStorage.removeItem("login")
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}
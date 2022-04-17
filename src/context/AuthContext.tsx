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

    const signIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    const signOut = () => {
        if (user) {
            auth.signOut();
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
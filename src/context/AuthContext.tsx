import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

import { createContext, useContext } from "react";

import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
    apiKey: "AIzaSyAXscWNKhoh4AwpfgTxra-DnkdCgq_kCVY",
    authDomain: "instagram-copy-f5d54.firebaseapp.com",
    projectId: "instagram-copy-f5d54",
    storageBucket: "instagram-copy-f5d54.appspot.com",
    messagingSenderId: "790511415129",
    appId: "1:790511415129:web:fc6276589aa94394dda648",
    measurementId: "G-K941PZTKQX"
})

const auth:any = firebase.auth();

const AuthContext = createContext({});
const SignInContext = createContext({});

//user hook
export const useUser = () => {
    return useContext(AuthContext);
}

//log in hook
export const useLogin = () => {
    return useContext(SignInContext);
}

export const AuthProvider:React.FC<any> = ({children}) => {
    const [user]:any = useAuthState(auth);

    const signIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <AuthContext.Provider value={user}>
            <SignInContext.Provider value={signIn}>
            {children}
            </SignInContext.Provider>
        </AuthContext.Provider>
    )
}
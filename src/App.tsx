import { BrowserRouter, Routes, Route } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'


//components
import Nav from "./components/nav/Nav";
import Home from "./pages/home/Home"

firebase.initializeApp({
  apiKey: "AIzaSyAXscWNKhoh4AwpfgTxra-DnkdCgq_kCVY",
  authDomain: "instagram-copy-f5d54.firebaseapp.com",
  projectId: "instagram-copy-f5d54",
  storageBucket: "instagram-copy-f5d54.appspot.com",
  messagingSenderId: "790511415129",
  appId: "1:790511415129:web:fc6276589aa94394dda648",
  measurementId: "G-K941PZTKQX"
})

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Nav />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

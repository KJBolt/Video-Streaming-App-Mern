import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC1Ss5O4YA0vpmEadLI1LcmTskKitna5I",
  authDomain: "oauth-706cd.firebaseapp.com",
  projectId: "oauth-706cd",
  storageBucket: "oauth-706cd.appspot.com",
  messagingSenderId: "353355740246",
  appId: "1:353355740246:web:2504820d2e8f185b0e77f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()

export default app;

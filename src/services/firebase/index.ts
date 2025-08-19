import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  appId: import.meta.env.import.meta.env.VITE_APP_ID,
  projectId: import.meta.env.import.meta.env.VITE_PROJECT_ID,
  authDomain: import.meta.env.import.meta.env.VITE_AUTH_DOMAIN,
  messagingSenderId: import.meta.env.import.meta.env.VITE_SENDER_ID,
  measurementId: import.meta.env.import.meta.env.VITE_MEASUREMENT_ID,
  storageBucket: import.meta.env.import.meta.env.VITE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};
export { app, auth, signInWithGoogle };

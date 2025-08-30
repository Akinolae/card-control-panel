import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  appId: import.meta.env.VITE_APP_ID,
  projectId: import.meta.env.VITE_PROJECT_ID,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    return user;
  } catch (error) {
    throw error;
  }
};

const signInWithGitHub = async () => {
  const provider = new GithubAuthProvider();

  provider.setCustomParameters({
    allow_signup: "true",
  });

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export { app, auth, signInWithGoogle, signInWithGitHub };

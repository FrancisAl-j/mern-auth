import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";

const OAuth = () => {
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = signInWithPopup(auth, provider);
    } catch (error) {
      console.log("Could not login with google", error);
    }
  };

  return (
    <button type="button" className="googleBtn" onClick={handleGoogle}>
      Continue with Google
    </button>
  );
};

export default OAuth;

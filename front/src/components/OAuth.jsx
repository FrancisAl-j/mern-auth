// This is for Google account signup and signin
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";

const OAuth = () => {
  const dispatch = useDispatch();
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("http://localhost:5000/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      console.log(res.data);
      dispatch(signInSuccess(res.data));
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

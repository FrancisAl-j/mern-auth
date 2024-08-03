import { useSelector } from "react-redux";
import DefaultProfile from "../assets/profile.jpg";
import SignOut from "../assets/logout.svg";
import { signout } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Indicator = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      await axios.get(`http://localhost:5000/auth/signout`, {
        withCredentials: true,
      });
      dispatch(signout());
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  return (
    <div>
      <div className="pfp-container">
        <img
          className="pfp"
          src={currentUser ? currentUser.profilePicture : DefaultProfile}
          alt="profile"
        />
        <p>
          {currentUser
            ? currentUser.username
            : `Guest${Math.floor(Math.random() * 999)}`}
        </p>
        {currentUser ? (
          <img
            onClick={handleSignout}
            className="logout"
            src={SignOut}
            alt=""
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Indicator;

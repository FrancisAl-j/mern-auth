import { useSelector } from "react-redux";
import DefaultProfile from "../assets/profile.jpg";
import SignOut from "../assets/logout.svg";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="home-container">
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
        <img className="logout" src={SignOut} alt="" />
      </div>
      <div className="content-container">
        <h1>Welcome to my Mern-Authentication App</h1>
        <p>
          This Web-App is a full-stack build using mern development, it has the
          fundamentals of CRUD operation. It has a sign up page where you can
          create your own account, sign in page to sign in your accout, this
          web-app also use google account to sign up and sign in to this
          website. Had an authentication to authenticate the user using
          cookie/token.
        </p>
      </div>
    </div>
  );
};

export default Home;

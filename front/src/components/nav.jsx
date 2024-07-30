import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav>
      <Link to="/">
        <h1 className="logo">Auth App</h1>
      </Link>

      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/profile">
          {/* The code below shows if the currentUser is login if it's login then
            the profile will show on the website if not then the signin navigation
            will appear
        */}
          {currentUser ? (
            <img
              src={currentUser.profilePicture}
              alt="profile"
              className="profilePicture"
            />
          ) : (
            <li>Sign in</li>
          )}
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "../assets/menu.svg";
import { useState } from "react";

const Nav = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);

  const handleMenu = () => {
    setShow((prevShow) => !prevShow);
  };
  return (
    <nav>
      <Link to="/">
        <h1 className="logo">Auth App</h1>
      </Link>

      <ul className={show ? "show-menu" : ""}>
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
      <div className="menu">
        <img onClick={handleMenu} src={Menu} alt="menu" />
      </div>
    </nav>
  );
};

export default Nav;

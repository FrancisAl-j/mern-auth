import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <form>
        <img src={currentUser.profilePicture} alt="Profile" />
        <div className="body-container">
          <input
            type="text"
            defaultValue={currentUser.username}
            placeholder="Username"
          />
          <input
            type="email"
            defaultValue={currentUser.email}
            placeholder="Email"
          />
          <input type="password" placeholder="Password" />
        </div>
        <button className="update-btn">Update</button>
      </form>
      <div className="btns">
        <span>Delete Account</span>
        <span>Sign out</span>
      </div>
    </div>
  );
};

export default Profile;

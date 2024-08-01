import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";

import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined); //State to store image
  const [imageLoading, setImageLoading] = useState(0); // State to handle the loading of image
  const [imageError, setImageError] = useState(false); // handles error
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
    profilePicture: currentUser.profilePicture,
  }); // State where the data will be stored
  const [success, setSuccess] = useState(false); // Will send the message if the update is success

  const fileRef = useRef(null);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  //Handling upload to firebase
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const updloadTask = uploadBytesResumable(storageRef, image);

    // this coded below show the percentage of loading or upload
    updloadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageLoading(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(updloadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  // Handle the change of the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // Updating a profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/user/update/${currentUser._id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      console.log(data);
      if (res.status === 200) {
        dispatch(updateSuccess(data));
        setSuccess(true);
      } else {
        dispatch(
          updateFailure({
            message: "Profile update failed!",
          })
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="Profile"
          onClick={() => fileRef.current.click()}
        />
        <p className="img-text">
          {imageError ? (
            <span className="img-err">Error uploading image</span>
          ) : imageLoading > 0 && imageLoading < 100 ? (
            <span className="img-loading">{`Uploading image... ${imageLoading}%`}</span>
          ) : imageLoading === 100 ? (
            <span className="img-success">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <div className="body-container">
          <input
            type="text"
            defaultValue={currentUser.username}
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="email"
            defaultValue={currentUser.email}
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="update-btn">
          {loading ? "Updating" : "Update"}
        </button>
      </form>
      <div className="btns">
        <span>Delete Account</span>
        <span>Sign out</span>
      </div>
      <p className="error">{error && "Something went wrong"}</p>
      <p className="success">{success && "Update successfully"}</p>
    </div>
  );
};

export default Profile;

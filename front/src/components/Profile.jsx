import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imageLoading, setImageLoading] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  const fileRef = useRef(null);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

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

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <form>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={currentUser.profilePicture}
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

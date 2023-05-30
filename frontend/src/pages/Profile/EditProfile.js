import React, { useEffect } from "react";
import "./Profile.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import Loader from "../../Components/Loader/Loader";
import Card from "../../Components/Card/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "../../services/authServices";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { BiLocationPlus } from "react-icons/bi";
import ChangePw from "../../Components/changePassword/ChangePw";

const EditProfile = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { email } = user;
  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);
  const initstate = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    photo: user?.photo,
    bio: user?.bio,
  };
  const [profile, setprofile] = useState(initstate);
  const [photo, setphoto] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setprofile({ ...profile, [name]: value });
  };
  const handleImageChange = (e) => {
    setphoto(e.target.files[0]);
  };
  const editProfile = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      let photoURL;
      if (photo) {
        const photu = new FormData();
        photu.append("file", photo);
        photu.append("cloud_name", "decm4dhbo");
        photu.append("upload_preset", "bz8ta198");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/decm4dhbo/image/upload",
          { method: "POST", body: photu }
        );
        const imageData = await response.json();
        photoURL = imageData.url.toString();
      }
      const formData = {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        bio: profile.bio,
        photo: photo ? photoURL : profile?.photo,
      };
      const data = await updateProfile(formData);

      toast.success("User Profile updated successfully");
      navigate("/profile");
      setloading(false);
    } catch (error) {
      setloading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="profile --my2">
      {loading && <Loader />}
      <Card cardClass={"card"}>
        <span className="profile-photo">
          <img src={user?.photo} alt="profilepic" />
        </span>
        <form className="--form-control" onSubmit={editProfile}>
          <span className="profile-data">
            <p>
              <label>Name: </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile.email} disabled />
              <br />
              <code>Email cannot be changed</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                cols="20"
                rows="8"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="photo" onChange={handleImageChange} />
            </p>
            <div>
              <button className="--btn --btn-primary">Save Changes</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePw />
    </div>
  );
};

export default EditProfile;

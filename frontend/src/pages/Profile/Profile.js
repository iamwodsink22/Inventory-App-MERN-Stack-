import React, { useEffect } from "react";
import "./Profile.scss";
import RedirectOutUser from "../../customHook/redirectOutUser";
import { useState } from "react";
import { getProfile } from "../../services/authServices";
import { useDispatch } from "react-redux";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import Loader from "../../Components/Loader/Loader";
import Card from "../../Components/Card/Card";
import { Link } from "react-router-dom";

const Profile = () => {
  RedirectOutUser("/login");
  const dispatch = useDispatch();
  const [profile, setprofile] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    async function getData() {
      const data = await getProfile();

      setprofile(data);
      setloading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getData();
  }, []);
  return (
    <div className="profile --my2">
      {loading && <Loader />}
      {!loading && profile === null ? (
        <p>Something went wrong, Reload the Page</p>
      ) : (
        <Card cardClass={"card --flex-dir-column"}>
          <span className="profile-photo">
            <img src={profile?.photo} alt="profilepic" />
          </span>
          <span className="profile-data">
            <p>
              <b>Name: </b>
              {profile?.name}
            </p>
            <p>
              <b>Email: </b>
              {profile?.email}
            </p>
            <p>
              <b>Phone No : </b>
              {profile?.phone}
            </p>
            <p>
              <b>Bio: </b>
              {profile?.bio}
            </p>
            <div>
              <Link to={"/edit-profile"}>
                <button className="--btn --btn-primary">Edit Profile</button>
              </Link>
            </div>
          </span>
        </Card>
      )}
    </div>
  );
};

export default Profile;

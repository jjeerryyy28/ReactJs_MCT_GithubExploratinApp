import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DetailsCardP from "../Details Card/DetailsCardP";
import "../Login Profile/LoginProfile.css";
import { useState, useEffect } from "react";

const RepoContainer = (props) => {
  return (
    <div className="RepoContainer">
      <div className="repoCon">
  <div className="repoInfo">
    <h3>{props.RepoName}</h3>
    {props.lang && <h5 className="language">{props.lang}</h5>}
  </div>
</div>


      <h5>Created at: {props.date}</h5>

      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <button>Visit Repo</button>
      </a>
    </div>
  );
};

const Profile = () => {
  const loginData = useSelector((state) => state.userData);
  const [state, setState] = useState({});
  useEffect(() => {
    if (loginData && loginData[0]) {
      fetch(`https://api.github.com/users/${loginData[0].login}/repos`)
        .then((res) => res.json())
        .then((data) => {
          setState(data.slice(0, 5));
        });
    }
  }, [loginData]);

  const handleViewProfile = () => {
    if (loginData && loginData[0]) {
      window.open(loginData[0].html_url, "_blank");
    }
  };

  return (
    <div className="LoginProfile">
      {loginData && loginData[0] ? (
        <>
          <h3>My GitHub Profile</h3>

          <div className="profile-card">
            <div className="profile-img">
              <img src={loginData[0].avatar_url} alt="Profile" />
            </div>
            <div className="profile-details">
              <h4>{loginData[0].name}</h4>
              <div className="profile-info">
                <p>Repository: {loginData[0].public_repos}</p>
                <p>Follower: {loginData[0].followers}</p>
                <p>Following: {loginData[0].following}</p>
              </div>
              <p>{loginData[0].location}</p>
              <p>{loginData[0].linkedin_id}</p>
              <button className="view-profile-btn" onClick={handleViewProfile}>
                View Profile
              </button>
            </div>
          </div>

          <h3>Repositories</h3>

          <div className="repo">
            {state[0] !== undefined ? (
              <>
                {state.map((apidata, key) => (
                  <RepoContainer
                    key={key}
                    RepoName={apidata.name}
                    date={apidata.created_at}
                    lang={apidata.language}
                    link={apidata.url}
                  />
                ))}
              </>
            ) : (
              <div className="loading">Loading...</div>
            )}
          </div>
        </>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
};

export default Profile;

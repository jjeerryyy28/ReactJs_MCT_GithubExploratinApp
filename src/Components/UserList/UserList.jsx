import React, { useState, useEffect, useContext } from "react";
import UserCard from "../User Card/UserCard";
import Loader from "../Loader";
import { AuthContext } from "../Context/Context";
import "../UserList/UserList.css";

const UserList = () => {
  const [data, setData] = useState([]);
  const { name } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (name !== "") {
          const userResponse = await fetch(`https://api.github.com/users/${name}`);
          const user = await userResponse.json();

          const reposResponse = await fetch(`https://api.github.com/users/${name}/repos`);
          const repos = await reposResponse.json();

          const userData = { ...user, repos: repos.slice(0, 5) };
          setData([userData]); // Set the user data as a single-item array
        } else {
          const response = await fetch("https://api.github.com/users");
          const userData = await response.json();
          setData(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div className="UserList">
      {data.length > 0 ? (
        data.map((user) => (
          <UserCard
            key={user.login}
            img={user.avatar_url}
            username={user.login}
            followers={user.followers_url}
            following={user.following_url}
            repos={user.repos} // Pass the top 5 repos to the UserCard component
          />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UserList;

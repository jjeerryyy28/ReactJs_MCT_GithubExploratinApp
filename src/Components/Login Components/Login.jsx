import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/Context";
import { useDispatch } from "react-redux";
import { addData } from "../Redux/UserSlice";
import "../Login Components/Login.css";

const Login = (props) => {
  const { setisloggedIn } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    password: "",
    ghuser: "",
  });

  const getData = async () => {
    const response = await fetch(`https://api.github.com/users/${user.ghuser}`);
    const data = await response.json();
    dispatch(addData(data));
  };

  const handleAuth = () => {
    if (
      user.password === "qwerty123" &&
      user.ghuser != ""
    ) {
      setisloggedIn(true);
      getData();
    } else {
      alert("Enter proper Credentials/Github username Mandatory");
    }
  };

  return (
    <div className="login">
      <h3>Login Here...</h3>
      <div>
        <label>Enter Github user-name</label>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setUser({ ...user, ghuser: e.target.value });
          }}
        />
      </div>

      <div>
        <label>Enter password</label>
        <br />
        <input
          type="password"
          placeholder="qwerty123"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
      </div>

      <div>
        <button onClick={handleAuth}>Login</button>
      </div>
    </div>
  );
};

export default Login;

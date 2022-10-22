import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate  } from "react-router-dom";
import '.././styles/login.css';

async function loginUser(credentials) {
 return fetch('https://carrie-shedule.herokuapp.com/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     "Access-Control-Allow-Origin": "*"
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken , getUser}) {
  const [email, setEmial] = useState();
  const [password, setPassword] = useState();
  const history = useNavigate ();

    const handleSubmit = async e => {
    e.preventDefault();
    const user = await loginUser({
      email,
      password
    });
    setToken(user)
    // console.log(user.role)
    // getUser(user.name, user.role)
    user.role === "Doctor" ? (history("/dashboard")):(history("/home"))
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmial(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div> 
          <a href="/signup">Create new account</a>
      </div>
    </div>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
}
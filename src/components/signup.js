import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate  } from "react-router-dom";
import { Dropdown } from 'semantic-ui-react'



async function reguser(credentials) {
 return fetch('https://carrie-shedule.herokuapp.com/signup', {
  // mode: 'no-cors',
  method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     "Access-Control-Allow-Origin": "*",
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Signup({ setToken }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [password, setPassword] = useState();
  const [distance, setDistance] = useState();
  const history = useNavigate ();
  const options = [
  { key: 1, text: 'Clinician', value: "Doctor" },
  { key: 2, text: 'Patient', value: "Patient" },
]
  const handleSubmit = async e => {
    e.preventDefault();
    const user = await reguser({
      name,
      email,
      role,
      password,
      distance
    });
    setToken(user);
    console.log(user)
    user.role === "Doctor" ? (history("/dashboard")):(history("/home"))
    
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input type="text" onChange={e => setName(e.target.value)}/>
        </label>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <label>
          <p>Role</p>
          <input type="text" onChange={e => setRole(e.target.value)}/>
        </label>
        <label>
          <p>Distance to the Base</p>
          <input type="text" onChange={e => setDistance(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        {/* <div><Dropdown clearable fluid options={options} selection /></div> */}
        
      </form>
      <div>
        Do you have an account already? 
          <a href="/">LogIn</a>
      </div>
      {/* <div role="listbox" aria-expanded="false" class="ui selection dropdown" tabindex="0"><i aria-hidden="true" class="dropdown icon"></i><div class="menu transition"><div style="pointer-events:all" role="option" aria-checked="false" aria-selected="true" class="selected item"><span class="text">Choice 1</span></div><div style="pointer-events:all" role="option" aria-checked="false" aria-selected="false" class="item"><span class="text">Choice 2</span></div><div style="pointer-events:all" role="option" aria-checked="false" aria-selected="false" class="item"><span class="text">Choice 3</span></div></div></div> */}
    </div>
    
  );
}

Signup.propTypes = {
  setToken: PropTypes.func.isRequired
}
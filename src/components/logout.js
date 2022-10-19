import React from 'react';
import { useNavigate  } from "react-router-dom";

export default function Logout() {
    const history = useNavigate ();

  const logout = () => {
    sessionStorage.removeItem('token');
    
    console.log("Logging out")
    history("/")
    window.location.reload();
    console.log("logged out")
    // setIsLoggedin(false);
  };
  return(   
    <div>
      <button onClickCapture={logout}>Logout</button>
    </div>
  );
}
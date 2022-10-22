import React from 'react';
import Logout from './logout';
import DocHome from './Doctor/home';

export default function Dashboard() {
  const logout = () => {
    sessionStorage.removeItem('token');
    window.location.reload();
    // setIsLoggedin(false);
  };
  return(
    
    <div>
        <DocHome/>
      </div>
      
  );
}
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
      <div>
        <h1>
                Doctor's components
            </h1>
            <DocHome/>
      </div>
      
      <Logout/>
    </div>
  );
}
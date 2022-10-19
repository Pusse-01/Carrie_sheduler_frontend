import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };
  const [token, setToken] = useState(getToken());
   const [user, setUser] = useState({ name: "", role:"", email:"" }) 

  const saveUser = userToken => {
    sessionStorage.setItem('user', JSON.stringify(userToken));
    setUser(userToken.name, userToken.role)
  }

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };
  return {
    setToken: saveToken,
    setUser:saveUser,
    user,
    token
  }
}

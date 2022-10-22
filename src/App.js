import './App.css';
import React, { useState, useEffect ,useLayoutEffect } from 'react';
import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Signup from './components/signup';
import useToken from './components/useToken';
import Sheduler from './components/Patient/sheduler';


function App() {
  const { token, setToken } = useToken();
  const [user, setUser] = useState({ name: "", role:"" , email:""})

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("token");
    console.log("meka run wuna")
    if (loggedInUser) {
      const founduser = JSON.parse(loggedInUser);
      setUser({
        name: founduser.name,
        token: founduser.token,
        role: founduser.role,
        email: founduser.email
      });
    }
  }, [token]);

  const getUser = (data) => {
    setUser({
      name: data.name,
      role: data.role,
      email:data.email
    });
  };

  console.log(user)

  if(!token) {
    return (
    <div >
      {/* <div className=".App">
<h1 > PROJECT CARRIE</h1>
      </div> */}
      
<BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Login  getUser = {getUser} setToken={setToken}/>} />
          <Route path="/signup" element={<Signup setToken={setToken}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    )
  }
  
  return (
    <div >
      {/* <div className='.App-header'>
<h1 > PROJECT CARRIE</h1>
      </div> */}
      <BrowserRouter>
        
            {
              
            user.role === "Doctor" ? (
              
              <Routes>
                <Route path="/dashboard" element={<Dashboard user = {user}/>} /> 
              </Routes>
                 
            ):<div>
              
              <Routes>
                <Route path="/home" element={<Sheduler/>} />  
              </Routes>
              
            </div>
          }
        
      </BrowserRouter>
    </div>
  );
}

export default App;

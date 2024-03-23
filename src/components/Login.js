import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
const host = "http://localhost:5000";



const Login = () => {
  const [credentials, setCredentials] = useState({ password: "", email: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: credentials.password, email: credentials.email }), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      console.log(json);

      if (json.success){
        localStorage.setItem('token', json.authtoken);
        navigate('/');

      }else{
        alert("Please try to login with correct credentials.");
      }
      setCredentials({ password: "", email: "" });


    } catch (error) {
      console.log(error);
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="password" />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios, { Axios } from "axios"
import "./login.css"
var uid;
const Login = () => {
  
  const navigate = useNavigate()
  const [users, setUsers] = useState({
    email: "",
    password: "",
  })
  const handleChange = e => {
    const { name, value } = e.target
    setUsers({
      ...users,
      [name]: value
    })
  }
   function logging(action,createdby){
     axios.post("http://localhost:3001/activitylog/logging",{action,createdby})
   }
  const login = () => {
    const { email, password } = users
    if (email && password) {
      axios.post("http://localhost:3001/login", users)


      // const res = await axios.post('url', data, {
      //   headers: {
      //     'content-type': 'application/json'
      //   }
      // });

        .then(res => {
          //console.log(res.data.users)
          
          uid = res.data.users.uid;
         console.log(uid);
          if (res.data.message){
            uid = res.data.users.uid;
            logging("login",res.data.users.name)
            if(res.data.users.roleid==13){

            
          navigate("/leader",{state:res.data.users})
            }
            else {
              navigate("/associate",{state:res.data.users})
            }
          }
        else {
      alert("failed to login")
    }
  })
}
  
else {
  alert("invalid input")
}
  }
return (<div className='login-container'>
  <h1>LOGIN</h1>
  <div className='input-section'>

    <input type="text" name="email"value={users.email} placeholder="Enter your Email"  onChange={handleChange} /><br /><br />
    <input type="password" name="password" value={users.password} placeholder="Password"  onChange={handleChange} /><br />
<button className='login-button' onClick={login}>Login</button>

  </div>
</div>
)

}

export {uid};
export default Login;


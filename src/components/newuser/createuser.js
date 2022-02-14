import React from 'react'
//import { Link } from "react-router-dom";
import './createuser.css'

import axios from "axios"
import {useState } from "react";

//import { useHistory } from "react-router-dom"
//import { useNavigate} from 'react-router-dom';


const Register = () => {

    //const navigate =  useNavigate()

    const [ user, setUser] = useState({
    id: "",
    name: "",
    roleid:"",
    uid:"",
    email: "",
    password: "",
    addedby: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
   
    const register = () => {
        console.log(user)
        const { id,name,roleid,uid, email, password,addedby  } = user
        if( id && name && roleid && uid && email && password && addedby ){
            axios.post("http://localhost:3001/add/user", user)
            .then( res => {
                if(res)
                    alert(res.data.message)
                    else{
                        alert("failed")
                    }
               // navigate("/add")
            })
        } else {
            alert("invalid input")
        }
        
    }
//function Register() {
    return (
        <div>
           
        {/* <form className="ownerform" > */}
            <table className="otable">
                <tbody>
                <tr>
                    <th> <h1>ADD NEW USER</h1></th>
                    </tr>
                    <tr>
                     <td><input type="text" name ="id" value={user.id} placeholder="ID" onChange={ handleChange }/></td>
                </tr>
                <tr>
                     <td><input type="text" name ="name"  value={user.name} placeholder="Name" onChange={ handleChange }/> </td>
                </tr>  
                <tr>
                    <td> <input type="text" name ="roleid"  value={user.roleid} placeholder="Lead/Associate" onChange={ handleChange }/> </td>
                </tr>  
                <tr>
                     <td><input type="text" name ="uid"  value={user.uid} placeholder="UID" onChange={ handleChange }/> </td>
                </tr>  
                <tr>
                   <td> <input type="email" name ="email"  value={user.email} placeholder="Email Id" onChange={ handleChange }/></td>
                </tr> 
                <tr>
                    <td><input type="password" name ="password"  value={user.password} placeholder="Password" onChange={ handleChange }/></td>
                </tr> 
                <tr>
                   <td><input type="text" name ="addedby"  value={user.addedby} placeholder="Added By" onChange={ handleChange }/></td>
                </tr> 
                <tr>
                    
                   <td> <button className="button" onClick={register} >Add</button></td>
                   
                 </tr>
                 <tr>
                     {/* <button><Link to ="/">Cancel</Link></button> */}
                 </tr>
                 </tbody>
            </table>
        {/* </form> */}
              
    </div>
    )
}

export default Register
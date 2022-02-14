import React from "react";
import axios from 'axios';
import user from './user.png';
import '../dashboard/dashboard.css';
import { uid } from "../login/login";
import "../../components/navbar.css"

export default class Userdata extends React.Component {
  state = {
    user: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/add/list/uid/${uid}`)
      .then(res => {
        const user = res.data;
        console.log(user)
        console.log(user.name)
        this.setState({ user: user });
      })
  }

  render() {
    return (
      <>
        <div id="profilepic">
          <img src={user} alt="ProfilePicture" height="100px" width="100px" />
          <h1 className="hello">Hello! {this.state.user.name}</h1>
          <p  className="detail">{this.state.user.email}</p>
          <p className="detail">{this.state.user.uid}</p>
        </div>
      </>
    )
  }
}

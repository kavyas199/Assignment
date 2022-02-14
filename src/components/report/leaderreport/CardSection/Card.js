import React, { Fragment } from "react";
import "./Card.css";
import Register from "../../../newuser/createuser";
//import {Navigate} from "react-router";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { uid } from "../../../login/login";
import Tabledetails from "../TableSection/Table";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { registerables } from "chart.js";
export default function Card() {
  let navigate = useNavigate();
  const [dataSource1, setDataSource1] = useState([]);
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    user();
  }, []);
  function user() {
    setLoading1(true);
    fetch(`http://localhost:3001/add/list/addedby/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDataSource1(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading1(false);
      });
  }

  function deleteuser(uid) {
    fetch(`http://localhost:3001/add/list/${uid}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        user();
      });
    });
  }

  return (
    <>
    <h2 className="head" > Reports of Associates</h2>
      {dataSource1.map((data) => {
        return (
          <>
            <div class="column">
              <div className="card">
                <div className="card_body"></div>
                <h2 className="card_title">{data.name}</h2>
                <p className="card_email">{data.email}</p>
                <h7 className="card_id">UID: {data.uid}</h7>
                <Link to={`/Table/${data.uid}`}>
                  <button className="card_btn">View Details</button>
                </Link>
                <button
                  onClick={() => deleteuser(data.uid)}
                  className="dele-btn"
                >
                  delete{" "}
                </button>
              </div>
            </div>

            <div></div>
          </>
        );
      })}
    </>
  );
}

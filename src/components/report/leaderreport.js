import React from "react";
import Tabledetails from "./leaderreport/TableSection/Table";
import {BrowserRouter as Router , Route,Routes } from "react-router-dom";
import Card from "./leaderreport/CardSection/Card";
import ViewTask from "./leaderreport/ViewTask/ViewTask";

function LeaderReport() {
  return (
     <>
    <div>
   
      <Routes>
     
     <Route exact path="/Table/:uid" element={<Tabledetails/>}>
     </Route>
     <Route exact path="/ViewTask/:taskid" element={<ViewTask/>}>
     </Route>
     </Routes>
  
    </div>
    </>
  );
}



export default LeaderReport;
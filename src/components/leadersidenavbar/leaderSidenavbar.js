import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import GetCount from "../dashboard/fetchtaskleader";
//import Login from "../login/login";
import LeaderReport from "../report/leaderreport";
import Register from "../newuser/createuser";
import Taskassign from "../taskassign/taskassign";
import Userdata from "../dashboard/userdata";
import '../navbar.css'
import Card from "../report/leaderreport/CardSection/Card";
import Tabledetails from "../report/leaderreport/TableSection/Table";


export default function LeaderSidenavbar() {
    return (
        
            <>
                <div className="nav">
                    <div>
                        <Userdata />
                    </div>
                    <nav>
                        <ul>
                            
                            <li>
                                <Link to="leaddashboard">Dashboard</Link>
                            </li>
                            
                            <li>
                                <Link to="createuser">User Creation</Link>
                            </li>
                            <li>
                                <Link to="assigntask">Assign Task</Link>
                            </li>
                            <li>
                                <Link to="Card">Report</Link>
                            </li>
                    
                            <li>
                                <Link to="/">Logout</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

           

            <div className="display">
                <Routes>

                    <Route path="leaddashboard" element={<GetCount />}>
                    </Route> 
                    <Route path="createuser" element={<Register />}>
                    </Route>
                    <Route path="assigntask" element={<Taskassign />}></Route>
                    <Route path ="Card/*" element={<Card/>}>
                    </Route>
                    {/*  */}
                   
                </Routes>
            </div>
            </>
    );
}



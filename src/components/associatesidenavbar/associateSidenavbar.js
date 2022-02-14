import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import GetCountAssociate from "../dashboard/fetchtaskassocitate";
//import Login from "../login/login";
import AssociateReport from "../report/associatereport/Table";
import Userdata from "../dashboard/userdata"
import '../navbar.css'

export default function Associatesidenavbar() {
    return (
       
            <>
                <div className="nav">
                <div>
                <Userdata/>
            </div>
                    <nav>
                        <ul>
                            
                            <li>
                                <Link to="associatedashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="associatereport">Report</Link>
                            </li>
                            <li>
                                <Link to="/">Logout</Link>
                            </li>
                            {/* <li>
              <Link to="/viewtask">View task</Link>
            </li> */}
                        </ul>
                    </nav>
                </div>
    
            <div className="display">
            <Routes>
                <Route path="associatedashboard" element={<GetCountAssociate/>}>
                </Route>
                <Route path="associatereport" element={<AssociateReport/>}>
                </Route>
            {/* <Route path="/viewtask" element={<Taskview/>}>
            </Route> */}
                {/* <Route path="/" element={<Login/>}>
                </Route> */}
        </Routes>
        </div>
     </>
    );
}



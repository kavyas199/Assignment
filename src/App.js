// import React from "react";
// import Associatesidenavbar from "./components/associatesidenavbar/associateSidenavbar";
// import LeaderSidenavbar from "./components/leadersidenavbar/leaderSidenavbar";


// export default function App() {
//   return (
//     <div>
//       <div><h1>ManageUS</h1></div>
//       <LeaderSidenavbar/>
//        <Associatesidenavbar/>
//     </div>
    
//   );
// }
import ViewTaskUI from "./components/taskassign/ViewTaskUI";
import Associatesidenavbar from "./components/associatesidenavbar/associateSidenavbar";
// import LeaderSidenavbar from "./components/leadersidenavbar/leaderSidenavbar";



// <div>

//   <LeaderSidenavbar/>
//   {/* <Associatesidenavbar/> */}
// </div>



import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Link
} from "react-router-dom";
//import Login from "./components/login/login"
//import Teamlead from "./components/teamlead";
import GetCount from "./components/dashboard/fetchtaskleader";
import Login from "./components/login/login";
import LeaderReport from "./components/report/leaderreport";
//import CreateUser from "../newuser/createuser";
import Taskassign from "./components/taskassign/taskassign";
//import Userdata from "../dashboard/userdata";
import Tabledetails from "./components/report/leaderreport/TableSection/Table";
import Register from "./components/newuser/createuser";
import "../src/components/navbar.css";
import Card from "./components/report/leaderreport/CardSection/Card";
import LeaderSidenavbar from "./components/leadersidenavbar/leaderSidenavbar";
export default function App() {
  return (
    <div> 
        <Router>
           

            
                <Routes>

                    
                    <Route path="/" element={<Login />}>
                    </Route>
                    

                    <Route path="/leader/*" element={<LeaderSidenavbar/>}>
                    </Route>
                    
     
                    <Route path="/associate/*" element={<Associatesidenavbar />}>
              
                    </Route>

                    {/* <Route path="/leader/leaddashboard" element={<GetCount />}>
                    </Route> 
                    <Route path="/leader/createuser" element={<Register />}>
                    </Route>
                    <Route path="/leader/assigntask" element={<Taskassign />}></Route>
                    <Route path ="/leader/Card/*" element={<Card/>}>
                    </Route> */}
                    <Route path ="/Table/:uid" element={<Tabledetails/>}>
                    </Route>
                    <Route path ="/ViewTaskUI/:taskid" element={<ViewTaskUI/>}>
                    </Route>
                  
                </Routes>
            
        </Router>
        </div>
  );
}






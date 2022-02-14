import React from "react";
import axios from "axios";
import './dashboard.css';
import Dashboardsearch from "./dashboardsearchlead";
import DoughnutChartlead from "./chart/DoughnutChartlead";
import { uid } from "../login/login"
import MixedChart from "./chart/doughnutchart";



console.log(uid);

export default function GetCount() {

    const baseURL = `http://localhost:3001/leadertasks/totalcount/${uid}`;
    const baseURL2 = `http://localhost:3001/leadertasks/inprogresscount/${uid}`;
    const baseURL3 = `http://localhost:3001/leadertasks/newcount/${uid}`;
    const baseURL4 = `http://localhost:3001/leadertasks/completedcount/${uid}`;

    const [tcount, setTcount] = React.useState(null);
    const [ipcount, setIpcount] = React.useState(null);
    const [ncount, setNcount] = React.useState(null);
    const [ccount, setCcount] = React.useState(null);



    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setTcount(response.data);
            console.log(response.data)
        })
            .catch(error => console.log(error))
    }, []);

    React.useEffect(() => {
        axios.get(baseURL2).then((response) => {
            setIpcount(response.data);
            console.log(response.data)
        })
            .catch(error => console.log(error))
    }, []);

    React.useEffect(() => {
        axios.get(baseURL3).then((response) => {
            setNcount(response.data);
            console.log(response.data)
        })
            .catch(error => console.log(error))
    }, []);

    React.useEffect(() => {
        axios.get(baseURL4).then((response) => {
            setCcount(response.data);
            console.log(response.data)
        })
            .catch(error => console.log(error))
    }, []);


    if (!tcount) return "assign task";
    if (!ncount) return "assign new task";
    if (!ipcount) return "check for new task";
    if (!ccount) return "compelte it soon";

    console.log("hi")
    return (

        <>
            <div className="leadertaskview">
                <p id="tt">Total task <br /> {tcount.tcount}</p>
                <p id="nt"> New task<br />{ncount.ncount}</p>
                <p id="ipt"> Inprogress task<br />{ipcount.ipcount}</p>
                <p id="ct"> completed task<br /> {ccount.ccount}</p>
            </div>
            <div className="chart">
                <DoughnutChartlead />
                
            </div>
            <div className="search">
                <Dashboardsearch />
            </div>

        </>
    )
}
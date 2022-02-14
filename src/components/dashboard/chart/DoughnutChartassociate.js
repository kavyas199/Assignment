import React, {useEffect} from "react";
import Chart  from "chart.js/auto";
import axios from "axios";
import {uid} from "../../login/login";

function DoughnutAssociateChart() {
    const [count, setCount] = React.useState([]);
    useEffect(() => {
        let requesteddata=false;
        axios.get(`http://localhost:3001/associatetasks/totalcount/${uid}`)
        .then(res => {
            console.log(res);
            if(!requesteddata)
            {setCount(res.data.tcount)
            }
            console.log(count);
        
        

        
    
    const ctx= document.getElementById("doughnutchart");
        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["New", "Inprogress", "Compeleted", "Total"], 
                datasets: [
                    {
                        label: "chart",
                        data: [2, 5, 2, res.data.tcount],
                        backgroundColor: [
                            "Yellow",
                            "Red",
                            "Blue",
                            "Green"
                        ],
                        borderColor: ["Palegreen"],
                        borderWidth: 1
                    }
                ]
            }

         })
         ;})
        });
    return (
        <div className="MixedChart">
           // 
            <canvas  id="doughnutchart" width="400" height="400" />
           
            
        </div>
    );
}

export default DoughnutAssociateChart;



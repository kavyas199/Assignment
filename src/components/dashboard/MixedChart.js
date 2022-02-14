import React, {useEffect} from "react";
import Chart  from "chart.js/auto";
import "./dashboard.css";

function MixedChart() {
    useEffect(() => {
        const ctx= document.getElementById("bar");
        new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["New", "Inprogress", "Compeleted", "Total"], 
                datasets: [
                    {
                        label: "chart",
                        data: [5, 5, 10, 20],
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
        });
    });
    return (
        <div className="MixedChart">
            <canvas id="doughnutchart" width="400" height="400" />
        </div>
    );
}

export default MixedChart;
import React,{Component} from 'react';
import './taskUI.css';
import axios from 'axios';
import { useParams } from "react-router";

//import ReactDOM from 'react-dom';


class ViewTaskUI extends Component{
    constructor(props){
        super(props);
        this.state={
            status:"",
            details:[]
        }
      
       this.componentDidMount= this.componentDidMount.bind(this);
       this.statusChange= this.statusChange.bind(this);
    }
    statusChange(event){
        this.setState({status:event.target.value });
        var stat=event.target.value;
        var data1={
            status:stat
        }
        console.log(stat)
        axios.patch(`http://localhost:3001/taskcreation/`)
    }
   
    componentDidMount(){
            axios({
                method: 'GET',
                url: `http://localhost:3001/taskcreation/`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                params: {
                    taskid :"T47485477"
                }
                })
                // axios.get('https://httpbin.org/get', { params: {taskid :"T47485477"} })
                .then(response=>{
                    console.log(response);
                    this.setState({details:response.data})
            } )
    }  
    render(){
        const {details} = this.state;
        return(
            <div className="div8">
                
                <div className="div4">Task ID</div>
                <div className="div5">{details.taskid}</div>
                <div className="div4">Task Name</div>
                <div className="div5">{details.taskname}</div>
                <div className="div4">Task Description</div>
                <div className="div6">{details.taskdescription}</div>
                <div className="div7">
                    <button className="submit1">View Documnets</button>
                    <select className="sel" name="status"  onChange={this.statusChange}>
                        <option hidden disabled selected value>select status </option>
                        <option value="New" >New</option>
                        <option value="In Progress" >In Progress</option>
                        <option value="Completed" >Completed</option>
                    </select>

                    
                </div>
            </div>
            )
    }
}
    export default  ViewTaskUI;
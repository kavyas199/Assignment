import React,{Component} from 'react';
import './taskUI.css';
import axios from 'axios';
import { v4 as uuid }from 'uuid';
import {uid} from "../login/login"
//import ReactDOM from 'react-dom';

class TaskUI extends Component{
    constructor(props){
        super(props);
        this.state={
            taskname:"",
            description:"",
            file:"",
            associate:[],
            taskid:uuid(),
            status:"New"
        }
        console.log(this.state.taskid);
        this.inputChange= this.inputChange.bind(this);
        this.submit= this.submit.bind(this);
        this.componentDidMount= this.componentDidMount.bind(this);
        this.onFileChange= this.onFileChange.bind(this);
    }

    inputChange(event){
        this.setState({ [event.target.name]:event.target.value });
        
    }
    onFileChange = event => {
        this.setState({ file: event.target.files[0] });
        console.log(event.target.files[0]);
    }
    
    submit(event){
        var data={
            taskname:this.state.taskname,
            description:this.state.description,
            file:this.state.file1,
            taskid:this.state.taskid,
            associate:this.state.sel,
            status:"new",

        }
           //console.log(data);
           //console.log(this.state.associate);
           const { taskname,description,taskid,associate} = this.state

           if( taskname && description && taskid && associate ){
            axios.post("http://localhost:3001/taskcreation/create",{data})
           
            console.log(data);
             alert("Submitted Successfully")
            }
            else{
                alert("failed");
            }
            
           
        //})
    }
    componentDidMount(){
        axios.get(`http://localhost:3001/add/list/addedby/${uid}`).then(response=>{
            //console.log(response);
            this.setState({associate:response.data})
        })
    } 

    render(){
        const {associate} = this.state;
        return(
        <div className="div8">
            <h2 className="head">Assign New Task</h2>
            <div className="div2">
                <label className="name" htmlFor="task">Task Name</label><br />               
                <input type="text"   className="taskname" name="taskname" placeholder="Enter Title" onChange={this.inputChange} ></input><br />
                <label  className="name" htmlFor="task">Task Description</label><br />
                <textarea className="description" name="description" onChange={this.inputChange}></textarea><br /><br /><br />
                <input type="file" className="file" name="file1" id="file" onChange={this.onFileChange}></input>
                <select className="sel" name="sel" onChange={this.inputChange}>
                        <option selected="selected" hidden disabled selected value>Select Associate</option>
                        {associate.map((item,index) => {
                          return <option value={item.uid} key={index}>{item.name} </option>
                          
                        })}
                </select>
                <button type="submit" className="submit" name="submit" onClick={this.submit}>Create Task</button>
            </div>
        </div>
    );
    }
}
export default  TaskUI;
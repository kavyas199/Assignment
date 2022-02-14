import React from 'react';
import "antd/dist/antd.css";
//import "./App.css";
import { Button, Input, Table } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from 'axios';
import {uid} from "../login/login"
function Dashboardsearchassociate() {
  const [dataSource, setDataSource] = useState([{taskid:"",taskdescription:"",leader:""}])
   
  React.useEffect( () => {
    axios.get(`http://localhost:3001/atasks/userdetails/${uid}`).then( (response) => {
      setDataSource(response.data);
        console.log(response.data)
    })
    .catch(error => console.log(error))
}, []);

  // taskid: "333",
  // taskdescription: "module 3",
  // associateid: "u222"
  const columns = [
    {
      title: "Task_id",
      dataIndex: "taskid",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.taskid.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: " Task_Description",
      dataIndex: "taskdescription",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.taskdescription.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: " Leader_uid",
      dataIndex: "leader",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.leader.toLowerCase().includes(value.toLowerCase());
      },
    },
  ];
  return (
    <div className="App">
      <header className="App-header">
        <Table
          style={{ display: "flex", flex: 1, margin: 10 }}
          columns={columns}
          dataSource={dataSource}
        ></Table>
      </header>
    </div>
  );
}

export default  Dashboardsearchassociate;
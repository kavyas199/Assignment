import React from "react";
import "antd/dist/antd.css";
import "./Table.css";
import { Table, Input, Button,Modal } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import { uid } from "../../login/login";


export default function AssociateReport() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(3);
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStatus, setEditingStatus] = useState(null);
  useEffect(() => {
    getUser();
  }, []);

  // getting associate TASK
  function getUser() {
   
    setLoading(true);
    fetch(`http://localhost:3001/tasks/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function editStatus(stat) {
    setIsEditing(true);
    setEditingStatus({ ...stat, taskid: stat.taskid });
  }
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStatus(null);
  };

  const update = () => {
    setDataSource((edit) => {
      return edit.map((value) => {
        if (value.taskid === editingStatus.taskid) {
          return editingStatus;
        } else {
          return value;
        }
      });
    });
    resetEditing();
  };

  const columns = [
    {
      key: "1",
      title: "Task Name",
      dataIndex: "taskname",
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
              placeholder='Type text here'
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
              }}></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type='primary'>
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type='danger'>
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, search) => {
        return search.taskname.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "2",
      title: "Task ID",
      dataIndex: "taskid",
    },
    {
      key: "3",
      title: "Task Description",
      dataIndex: "taskdescription",
    },
    {
      key: "4",
      title: "Approval",
      dataIndex: "approval",
      filters: [
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Not Approved",
          value: "Not Approved",
        },
      ],
    
      onFilter: (value, approve) => approve.approval.toLowerCase().indexOf(value.toLowerCase()) === 0,
    },
    {
      key: "5",
      title: "view task",

      render: (action) => {
        return (
          <>
           <Link to={`/ViewTaskUI/${action.taskid}`}>
              <button className='table-btn'>View</button>
            </Link>
          
          </>
        );
      },
    },
   
    
    {
      key: "6",
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "New",
          value: "New",
        },
        {
          text: "Completed",
          value: "Completed",
        },
        {
          text: "In Progress",
          value: "In Progress",
        },
      ],
    
      onFilter: (value, progress) => progress.status.toLowerCase().indexOf(value.toLowerCase()) === 0,
    },

  
  
    {
      key: "7",
      title: "Edit Status",
      render: (stat) => {
        return (
          <>

            <EditOutlined onClick={() => editStatus(stat)} />
          </>
        );
      },
      
    },
  ];

  return (
    <div className='table'>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}></Table>
      <Modal
        title='Edit Status'
        visible={isEditing}
        okText='Save'
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          update(editingStatus);
          console.log(editingStatus);

          fetch(`http://localhost:3001/tasks/taskid/${editingStatus.taskid}`, {
            method: "PATCH",
            body: JSON.stringify({
              status:editingStatus.status
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }).then((result) => {
            result.json().then((resp) => {
              console.warn(resp);
              getUser();
            });
          });
        }}>
        <Input
          value={editingStatus?.status}
          onChange={(e) => {
            setEditingStatus((pre) => {
              return { ...pre, status: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
}
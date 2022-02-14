import React from "react";
import "./Table.css";
import "antd/dist/antd.css";
import { Table, Input, Button, Modal } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { EditOutlined, DeleteOutlined ,SearchOutlined} from "@ant-design/icons";
import Card from "../CardSection/Card";
export default function Tabledetails() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(3);
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  useEffect(() => {
    getUser();
  }, []);
  let { uid } = useParams();
//alert(uid)
  //getting associate task w r t uid
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
        
        console.log(data);
        setDataSource(data);
        
        
  
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //deleting task w r t taskid
  function deleteTask(taskid) {
    fetch(`http://localhost:3001/tasks/${taskid}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getUser();
      });
    });
  }
  //update task w r t taskid

  function editTask(action) {
    setIsEditing(true);
    setEditingTask({ ...action, taskid: action.taskid });
  }
 
//  id=setDataSource((ID)=>{   
//   return ID.map((Id)=>{    
//      return Id.taskid   }) })


  const resetEditing = () => {
    setIsEditing(false);
    setEditingTask(null);
  };

 
  // fn for updating

const update=()=>{
  setDataSource((edit) => {
    return edit.map((task) => {
      if (task.taskid === editingTask.taskid) {
        return editingTask;
      } else {
        return task;
      }
    });
  });
  resetEditing();
}
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
      onFilter: (value, nametask) => {
        return nametask.taskname.toLowerCase().includes(value.toLowerCase());
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
      onFilter: (value, stat) => stat.status.toLowerCase().indexOf(value.toLowerCase()) === 0,
    },
   
    {
      key: "5",
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
    // {
    //   key: "6",
    //   title: "view task",

    //   render: (Taskid) => {
    //     return (
    //       <>
    //         {/* <Link to={`/ViewTaskUI/${Taskid.taskid}`}>
    //           <button className='table-btn'>View</button>
    //         </Link> */}
    //       </>
    //     );
    //   },
    // },
    {
      key: "6",
      title: "Actions",
      render: (action) => {
        return (
          <>
           
            <DeleteOutlined onClick={() => deleteTask(action.taskid)} />
            <EditOutlined onClick={() => editTask(action)} />
          </>
        );
      },
    },
  ];

  return (
    
    <div className='table'>
      <Link to='/leader/*'>

<button className='back-btn'>Back</button>

</Link>
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
     
        title='Edit Task'
        visible={isEditing}
        okText='Save'
        onCancel={() => {
          resetEditing();
        }}
       
        onOk={() => {
         update(editingTask);
         console.log(editingTask)
        
         fetch(`http://localhost:3001/tasks/taskid/${editingTask.taskid}`, {
          method: "PATCH",
          body: JSON.stringify({
            taskname: editingTask.taskname,
            taskdescription:editingTask.taskdescription,
            approval:editingTask.approval
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then((result) => {
          result.json().then((resp) => {
            console.log(resp);
            getUser();
          });
        });
        }}
      
        >
        <p>Task Name :</p>
        <Input
          value={editingTask?.taskname}
          onChange={(e) => {
            setEditingTask((edit) => {
              return { ...edit, taskname: e.target.value };
            });
          }}
        />
        <p>Task Description :</p>
        <Input
          value={editingTask?.taskdescription}
          onChange={(e) => {
            setEditingTask((edit) => {
              return { ...edit, taskdescription: e.target.value };
            });
          }}
        />
        <p>Approval :</p>
        <Input
          value={editingTask?.approval}
          onChange={(e) => {
            setEditingTask((edit) => {
              return { ...edit, approval: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
}

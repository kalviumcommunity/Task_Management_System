import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Main.css';

const Main = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([{task:"babu"},{task:"shiva"},{task:"pillalu"}]);

  const addTask = () => {
    if (task) {
      axios
        .post('http://localhost:3001/todos/tasks', { task })
        .then((result) => {
          setTasks([...tasks, result.data]);
          setTask('');
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(()=>{
    axios
    .get('http://localhost:3001/todos/todo')
    .then((res) => {
      console.log(res.data.todos);
      setTodos(res.data.todos);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
function drag(e){
  e.dataTransfer.setData("text", e.target.id);
}
function allowDrop(ev) {
  ev.preventDefault();
}
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

  return (
    <div className="task-management-system">
      <nav className="home-navbar">
        <div className="home-profile">
          <img
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
            alt="Profile"
          />
        </div>
        <div className="home-center">
          <h1>Task Management System</h1>
        </div>
        <div>
          <button className="home-full-rounded" onClick={async() => {
            await axios.post("http://localhost:3001/auth/logout")
            console.log(document.cookie)
            document.cookie=""
            navigate('/')}}>
            <span>Logout</span>
            <div className="home-border home-full-rounded"></div>
          </button>
        </div>
      </nav>
      <div className="board">
        <div className="column pending"   onDrop={(e)=>{drop(e)}} onDragOver={(e)=>{allowDrop(e)}}>
          <h2>Pending</h2>
          <div className="tasks" >
            {todos.map((t, index) => (
              <div key={index} id={index} draggable={true} className="task" onDragStart={drag}>
                {index + 1}. {t.task}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="New Task"
            className="input_box"
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <div className="column progress" onDrop={(e)=>{drop(e)}} onDragOver={(e)=>{allowDrop(e)}}>
          <h2>Progress</h2>
          {/* Tasks in progress can be shown here */}
        </div>
        <div className="column completed"  onDrop={(e)=>{drop(e)}} onDragOver={(e)=>{allowDrop(e)}}>
          <h2>Completed</h2>
          {/* Completed tasks can be shown here */}
        </div>
      </div>
    </div>
  );
};

export default Main;

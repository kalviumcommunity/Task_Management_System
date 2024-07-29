import React, { useState, useEffect } from 'react';
import './Main.css';

const Main = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

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
              <button className="home-full-rounded" onClick={() => navigate('/')}>
                <span>Logout</span>
                <div className="home-border home-full-rounded"></div>
              </button>
            </div>
          </nav>
          <div className="board">
            <div className="column pending">
              <h2>Pending</h2>
              <div className="tasks">
                {tasks.map((t, index) => (
                  <div key={index} className="task">
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
            <div className="column progress">
              <h2>Progress</h2>
              {/* Tasks in progress can be shown here */}
            </div>
            <div className="column completed">
              <h2>Completed</h2>
              {/* Completed tasks can be shown here */}
            </div>
          </div>
        </div>
      );
    };
    
    export default Main;
    
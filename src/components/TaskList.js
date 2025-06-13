// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import { getAllTasks, createTask, deleteTask } from '../services/TaskService';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const handleAddTask = async () => {
  const trimmed = title.trim();
  if (!trimmed || trimmed.toLowerCase() === "enter task title") return;

  try {
    console.log("Sending task:", trimmed);
    await createTask({ title: trimmed, description: '', completed: false });
    console.log("Task added successfully.");
    setTitle('');
    loadTasks();
  } catch (error) {
    console.error("Error adding task:", error);
  }
};


  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Enter task title"
/>

      <button onClick={handleAddTask} style={{ marginLeft: '10px' }}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => handleDelete(task.id)} style={{ marginLeft: '10px' }}>
              ✅
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

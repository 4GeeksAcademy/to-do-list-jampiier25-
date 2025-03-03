import React, { useState } from 'react';

const TodoList = () => {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  //función para agregar tarea
  const addTask = (task) => {
    setTasks([...tasks, { text: task, completed: false }]);
    setInput('');
  };

  //función para eliminar tarea
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  //función para elcheckbox
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  //función para saber que se pulso enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && input.trim()) {
      addTask(input.trim());
    }
  };

  return (
    <div className="container">
      <h1>📝To Do List</h1>

      <input
        type="text"
        placeholder="Add some Tasks!"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="input-field"
      />

      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="message">There are no tasks to complete</li>
        ) : (
          tasks.map((task, index) => (
            <li
              key={index}
              className={`task ${task.completed ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
              />
              <span>{task.text}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
      <div className="task-counter">
        <span>{tasks.length === 0 ? '' : `You have ${tasks.length} item`}</span>
      </div>
    </div>
  );
};

export default TodoList;
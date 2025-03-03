import React, { useState } from 'react';

const TodoList = () => {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  //funcion para añadir
  const addTask = (task) => {
    setTasks([...tasks, task]);
    setInput('');
  };

  //funcion para eliminar  
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  //funcion para saber que se pulso enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && input.trim()) {
      addTask(input.trim());
    }
  };

  return (
    <div className='container'>
      <h1>To Do List</h1>

      <input
        type="text"
        placeholder="Add Some tasks"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      /> 

      <ul>
        {tasks.length === 0 ? (
          <li className="message">There are no tasks to complete</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index} className="task">
              {task}     
            <input
                  type="checkbox"
            />
              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
                
              >❌ 

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
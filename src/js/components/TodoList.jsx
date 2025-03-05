import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  //creamos dos estados mas uno para almacenar la tarea que se esta editando y el otro para almacenar el texto editado
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Función para agregar tarea
  const addTask = (task) => {
    const newTasks = [...tasks, { text: task, completed: false }];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks)); // Guardar tareas en localStorage
    setInput('');
  };

  // Función para eliminar tarea
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Guardar tareas en localStorage
  };

  // Función para cambiar el estado de completado de una tarea
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Guardar tareas en localStorage
  };

  // Función para comenzar la edición de una tarea
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  // Función para manejar la tecla Enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && input.trim()) {
      addTask(input.trim());
    }
  };

  // Función para guardar la tarea editada
  const saveEdit = () => {
    if (editingText.trim()) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex].text = editingText.trim();
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Guardar tareas en localStorage
      setEditingIndex(null);
      setEditingText('');
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
              {editingIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                  />
                </div>
              ) : (
                <span>{task.text}</span>
              )}
              <button
                className="edit-btn"
                onClick={() => startEditing(index)}
              >
                ✏️
              </button>
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
        <span>{tasks.length === 0 ? '' : `You have ${tasks.length} item(s)`}</span>
      </div>
    </div>
  );
};

export default TodoList;
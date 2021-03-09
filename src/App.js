import React, { useState, useEffect, useRef } from 'react';
import uniqid from 'uniqid';

import Todos from './Todos/Todos';

import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

const App = () => {

  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos); 

  },[]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  const handleAddTodo = () => {
    const name = inputRef.current.value
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uniqid(), name: name, completed: false }]
    });
    inputRef.current.value = null;
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed;
    setTodos(newTodos);
    console.log(todo);
  }

  const clearCompleted = () => {
    const newTodos = todos.filter(todo => todo.completed === false);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <input ref={inputRef} />
      <button onClick={handleAddTodo}>Add todo</button>
      <button onClick={clearCompleted}>Clear completed</button>
      <Todos toggleTodo={toggleTodo} todos={todos} />
      <span>Todos completed {todos.filter(todo => todo.completed === true).length}</span>
    </div>
  );
}

export default App;

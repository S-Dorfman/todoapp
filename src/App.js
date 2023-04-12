
import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';

import './App.css';

function App() {
  const[todos, setTodos] = useState([{text: "test", id: 1, completed: true}]);

  //useEffect hook access local storage
useEffect(() => {
  //get items from local storage
  const savedTodos = localStorage.getItem('todos');
  console.log(savedTodos);

  if(savedTodos && savedTodos !== 'undefined' && savedTodos 
  !== null){
    //set the savedTodo to the state
    setTodos(JSON.parse(savedTodos));
  }
}, []);

  const addTodo = (e) => {
    //  checks if input is empty 
    if(e.target.value === "" ) return;
    //  create a todo object
    const newTodo = {
      text: e.target.value,   //take text the user input
      id: Date.now(),         //give id
      completed: false        //default set to false
    } 
    localStorage.setItem('todos', JSON.stringify([newTodo, ...todos]) )
    //add new todo/object to array
    setTodos([...todos, newTodo])
    //reset input
    e.target.value="";    
  }

  //update todo checklist, 
  const completeTodo = (id, e) => {
    //create a new copy of todos array 
    const todosCopy = [...todos];
    //find the todo that matches the id 
    const indexOfTodo = todosCopy.findIndex(i => i.id === id);
    //update the current completed value to the opposite value 
    todosCopy[indexOfTodo].completed = !todosCopy[indexOfTodo].completed 
    // set the new data into local storage
    localStorage.setItem('todos', JSON.stringify([...todosCopy]))
    setTodos([...todosCopy]); 
  }

  //edit todo text
  const editTodoText = (id, e) => {
    const todosCopy = [...todos];
    const indexOfTodo = todosCopy.findIndex(i => i.id === id);
    todosCopy[indexOfTodo].text = e.target.value;
    localStorage.setItem('todos', JSON.stringify([...todosCopy]));
    setTodos( [...todosCopy]); 
    e.target.value = "";
  }
//new function to delete todo item, make copy, find index and splice
  const deleteTodo = (id) => {
    console.log(id);
    const todosCopy = [...todos]
    const indexofTodo = todosCopy.findIndex(i => i.id === id);
    todosCopy.splice(indexofTodo, 1);
    localStorage.setItem('todos', JSON.stringify([...todosCopy]));
    setTodos([...todosCopy] )
  }


  return (
    <div className="App">
      <h1>ToDo App</h1>

      <TodoList todos={todos} 
      addTodo={addTodo} 
      completeTodo={completeTodo} 
      editTodoText={editTodoText} 
      deleteTodo={deleteTodo}
      /> 
    </div>
  );
}

export default App;

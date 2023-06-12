import React, { useState, useEffect } from 'react';
import Todo  from './components/todo';

function App() {
const [title, setTitle] = useState(null);
const [comment, setComment] = useState(null);
const [showTodos, setShowTodos] = useState(null);
const [todoList, setTodoList] = useState(null);
const [changeMade, setChangeMade] = useState(false);

const url = "http://localhost:4000/todo/";
    
    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => { 
          setTodoList(data);
        })
        // console.log(changeMade);
        // console.log(todoList);
    }, [changeMade])


function handleSubmit(e) {
  e.preventDefault();

  let sendData = {title, comment};
  // console.log(JSON.stringify("testData"));
  fetch ("http://localhost:4000/todo/", {
    method:'POST', 
    body: JSON.stringify(sendData), 
    headers:{'Content-Type': 'application/json; charset=UTF-8'}})
    .then(response => response.json())
    .then(data => {
      // console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
    }

    const handleClickShow = event => {
      // console.log(todoList);
      event.preventDefault();
      setShowTodos(true);
      setChangeMade(!changeMade);
    }

    const handleClickHide = event => {
      event.preventDefault();
      setShowTodos(false);
      setChangeMade(!changeMade);
    }

    // const handleChange = () => {
    //   // fetch(url)
    //   //   .then(response => response.json())
    //   //   .then(data => { 
    //   //     setTodoList(data);
    //   //   })
    //   setChangeMade(!changeMade);
    // }

  return (
    <div>{!showTodos && (
      <div>
        <button onClick = {handleClickShow}>show Todo List</button>
        <form className="App" onSubmit={handleSubmit}>
          <label>Title: 
          <input onChange = {e => setTitle(e.target.value)}></input>
          </label>
          <label>Comment: 
          <input onChange = {e => setComment(e.target.value)}></input>
          </label>
          <button>submit</button>
        </form>
      </div>
    )}
    {showTodos && todoList && (
      <div>
        <button onClick = {handleClickHide}>hide Todo List</button>
        <table>
          {todoList.map((todo, index) => (
            <Todo
            key={index}
            number={index}
            todo={todo}
            url={url}
            // change={handleChange}
            />
          ))}
        </table>
      </div>
    )}
    </div>
  );

}

export default App;

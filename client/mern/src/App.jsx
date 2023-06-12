import { useState } from 'react'
// import Todo  from './components/todo';
// import './App.css'

function App() {
  const catKey = `live_9hHoRgxnuzyI8OwZQN1DfcPacnqYhMr1A9YZ6RNrTFj1Fc18uUdqFcOGSpr2nBX4`;
  const dogKey = `live_0a6G4hjU8SkRWu0ZNqDsxTm9FN2fZojDg2U4Uwc03Pw6AMTSBodVKrVwguTvTv78`;
  const catUrl = `https://api.thecatapi.com/v1/images/search?api_key=${catKey}`
  const dogUrl = `https://api.thedogapi.com/v1/images/search?api_key=${dogKey}`
  const serverUrl = "http://localhost:4000/todo/";

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => { 
      setTodoList(data);
    })
    // console.log(changeMade);
    // console.log(todoList);
}, [changeMade])

  return (
    <>
      <div>
        Test
      </div>
      
    </>
  )
}

export default App

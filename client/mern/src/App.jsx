import './App.css'
import { useState, useEffect } from 'react'


// import Todo  from './components/todo';
// import './App.css'


function App() {
  const catKey = `live_9hHoRgxnuzyI8OwZQN1DfcPacnqYhMr1A9YZ6RNrTFj1Fc18uUdqFcOGSpr2nBX4`;
  const dogKey = `live_0a6G4hjU8SkRWu0ZNqDsxTm9FN2fZojDg2U4Uwc03Pw6AMTSBodVKrVwguTvTv78`;
  const catUrl = `https://api.thecatapi.com/v1/images/search?api_key=${catKey}&has_breeds=1`
  const dogUrl = `https://api.thedogapi.com/v1/images/search?api_key=${dogKey}&has_breeds=1`
  const serverUrl = "http://localhost:4000/todo/";

  const [catImage, setCatImage] = useState(null);
  const [dogImage, setDogImage] = useState(null);

  useEffect(() => {
    fetch(catUrl)
      .then(response => response.json())
      .then(data => {
        setCatImage(data);
        // console.log(data)
        // console.log(data[0].breeds);
      })
    fetch(dogUrl)
      .then(response => response.json())
      .then(data => {
        setDogImage(data);
      })
    // console.log(changeMade);

  }, [])


  // console.log(catImage[0].breed);

  return (
    <>
      {catImage && dogImage &&
        <div>
          
          <img src={catImage[0].url} ></img><br />
          <label>put to favorite</label>
          <input type="checkbox"></input> <br />
          <label>vote: </label>
          <input type="text" placeholder='from 1-10'></input><br/>

          
          <img src={dogImage[0].url} ></img><br/>
          <label>put to favorite</label>
          <input type="checkbox"></input> <br />
          <label>vote: </label><br/>
          <input type="text" placeholder='from 1-10'></input>
        </div>
      }
      <button type="button" > show Favorite</button>


    </>
  )
}

export default App

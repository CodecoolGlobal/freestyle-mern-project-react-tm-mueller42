import './App.css'
import { useState, useEffect } from 'react'
import Showrandomanimals from "./components/showrandomanimals"
import Favourites from './components/Favourites';
import img from '../src/images/cat.png';

// import Todo  from './components/todo';
// import './App.css'

function App() {
  const catKey = `live_9hHoRgxnuzyI8OwZQN1DfcPacnqYhMr1A9YZ6RNrTFj1Fc18uUdqFcOGSpr2nBX4`;
  const dogKey = `live_0a6G4hjU8SkRWu0ZNqDsxTm9FN2fZojDg2U4Uwc03Pw6AMTSBodVKrVwguTvTv78`;
  const catUrl = `https://api.thecatapi.com/v1/images/search?api_key=${catKey}&has_breeds=1`
  const dogUrl = `https://api.thedogapi.com/v1/images/search?api_key=${dogKey}&has_breeds=1`
  const serverUrl = "http://localhost:4000/animal/";

  const [catImage, setCatImage] = useState(null);
  const [dogImage, setDogImage] = useState(null);
  const [currentCatData, setCurrentCatData] = useState(null);
  const [currentDogData, setCurrentDogData] = useState(null);
  const [showFavourites, setShowFavourites] = useState(false);
  const [showImage, setShowImage] = useState(false)

  const fetchAnimals = (catUrl, dogUrl) => {
    fetch(catUrl)
      .then(response => response.json())
      .then(data => {
        setCatImage(data);
      })
    fetch(dogUrl)
      .then(response => response.json())
      .then(data => {
        setDogImage(data);
      })
  }

  useEffect(() => {
    fetchAnimals(catUrl, dogUrl);
  }, [])

  const handleClickShowFavourites = (e) => {
    e.preventDefault();
    setShowFavourites(true);
  }

  const handleshowFavourites = () => {
    setShowFavourites(true);
  }

  const handleLoadNext = () => {
    fetchAnimals(catUrl, dogUrl);
  }



  return (
    <>
      <div id="intro">
        {
          setTimeout(() => console.log("time"), 5000) && showImage && <img src="../src/images/cat.png"></img>
        }
        {
          setTimeout(() => console.log("time"), 15000) && <img src="../src/images/dog.png"></img>
        }

      </div>

      {catImage && dogImage && !showFavourites &&

        <div>


          <Showrandomanimals
            cat={catImage[0]}
            dog={dogImage[0]}
            showFavourites={handleshowFavourites}
            loadNext={handleLoadNext}
            serverUrl={serverUrl}
          />
        </div>
      }
      {showFavourites && <Favourites
        backClick={setShowFavourites} />
      }
    </>
  )
}

export default App

import { useEffect, useState } from "react";
import "./App.css";
import Favourites from "./components/Favourites";
import Header from "./components/Header";
import Showrandomanimals from "./components/showrandomanimals";

// import Todo  from './components/todo';

const fetchAnimals = (catUrl, dogUrl, setCatImage, setDogImage) => {
	fetch(catUrl)
		.then((response) => response.json())
		.then((data) => {
			setCatImage(data);
		});
	fetch(dogUrl)
		.then((response) => response.json())
		.then((data) => {
			setDogImage(data);
		});
};

function App() {
	//make constant file and export the whole object
	const catKey = `live_9hHoRgxnuzyI8OwZQN1DfcPacnqYhMr1A9YZ6RNrTFj1Fc18uUdqFcOGSpr2nBX4`;
	const dogKey = `live_0a6G4hjU8SkRWu0ZNqDsxTm9FN2fZojDg2U4Uwc03Pw6AMTSBodVKrVwguTvTv78`;
	const catUrl = `https://api.thecatapi.com/v1/images/search?api_key=${catKey}&has_breeds=1`;
	const dogUrl = `https://api.thedogapi.com/v1/images/search?api_key=${dogKey}&has_breeds=1`;
	const serverUrl = "http://localhost:4000/animal/";
	const votesUrl = "http://localhost:4000/votes/";

	const [catImage, setCatImage] = useState(null);
	const [dogImage, setDogImage] = useState(null);
	const [showFavourites, setShowFavourites] = useState(false);
	const [showImage, setShowImage] = useState(false);

	useEffect(() => {
		fetchAnimals(catUrl, dogUrl, setCatImage, setDogImage);
	}, []);

	const handleshowFavourites = () => {
		setShowFavourites(true);
	};

	const handleLoadNext = () => {
		fetchAnimals(catUrl, dogUrl, setCatImage, setDogImage);
	};

	const finishIntro = () => {
		setShowImage(true);
	};

	return (
		<>
			<Header />
			{!showImage && setTimeout(() => finishIntro(), 6000) && (
				<div id="intro">
					<p id="groupName">something</p>
					<img id="catImg" src="../src/images/cat.png"></img>
					<img id="vsImg" src="../src/images/vs.png"></img>
					<img id="dogImg" src="../src/images/dog.png"></img>
				</div>
			)}

			{catImage && dogImage && !showFavourites && showImage && (
				<div className="randomanimalscontainer">
					{/* camel case  */}
					<Showrandomanimals
						cat={catImage[0]}
						dog={dogImage[0]}
						showFavourites={handleshowFavourites}
						loadNext={handleLoadNext}
						serverUrl={serverUrl}
						votesUrl={votesUrl}
					/>
				</div>
			)}
			{showFavourites && (
				<Favourites
					serverUrl={serverUrl}
					backClick={setShowFavourites}
				/>
			)}
		</>
	);
}

export default App;

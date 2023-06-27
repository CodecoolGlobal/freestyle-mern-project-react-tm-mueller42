import React, { useState } from "react";

export default function ShowRandomAnimals({ cat, dog, showFavourites, loadNext, serverUrl, votesUrl }) {

  const [submitted, setSubmitted] = useState(false);
  const [catData, setCatData] = useState({});
  const [dogData, setDogData] = useState({});

  class Animal {
    constructor(id, title, comment, breed, favorite, rating, createdAt, imgUrl, type) {
      this.id = id;
      this.title = title;
      this.comment = comment;
      this.breed = breed;
      this.favorite = favorite;
      this.rating = rating;
      this.createdAt = createdAt;
      this.imgUrl = imgUrl;
      this.type = type
    }
  }

  const handleClickShowFavourites = (e) => {
    e.preventDefault();
    showFavourites();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(catData).length > 0) {
      if (!cat.breed) { cat.breed = "" }
      const newCat = new Animal(cat.id, catData.name, catData.comment, cat.breed, catData.addtofav, catData.rating, Date.now(), cat.url, "cat");
      fetch(serverUrl, {
        method: "POST",
        body: JSON.stringify(newCat),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }

    if (Object.keys(dogData).length > 0) {
      if (!dog.breed) { dog.breed = "" }
      const newDog = new Animal(dog.id, dogData.name, dogData.comment, dog.breed, dogData.addtofav, dogData.rating, Date.now(), dog.url, "dog");
      fetch(serverUrl, {
        method: "POST",
        body: JSON.stringify(newDog),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (Object.keys(catData).length > 0 || Object.keys(dogData).length > 0)
      setSubmitted(true);
  }

  const handleClickNext = () => {
    loadNext();
    setSubmitted(false);
    setCatData({});
    setDogData({});
  }

  const handleClickCatVote = () => {
    const newVotes = {
      catvotes: 1,
      dogvotes: 0,
      catRating: 0,
      dogRating: 0,
      numberOfCats: 0,
      numberOfDogs: 0,
    }
    fetch(votesUrl, {
      method: "POST",
      body: JSON.stringify(newVotes),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleClickDogVote = () => {
    
  }

  return (
    <>
      {!submitted &&
        <>
          <form onSubmit={handleSubmit} className="randomanimalform">
            <div className="randombuttonscontainer">
              <button type="submit">submit</button>
              <button className="nextbutton" onClick={handleClickNext}>next</button>
              <button type="button" onClick={handleClickShowFavourites}> show Favorite</button>
            </div>
            <div className="randomcatsidebar">
              <label>Add cat to favourites
              <input type="checkbox" checked={catData.addtofav ? catData.addtofav : false} onChange={e => setCatData({ ...catData, addtofav: e.target.checked })}></input> </label>
              <label>Name:
                <input type="text" value={catData.name ? catData.name : ""} onChange={e => setCatData({ ...catData, name: e.target.value })}></input></label><br />
              <label>Comment:
                <input type="text" value={catData.comment ? catData.comment : ""} onChange={e => setCatData({ ...catData, comment: e.target.value })}></input></label><br/>
              <label>Rating: </label>
              <input type="number" value={catData.rating ? catData.rating : ""} placeholder='from 1-10' onChange={e => setCatData({ ...catData, rating: e.target.value })}></input><br />
            </div>
            <div className="randomimagescontainer">
              <div className="randomcatimagecontainer">
                <img className="randomcatimage" src={cat.url} ></img>
                <button className="voteCat" type="button" onClick={handleClickCatVote}>The cat is cute. Vote for the cat!</button>
              </div>
              <div className="randomdogimagecontainer">
                <img className="randomdogimage" src={dog.url} ></img>
                <button className="voteDog" type="button" onClick={handleClickDogVote}>The dog is cool. Vote for the dog!</button>
              </div>
            </div>
            <div className="randomdogsidebar">
              <label>Add dog to favourites
              <input type="checkbox" checked={dogData.addtofav ? dogData.addtofav : false} onChange={e => setDogData({ ...dogData, addtofav: e.target.checked })}></input></label>
              <label>Name:
                <input type="text" value={dogData.name ? dogData.name : ""} onChange={e => setDogData({ ...dogData, name: e.target.value })}></input></label><br />
              <label>Comment:
                <input type="text" value={dogData.comment ? dogData.comment : ""} onChange={e => setDogData({ ...dogData, comment: e.target.value })}></input></label><br />
              <label>Rating: </label>
              <input type="number" value={dogData.rating ? dogData.rating : ""} placeholder='from 1-10' onChange={e => setDogData({ ...dogData, rating: e.target.value })}></input><br />
            </div>
          </form>
          
        </>
      }
      {
        submitted &&
        <div className = "submitcontainer">
          submitted
          <br></br>
          <button className = "backfromsubmitted" onClick={() => {setSubmitted(false)}}>back</button>
          <button className = "nextbutton" onClick={handleClickNext}>next</button>
        </div>
      }
    </>
  )
}


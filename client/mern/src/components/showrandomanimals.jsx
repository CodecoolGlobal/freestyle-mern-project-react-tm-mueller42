import React, {useState } from "react";
import Postanimal from "../components/postanimal";


export default function ShowRandomAnimals({cat, dog, showFavourites}) {

  const [addFavCat, setAddFavCat] = useState(false);
  const [addFavDog, setAddFavDog] = useState(false);
  const [catToAdd, setCatToAdd] = useState(null);
  const [dogToAdd, setDogToAdd] = useState(null);
  const [catName, setCatName] = useState(null);
  const [catComment, setCatComment] = useState(null);
  const [dogName, setDogName] = useState(null);
  const [dogComment, setDogComment] = useState(null);
  const [catVote, setCatVote] = useState(null);
  const [dogVote, setDogVote] = useState(null);
  const [submitted, setSubmitted] = useState(true);

console.log(submitted);

  class Animal {
    constructor(title, comment, breed, favorite, votes, createdAt, imgUrl, type) {
      this.title = title;
      this.comment = comment;
      this.breed = breed;
      this.favorite = favorite;
      this.votes = votes;
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
      if(addFavCat) {
        const newCat = new Animal(catName, catComment, cat.breed, addFavCat, catVote, Date.now(), cat.url, "cat");
        setCatToAdd(newCat);
        console.log("cat: ", newCat);
      }
      if(addFavDog) {
        const newDog = new Animal(dogName, dogComment, dog.breed, addFavDog, dogVote, Date.now(), dog.url, "dog");
        setDogToAdd(newDog);
        console.log("dog: ", newDog);
      }
      setSubmitted(true);
    }

const handleClick = () => {
  setSubmitted(false)
}

    return (
        <>
        {!submitted &&
        <>
        <form onSubmit={handleSubmit}>
            <button type="submit">submit</button>
            <br></br>
            <img src={cat.url} ></img><br />           
            <label>put to favorite</label>
            <input type="checkbox" onChange={e=>setAddFavCat(e.target.checked)}></input> <br />
            <label>Name: 
            <input type="text" onChange={e=>setCatName(e.target.value)}></input></label>
            <label>comment: 
            <input type="text" onChange={e=>setCatComment(e.target.value)}></input></label>
            <label>vote: </label>
            <input type="number" placeholder='from 1-10' onChange={e=>setCatVote(e.target.value)}></input><br/>

            
            <img src={dog.url} ></img><br/>
            <label>put to favorite</label>
            <input type="checkbox" onChange={e=>setAddFavDog(e.target.checked)}></input> <br />
            <label>Name: 
            <input type="text" onChange={e=>setDogName(e.target.value)}></input></label>
            <label>comment: 
            <input type="text" onChange={e=>setDogComment(e.target.value)}></input></label>
            <label>vote: </label>
            <input type="number" placeholder='from 1-10' onChange={e=>setDogVote(e.target.value)}></input>
          </form>
          <button type="button" onClick={handleClickShowFavourites}> show Favorite</button>
        </>
        }
        {submitted &&
        <>
          <div>submitted</div>
          <button onClick={handleClick}>back</button>
        </>
        }
        </>
    )

}
import { useState, useEffect } from "react";
import useSound from 'use-sound';
import meow from "../sounds/meow.wav";
import bark from "../sounds/bark.mp3";

export default function ({catVotes, dogVotes, backClick}) {
  const [displayedCatVote, setDisplayedCatVote] = useState(0);
  const [displayedDogVote, setDisplayedDogVote] = useState(0);
  const [playMeow] = useSound(meow);
  const [playBark] = useSound(bark);

  function handleBackClick() {
    backClick(false)
}

  let catHeight = catVotes>dogVotes ? 50 : catVotes/dogVotes*50;
  let catWidth = catVotes>dogVotes ? 30 : catVotes/dogVotes*30;
  let dogHeight = dogVotes>catVotes ? 50 : dogVotes/catVotes*50;
  let dogWidth = dogVotes>catVotes ? 30 : dogVotes/catVotes*30;

  let winner = catVotes>dogVotes ? 
  "And the winners are: THE CATS!"
  : dogVotes>catVotes ? "And the winners are: THE DOGS!"
  : "It's a tie!"

  useEffect(() => {
    if (displayedCatVote<=catVotes) {
      setTimeout(() => {
        setDisplayedCatVote(displayedCatVote+1);
      }, 1500/catVotes);
    }
    if (displayedCatVote===catVotes-1 && catVotes>dogVotes) {
      playMeow();
    }
    if (displayedDogVote<=dogVotes) {
      setTimeout(() => {
        setDisplayedDogVote(displayedDogVote+1);
      }, 1500/dogVotes);
    };
  }, [displayedCatVote, displayedDogVote]);

  // useEffect(() => {
  //     const countDogVotes = setInterval(() => {
  //       setDisplayedDogVote(displayedDogVote+1);
  //       if (displayedCatVote >= catVotes) {clearInterval(countDogVotes);}
  //   }, 100);
  // }, [displayedDogVote])

    return (
      <>
        <h1 className="winnertext">{winner}</h1>
        <div className="showvotescontainer">
          <img id="catImgVotes" src="../src/images/cat.png" style={
            {
              height:`${catHeight}vh`,
              width: `${catWidth}vw`
            }
          }>
          </img>
          <img id="dogImgVotes" src="../src/images/dog.png" style={
            {
              height:`${dogHeight}vh`,
              width: `${dogWidth}vw`
            }
          }>
          </img>

        </div>
        <div className="votecountcontainer">
          <h2 className="catvotecount">Cats: {displayedCatVote}</h2>
          <h2 className="votestext">Votes</h2>
          <h2 className="dogvotecount">Dogs: {displayedDogVote}</h2>
        </div>
        <div className="backcontainer">
          <button className="backfromvotes" onClick={handleBackClick}>back</button>
        </div>
      </>
    )
}
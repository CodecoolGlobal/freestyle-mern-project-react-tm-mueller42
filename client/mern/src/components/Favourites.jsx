import React, {useState, useEffect} from "react";

export default function ShowFavourites({ backClick }) {

    function handleBackClick() {
        backClick(false)
    }


    return(
        <div className="showfavouritescontainer">
        <button onClick={handleBackClick}>back</button>
        </div>
    )
}
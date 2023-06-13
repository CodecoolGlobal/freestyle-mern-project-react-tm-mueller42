import React, {useState, useEffect} from "react";
import DeleteFavourites from "./DeleteFavourite";

export default function ShowFavourites({ backClick }) {

    function handleBackClick() {
        backClick(false)
    }


    return(
        <div className="showfavouritescontainer">
        <DeleteFavourites/>
        <button onClick={handleBackClick}>back</button>
        </div>
    )
}
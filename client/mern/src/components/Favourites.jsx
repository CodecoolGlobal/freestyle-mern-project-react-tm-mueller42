import React, {useState, useEffect} from "react";
import DeleteFavourites from "./DeleteFavourite";

export default function ShowFavourites({ backClick }) {

const [favourites, setFavourites] = useState([]);

    function handleBackClick() {
        backClick(false)
    }


    return(
        <div className="showfavouritescontainer">
            <DeleteFavourites
                id={todo._id}
                favourites={favourites}
                setFavourites={setFavourites}/>
            <button onClick={handleBackClick}>back</button>
        </div>
    )
}
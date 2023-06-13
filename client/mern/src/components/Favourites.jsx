import React, {useState, useEffect} from "react";
import DeleteFavourites from "./DeleteFavourite";
import DogName from "./DogName";
import CatName from "./CatName";


export default function ShowFavourites({ backClick }) {

const [favourites, setFavourites] = useState([]);

    function handleBackClick() {
        backClick(false)
    }


    return(
        <div className="showfavouritescontainer">
            <DogName/>
            <CatName/>
            {/* <DeleteFavourites
                id={favorites._id}
                favourites={favourites}
                setFavourites={setFavourites}/> */}
            <button onClick={handleBackClick}>back</button>
        </div>
    )
}
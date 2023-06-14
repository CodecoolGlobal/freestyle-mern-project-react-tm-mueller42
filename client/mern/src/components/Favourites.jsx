import React, {useState, useEffect} from "react";
import DeleteFavourites from "./DeleteFavourite";



export default function ShowFavourites({ backClick }) {

    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/animal")
        .then((response) => response.json())
        .then((data) => {
            setFavourites(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []); 

    function handleBackClick() {
        backClick(false)
    }

    async function handleDelete(id) {
        try {
            await fetch(`http://localhost:4000/animal/${id}`, { method: 'DELETE' });
            const updatedFavourites = favourites.filter(favourite => favourite._id !== id);
            setFavourites(updatedFavourites);
          } catch (error) {
            console.error('Error deleting todo:', error);
          }
        };
    

    return(
        <div className="favouritescontainer">
            {favourites && favourites.map((favourite, index) => (
                <div className="favourite" key={favourite._id}>
                    <img src={favourite.imgUrl}></img>
                    <h3>{favourite.title}</h3>
                    <p>{favourite.comment}</p>
                    <p>{favourite.votes}</p>
                    <button className="deleteFavourite" onClick={()=> handleDelete(favourite._id)}>delete</button>
                </div>
            ))}
            {/* <DeleteFavourites
                id={favorites._id}
                favourites={favourites}
                setFavourites={setFavourites}/> */}
            <button onClick={handleBackClick}>back</button>
        </div>
    )
}
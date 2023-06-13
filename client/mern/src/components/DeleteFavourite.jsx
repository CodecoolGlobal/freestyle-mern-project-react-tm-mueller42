import React, {useState} from "react";

export default function DeleteFavourites({id, favourites, setFavourites}) {


    const handleDelete = async () => {
        try {
          await fetch(`http://localhost:5173/.../${id}`, { method: 'DELETE' });
          const updatedFavourites = favourites.filter(favourite => favourite._id !== id);
          setFavourites(updatedFavourites);
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      };

    return (
        <div className="deletefavouritescontainer">
            <button className="deletefavouritesbutton" onClick={handleDelete}>delete</button>
        </div>
    )
}
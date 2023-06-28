import React, { useRef, useState, useEffect } from "react";

export default function ShowFavourites({ backClick, serverUrl }) {

    const [favourites, setFavourites] = useState([]);
    const [showEdit, setShowEdit] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedComment, setEditedComment] = useState("");
    const [editedVote, setEditedVote] = useState("");

    const [filteredFavorites, setFilteredFavorites] = useState(null);
    const votes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [filteredByType, setFilteredByType] = useState(false);
    const [filteredByVote, setFilteredByVote] = useState("No-vote");

    useEffect(() => {
        fetch(serverUrl)
            .then((response) => response.json())
            .then((data) => {
                setFavourites(data);
                setFilteredFavorites(data)

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
            await fetch(serverUrl + id, { method: 'DELETE' });
            const updatedFavourites = filteredFavorites.filter(favourite => favourite._id !== id);
            setFavourites(updatedFavourites);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    function handleEdit(favourite) {
        const id = favourite._id;
        setShowEdit(id);
        if (favourite.comment) { setEditedComment(favourite.comment) };
        if (favourite.title) { setEditedTitle(favourite.title) };
        if (favourite.votes) { setEditedVote(favourite.votes) };
    }

    function handleSubmit(e) {
        e.preventDefault();
        filteredFavorites.map(favourite => {
            if (favourite._id === showEdit) {
                favourite.title = editedTitle;
                favourite.comment = editedComment;
                favourite.rating = editedRating;

                fetch(serverUrl, {
                    method: "POST",
                    body: JSON.stringify(favourite),
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
        })
        setShowEdit(null)
    }

    const resetFilter = () => {
        setFilteredFavorites(favourites);
        setFilteredByType(false);
        setFilteredByVote("No-vote");
    }
    
    useEffect(() => {
      
        if (filteredByType && filteredByVote !== "No-vote") {
            setFilteredFavorites(favourites.filter(fav => (fav.type === filteredByType) && (fav.votes === filteredByVote)))
        } else if (filteredByType) {
            setFilteredFavorites(favourites.filter(fav => (fav.type === filteredByType)));
        } else if (filteredByVote !== "No-vote") {
            setFilteredFavorites(favourites.filter(fav => (fav.votes === filteredByVote)));
        }
    }, [filteredByType, filteredByVote, favourites])

    return (
        <div className="favouriteandeditcontainer">
            <button id="backFromFav" onClick={handleBackClick}>back</button>
            <div className="filterBox">
                <label className="label">filter by Cat:</label>
                <input  checked={filteredByType === "cat"} type="radio" name="filter" onClick={(e) => setFilteredByType("cat")}></input>

                <label className="label"> filter by Dog:</label>
                <input  checked={filteredByType === "dog"} type="radio" name="filter" onClick={(e) => setFilteredByType("dog")}></input>

                <label className="label"> choose vote:</label>
                <select value={filteredByVote} onChange={(e) => setFilteredByVote(e.target.value === "No-vote" ? e.target.value : parseInt(e.target.value))}>
                    <option value="No-vote">No-vote</option>
                    {votes.map(vote =>
                        <option value={vote}>{vote}</option>
                    )}
                </select>
                <input className="reset" type="button" value="reset all filters" onClick={resetFilter}></input>
            </div>

            <div className="favouritescontainer">
                {filteredFavorites && filteredFavorites.map((favourite, index) => (
                    <div id="fav" className="favourite" key={favourite._id}>
                        <img className="favimg" src={favourite.imgUrl}></img>
                        <h3>{favourite.title}</h3>
                        <p>{favourite.comment}</p>
                        <p>{favourite.votes}</p>
                        <button className="deletefavourite" onClick={() => handleDelete(favourite._id)}>delete</button>
                        <button className="editfavourite" onClick={() => handleEdit(favourite)}>edit</button>
                    </div>
                ))}
            </div>
            {showEdit &&
                <div className="editcontainer">
                    <form onSubmit={handleSubmit}>
                        <label>Name:
                            <br></br><input type="text" value={editedTitle ? editedTitle : ""} onChange={e => setEditedTitle(e.target.value)} /></label><br />
                        <label>Comment:
                            <br></br><textarea rows="2" cols="20" value={editedComment ? editedComment : ""} onChange={e => setEditedComment(e.target.value)}></textarea></label><br />
                        <label>Rating:
                            <br></br><input type="number" value={editedVote ? editedVote : ""} onChange={e => setEditedVote(e.target.value)} /></label><br />
                        <button type="submit">Save</button>
                    </form>
                </div>}
        </div>
    )
}
import React, {useState, useEffect} from "react";

export default function ShowFavourites({ backClick, serverUrl }) {

    const [favourites, setFavourites] = useState([]);
    const [showEdit, setShowEdit] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedComment, setEditedComment] = useState("");
    const [editedVote, setEditedVote] = useState("");

    
    useEffect(() => {
        fetch(serverUrl)
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
            await fetch(serverUrl+id, { method: 'DELETE' });
            const updatedFavourites = favourites.filter(favourite => favourite._id !== id);
            setFavourites(updatedFavourites);
          } catch (error) {
            console.error('Error deleting todo:', error);
          }
        };
    
        function handleEdit(id) {
            setShowEdit(id);
        }

        function handleSubmit(e) {
            e.preventDefault();
            favourites.map(favourite => {
                if(favourite._id === showEdit) {
                    favourite.title = editedTitle;
                    favourite.comment = editedComment;
                    favourite.vote = editedVote;

                    fetch(serverUrl, {
                        method:"POST",
                        body:JSON.stringify(favourite),
                        headers:{'Content-Type': 'application/json; charset=UTF-8'}
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
          
    return(
        <div className="favouritescontainer">
            {favourites && favourites.map((favourite, index) => (
                <div className="favourite" key={favourite._id}>
                    <img src={favourite.imgUrl}></img>
                    <h3>{favourite.title}</h3>
                    <p>{favourite.comment}</p>
                    <p>{favourite.votes}</p>
                    <button className="deletefavourite" onClick={()=> handleDelete(favourite._id)}>delete</button>
                    <button className="editfavourite" onClick={() => handleEdit(favourite._id)}>edit</button>
                </div>
            ))}
            {showEdit &&    
            <div className="editcontainer">
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" value={editedTitle?editedTitle:""} onChange={e =>setEditedTitle(e.target.value)}/>
                    <label>Comment:</label>
                    <input type="text" value={editedComment?editedComment:""} onChange={e =>setEditedComment(e.target.value)}/>
                    <label>Rating:</label>
                    <input type="number" value={editedVote?editedVote:""} onChange={e =>setEditedVote(e.target.value)}/>
                <button type="submit">Save</button>
                </form>
            </div>}
            <button onClick={handleBackClick}>back</button>
        </div>
    )
}
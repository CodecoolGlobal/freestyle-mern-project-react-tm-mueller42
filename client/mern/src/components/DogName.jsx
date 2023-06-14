import React, {useState, useEffect} from "react";

export default function DogName() {

    const [dognames, setDognames] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/dognames`)
          .then(response => response.json())
          .then(data => {
            setDognames(data);
           
          })
      }, [])


    return (
        <div className="dogname">Name</div>
    )
}
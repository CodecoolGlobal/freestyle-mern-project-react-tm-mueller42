import React, {useState, useEffect} from "react";

export default function CatName() {

    const [catnames, setCatnames] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/dognames`)
          .then(response => response.json())
          .then(data => {
            setCatnames(data);

          })
      }, [])

    return (
        <div className="catname">
            name
        </div>
    )
}
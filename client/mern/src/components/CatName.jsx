import React, {useState} from "react";

export default function CatName() {

    const [catnames, setCatnames] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/dognames`)
          .then(response => response.json())
          .then(data => {
            setCatnames(data);
            console.log(data);
          })
      }, [])

    return (
        <div className="catname">
            name
        </div>
    )
}
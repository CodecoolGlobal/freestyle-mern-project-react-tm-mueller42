import React, { useState, useEffect } from "react";

export default function CatName() {

    const [catnames, setCatnames] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/catnames`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCatnames(data);

            })
    }, [])

    return (
        <div className="catname">
            name
        </div>
    )
}
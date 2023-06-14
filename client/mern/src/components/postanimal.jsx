import React, {useState, useEffect} from "react";
let run = true;

export default function Postanimal({cat, dog, serverUrl}) {
    
    useEffect(() => {
        if(run===true){
            if(cat) {    
            fetch(serverUrl, {
                method:"POST",
                body:JSON.stringify(cat),
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
            if(dog) {    
                fetch(serverUrl, {
                    method:"POST",
                    body:JSON.stringify(dog),
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
            run = false;
        }
        
        }, [])

// const handleCat = (cat) => {
//     console.log("cat: ", cat);

// }
// const handleDog = (dog) => {
//     console.log("dog: ", dog)
// }

// handleCat(cat);
// handleDog(dog);

    return (
        <>
            <div>submitted</div>
        </>
    )
}
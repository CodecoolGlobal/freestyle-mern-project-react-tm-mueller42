import React, {useState } from "react";

// export default function Todo({todo, number, url, change}) {
    export default function Todo({todo, number, url}) {
    const [removeTodo, setRemoveTodo] = useState(null);
    const [updateTodo, setUpdateTodo] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [title, setTitle] = useState(null);
    const [comment, setComment] = useState(null);

    // console.log(number);

    const handleClickRemove = () => {
        setRemoveTodo(true);
    }

    const handleClickUpdate = () => {
        setUpdateTodo(true);
    }

    const handleClickCancel = () => {
        setRemoveTodo(null);
        setUpdateTodo(null);
    }

    const handleClickConfirmDelete = () => {
        const endpoint = todo._id;
        fetch (url+endpoint, {
            method:'DELETE', 
            body: JSON.stringify(todo), 
            headers:{'Content-Type': 'application/json; charset=UTF-8'}
        })
        .then(response => {
            return response.ok ? (
                response.json(),
                setDeleted(true)
                // change(),
                // setRemoveTodo(false)
                )
                : Promise.reject(res);
        })
        .then(data => {
           console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
    }


    const handleClickConfirmUpdate = (event) => {
        event.preventDefault();
        let toUpdate = {title: title, comment: comment}
        // console.log(toUpdate);
        const endpoint = todo._id;
        fetch (url+endpoint, {
            method:'PATCH', 
            body: JSON.stringify(toUpdate), 
            headers:{'Content-Type': 'application/json; charset=UTF-8'}
        })
        .then(response => {
            return response.ok ? (
                response.json(),
                setUpdated(true),
                setUpdateTodo(false)
                // change(),
                // setRemoveTodo(false)
                )
                : Promise.reject(res);
        })
        .then(data => {
           console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    // async function handleClickConfirm() {
    //     const endpoint = todo._id;
    //     try {
    //         const response = await fetch ("http://localhost:4000/todo/"+endpoint, {
    //             method:'DELETE', 
    //             body: JSON.stringify(todo), 
    //             headers:{'Content-Type': 'application/json; charset=UTF-8'}
    //         })
    //         console.log(response.json);  //this does not show the response defined in server.js
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }

    return (
        <>
            {!removeTodo && !updateTodo && !deleted && !updated &&
                <tbody><tr> 
                    <td><button onClick = {handleClickRemove}>remove</button></td>
                    <td><button onClick = {handleClickUpdate}>update</button></td>
                    <td>Title: {todo.title}</td>
                    <td>Comment: {todo.comment}</td>
                    <td>CreatedAt: {todo.createdAt} </td>
                </tr></tbody>
            }
            {removeTodo && !updateTodo && !deleted && !updated &&
                <tbody><tr> 
                    <td><button onClick = {handleClickConfirmDelete}>confirm</button></td>
                    <td><button onClick = {handleClickCancel}>cancel</button></td>
                    <td>Title: {todo.title}</td>
                    <td>Comment: {todo.comment}</td>
                    <td>CreatedAt: {todo.createdAt} </td>
                </tr></tbody>
            }
            {!removeTodo && updateTodo && !deleted && !updated &&
                <tbody><tr>
                    <td><button onClick = {handleClickConfirmUpdate}>confirm</button></td>
                    <td><button onClick = {handleClickCancel}>cancel</button></td>
                    <td><label>Title: 
                    <input onChange = {e => setTitle(e.target.value)}></input>
                    </label></td>
                    <td><label>Comment: 
                    <input onChange = {e => setComment(e.target.value)}></input>
                    </label></td>
                    <td>CreatedAt: {todo.createdAt}</td>
                </tr></tbody>
            }
            {!removeTodo && !updateTodo && !deleted && updated &&
                <tbody><tr>
                    <td><button onClick = {handleClickRemove}>remove</button></td>
                    <td><button onClick = {handleClickUpdate}>update</button></td>
                    <td>Title: {title}</td>
                    <td>Comment: {comment}</td>
                    <td>CreatedAt: {todo.createdAt}</td>
                </tr></tbody>
            }
        </>
    )
}
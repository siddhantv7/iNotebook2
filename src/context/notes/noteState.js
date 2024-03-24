// import react from "react";
import { useState } from "react";

import NoteContext from "./noteContext";
const host = "http://localhost:5000";
const NoteState = (props) => {

    const [edit, setEdit] = useState({ id: "", title: "", description: "", tag: "", change: "False" });

    const [notes, setNotes] = useState()
    //Get ALl Notes
    console.log("type: ");
    console.log(typeof(notes))
    const getNote = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json(); // parses JSON response into native JavaScript 
        console.log(json);
        setNotes(json);
    }
    // Add note
    const addNote = async ({ title, description, tag }) => {
        console.log(title);
        console.log(description);
        try{
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });

        const note = await response.json();
        setNotes(notes.concat(note))
    } catch(error){
        console.log(error);
    }

    }
    // Delete Note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            console.log(response); // You can handle the response data here

            console.log("Deleting note with id: " + id);
            const newNotes = notes.filter((note) => note._id !== id);
            setNotes(newNotes);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    // Edit Note
    const editNote = async ({ id, title, description, tag }) => {
        // API call
        console.log(id);
        console.log(title);
        console.log(description);
        console.log(tag);
        try {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        });
        console.log(response);
    } catch(error){
        console.log(error);
    }
        // const json = response.json(); // parses JSON response into native JavaScript 

        // Logic to edit in client
        let newNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        setNotes(newNote);
        
    }

    const passEdit = (id, title, description, tag) => {
        setEdit({ id, title, description, tag, change: "True" });
    };

    return (
        // <NoteContext.Provider value={{ state, update }}>
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNote, edit, setEdit, passEdit }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
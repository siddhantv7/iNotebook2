// import react from "react";
import { useState } from "react";

import NoteContext from "./noteContext";
const host = "http://localhost:5000"
const NoteState = (props) => {
    // const s1 = {
    //     "name": "Siddhant",
    //     "class": "15"
    // }
    // const [state, setState] = useState(s1);

    // const update = () => {
    //     setTimeout(() => {
    //         setState({ 
    //             "name": "raj",
    //             "class": "12"
    //         })
    //     }, 1000)
    // }




    const [notes, setNotes] = useState()
    //Get ALl Notes
    const getNote = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMDVlMzk5ZmE4NGIwYzhjOWI3YTAzIn0sImlhdCI6MTcwOTIwMzA3Mn0.hUa_YMA9JzJaVwwCZKx3_eLmDQzlFpmdGQ8LQsehg90"
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
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMDVlMzk5ZmE4NGIwYzhjOWI3YTAzIn0sImlhdCI6MTcwOTIwMzA3Mn0.hUa_YMA9JzJaVwwCZKx3_eLmDQzlFpmdGQ8LQsehg90"
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const json = response.json(); // parses JSON response into native JavaScript 
        const note = {
            "_id": "65e5d43s9zc1ba31evae6a5ec33",
            "user": "65e05e399fa84b0c8c9b7a03",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-03-04T14:01:29.494Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }
    // Delete Note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMDVlMzk5ZmE4NGIwYzhjOWI3YTAzIn0sImlhdCI6MTcwOTIwMzA3Mn0.hUa_YMA9JzJaVwwCZKx3_eLmDQzlFpmdGQ8LQsehg90"
                },
            });
            
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
            
            // const data = await response.json();
            console.log(response); // You can handle the response data here
            
            console.log("Deleting note with id: " + id);
            const newNotes = notes.filter((note) => note._id !== id);
            setNotes(newNotes);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    // Edit Note
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMDVlMzk5ZmE4NGIwYzhjOWI3YTAzIn0sImlhdCI6MTcwOTIwMzA3Mn0.hUa_YMA9JzJaVwwCZKx3_eLmDQzlFpmdGQ8LQsehg90"
            },
            body: JSON.stringify(title, description, tag), // body data type must match "Content-Type" header
        });
        const json = response.json(); // parses JSON response into native JavaScript 

        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }
    return (
        // <NoteContext.Provider value={{ state, update }}>
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
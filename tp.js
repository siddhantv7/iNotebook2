import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const navigator = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNote } = context;

  useEffect(() => {
    getNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Make sure to pass an empty dependency array to run this effect only once


  if (localStorage.getItem("token")) {
    
    return (
      <>
        <AddNote />
        <div className="row my-3">
        {
        notes && notes.map((note) => {
          // return <div key={note.id}>{note.title}</div>;
          return <Noteitem key={note._id} note={note} />
        })
        }
        </div>
      </>
    );
    
  } else {
    navigator('/login');
  }
};

export default Notes;

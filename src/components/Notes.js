import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNote } = context;
  useEffect(() => {
    return () => {
      getNote()
    }
  }, [])
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
}

export default Notes;

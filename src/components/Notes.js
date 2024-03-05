import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes } = context;
  
  return (
    <div className="row my-3">
      {
        notes.map((note) => {
        //   return <div key={note.id}>{note.title}</div>;
          return <Noteitem note={note}/>
        })
      }
    </div>
  );
}

export default Notes;

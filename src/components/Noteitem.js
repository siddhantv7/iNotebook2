import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
// import AddNote from './AddNote';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote, passEdit } = context;
    const { note } = props;


    const handleEditClick = () => {
        passEdit(note._id, note.title, note.description, note.tag);
    };

    return (
        <div className='col-md-3 my-2 '>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center ">
                        <h5 className="card-title my-0 align-middle">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2 align-items-center" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="fa-regular fa-pen-to-square mx-2 align-items-center" onClick={handleEditClick}></i>
                    </div>
                    <p className="card-text">{note.description} </p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem

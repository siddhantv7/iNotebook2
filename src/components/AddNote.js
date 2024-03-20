import { useContext, useState } from 'react';
// import react from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "dd", description: "dd", tag: "TAG" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote({
            title: note.title,
            description: note.description,
            tag: note.tag
        });
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <div className="container">
                <h4>Add a Note</h4>
                <form className='mx-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
                <h4>Your Notes</h4>
            </div>
        </div>
    )
}

export default AddNote

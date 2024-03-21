import { useContext, useState, useEffect } from 'react';
// import react from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote, edit, setEdit, editNote } = context;
    // const { title, description, tags  } = props;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    useEffect(() => {
        if (edit.change === "True") {
            setNote({
                title: edit.title,
                description: edit.description,
                tag: edit.tag
            });
        } else {
            setNote({ title: "", description: "", tag: "" });
        }
    }, [edit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit.change === "True") {
            handleEdit();
        } else {
            handleClick();
        }
    };
    const handleClick = (e) => {
        e.preventDefault();
        addNote({
            title: note.title,
            description: note.description,
            tag: note.tag
        });
    };

    const handleEdit = () => {
        editNote({
            id: edit.id,
            title: note.title,
            description: note.description,
            tag: note.tag
        });
        setEdit({ ...edit, change: "False" });
        setNote({ title: "", description: "", tag: "" });
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container">
            <h4>{edit.change === "True" ? 'Edit Note' : 'Add a Note'}</h4>
                <form className='mx-3' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>{edit.change === "True" ? 'Update' : 'Submit'}</button>
                </form>
                <h4>Your Notes</h4>
            </div>
        </div>
    )
}

export default AddNote

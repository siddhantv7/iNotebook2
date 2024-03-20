const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator')
const Notes = require('../models/Notes');

// ROUTE1: Get all notes using: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE2: Add a new note using: POST "/api/notes/addnotes". login required
router.post('/addnotes', fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 4 }),
    body("description", "Description must be atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        // If there are error , return bad requestand the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            user: req.user.id, title, description, tag 
        });

        const saveNote = await note.save()

        res.json(saveNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});
// ROUTE3: UPdating the existing Note using : POST "/api/notes/updatenote/:id". login required
router.post('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const {title, description, tag} = req.body;

        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        let note = await Notes.findById(req.params.id);

        if(!note){return res.status(404).send("Not Found!")}
        
        if (note.user.toString() !== req.user.id ){
            return res.status(401).send("Not Allowed!");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});

        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE4: Deleting the existing Note using : POST "/api/notes/getuser". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found!")}
        
        if (note.user.toString() !== req.user.id ){
            return res.status(401).send("Not Allowed!");
        }
        note = await Notes.findByIdAndDelete(req.params.id);

        // res.json({"success": "Note deleted successfully", note: note});
        res.json({"success": "Note deleted successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
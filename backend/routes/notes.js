const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator')
const Notes = require('../models/Notes');

// ROUTE1: Get all notes using: GET "/api/auth/getuser". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE2: Add a new note using: POST "/api/auth/getuser". login required
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

module.exports = router;
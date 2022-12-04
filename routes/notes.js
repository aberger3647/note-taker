const router = require('express').Router();
const fs = require('fs');
const { readFile, writeFile } = fs.promises;
const { v4: uuidv4 } = require('uuid');


// GET Route for notes page
router.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/notes.html'))
    res.sendFile('../public/notes.html')
);

// Read db.json file and return saved notes as JSON
router.get('/', (req, res) => {
    readFile('../db/db.json')
    .then(data => {
      res.send(data)
    })
  });

// Create and save new note
router.post('/', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    readFile('../db/db.json')
    .then(data => {
      const allNotes = JSON.parse(data);
      allNotes.push(newNote);
      writeFile('../db/db.json', JSON.stringify(allNotes)).then(data => {
        res.json(newNote);
      })
    })
  });

// Delete a note
router.delete('/:id', (req, res) => {
    readFile('../db/db.json')
    .then(data => {
      let allNotes = JSON.parse(data);
      const { id } = req.params;
      allNotes = allNotes.filter(allNotes.id != id);
      writeFile('../db/db.json', JSON.stringify(allNotes)).then(data => {
        res.json(allNotes);
      })
    })
  });

module.exports = router;
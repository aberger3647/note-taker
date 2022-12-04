const notes = require('express').Router();
const fs = require('fs');
const { readFile, writeFile } = fs.promises;
const { v4: uuidv4 } = require('uuid');

// GET Route for notes page
notes.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// Read db.json file and return saved notes as JSON
notes.get('/api/notes', (req, res) => {
    readFile('db/db.json')
    .then(data => {
      res.send(data)
    })
  });

// Create and save new note
notes.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    readFile('db/db.json')
    .then(data => {
      const allNotes = JSON.parse(data);
      allNotes.push(newNote);
      writeFile('db/db.json', JSON.stringify(allNotes)).then(data => {
        res.json(newNote);
      })
    })
  });

// Delete a note
notes.delete('/api/notes/:id', (req, res) => {
    readFile('db/db.json')
    .then(data => {
      let allNotes = JSON.parse(data);
      const { id } = req.params;
      allNotes = allNotes.filter(allNotes.id != id);
      writeFile('db/db.json', JSON.stringify(allNotes)).then(data => {
        res.json(allNotes);
      })
    })
  });

module.exports = notes;
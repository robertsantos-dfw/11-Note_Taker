const db = require("../db/db");
const express = require("express")
const fs = require(`fs`);
const path = require(`path`)

module.exports = app => {

    fs.readFile("db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);


        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        app.post("/api/notes", function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: " + newNote.title);
        });
        app.get("/api/notes/:id", function(req, res) {
            res.json(notes[req.params.id]);
        });

        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id " + req.params.id);
            window.location.reload();
        });

        app.get('/notes', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
            // window.location.reload();
        }

    });

}


// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);

// async function readFile() {
//     const data = await readFileAsync("db/db.json", "UTF-8");
//     return JSON.parse(data);
// }


// router.get("/notes", function(req, res) {
//     res.json(db);
// });


// router.post("/api/notes", function(req, res) {
//     let newNote = req.body;
//     notes.push(newNote);
//     updateDb();
//     return console.log("Added new note: " + newNote.title);
// });



// router.get("/api/notes/:id", function(req, res) {
//     res.json(notes[req.params.id]);
// });


// //delete route
// router.delete("/notes/:id", async function(req, res) {
//     var data = await readFile();
//     let id = req.params.id;

//     function deleteNote() {
//         data = data.filter((note) => note.id != id);
//         writeFileAsync("db/db.json", JSON.stringify(data), "UTF-8");
//         res.json(data);
//         window.location.reload();
//     }
//     deleteNote();
// });



// module.exports = router;
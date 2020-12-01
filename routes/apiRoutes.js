const db = require("../db/db");
const express = require("express")
const router = express.Router()
const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

async function readFile() {
    const data = await readFileAsync("db/db.json", "UTF-8");
    return JSON.parse(data);
}


router.get("/notes", function(req, res) {
    res.json(db);
});

router.post("/note", function(req, res) {
    db.push(req, body);
    console.log(db);
    res.json(true);
});


router.put("/note/:id", function(req, res) {
    // Empty out the arrays of data
    db.length = 0;
    res.json({ ok: true });
});

//delete route
router.delete("/notes/:id", async function(req, res) {
    var data = await readFile();
    let id = req.params.id;

    function deleteNote() {
        data = data.filter((note) => note.id != id);
        writeFileAsync("db/db.json", JSON.stringify(data), "UTF-8");
        res.json(data);
        window.location.reload();
    }
    deleteNote();
});



module.exports = router;
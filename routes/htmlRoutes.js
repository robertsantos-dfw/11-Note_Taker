const path = require("path");
const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.sendFile('../public/index.html', { root: __dirname });
});

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});



module.exports = router;
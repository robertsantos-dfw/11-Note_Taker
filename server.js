const { json } = require("body-parser");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000

//set middleware
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//set routes
const htmlRoutes = require("./routes/htmlRoutes");

app.use("/", htmlRoutes);

const apiRoutes = require("./routes/apiRoutes");

app.use("/api", apiRoutes);


// app.get("/", (req, res) => {
//     res.sendFile('public/index.html', { root: __dirname })
// })
// app.get("/notes", (req, res) => {
//     res.sendFile('public/notes.html', { root: __dirname })
// })

app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
);
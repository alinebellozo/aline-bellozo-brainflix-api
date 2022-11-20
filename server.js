// dotenv require should be the first line of code
require("dotenv").config();

const express = require("express");

const path = require("node:path");
const cors = require("cors");
// initialize express server instance
const app = express();

const videoRouter = require("./routes/videos");

app.use(cors());
app.use(express.json()); //next

app.use(express.static(path.join(__dirname, "public"))); //next
app.use("/videos", videoRouter);

app.get("/", (req, res) => {
    // serve the index.html file from the public folder
    // create the path to index.html file using path module
    // aline-bellozo-brainflix/public/index.html
    res.send(path.join(__dirname, "public", "index.html"));
});

app.listen(8080, () => {
    console.log("Server is up and running! 🚀");
});
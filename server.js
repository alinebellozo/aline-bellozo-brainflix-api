const express = require("express");
// const router = express.Router();
const path = require("node:path");
const cors = require("cors");
// initialize express server instance
const app = express();

app.use(cors());
app.use(express.json()); //next

const videoRouter = require("./routes/videos");

app.use(express.static(path.join(__dirname, "public"))); //next

app.get("/", (req, res) => {
    // serve the index.html file from the public folder
    // create the path to index.html file using path module
    // aline-bellozo-brainflix/public/index.html
    res.send(path.join(__dirname, "public", "index.html"));
});

// router.get("/:id", (req, res) => {
//     res.send("Video id");
// })

// app.get("/John", (req, res) => {
//     res.json({jon:123})
// })

app.use("/videos", videoRouter);


app.listen(8080, () => {
    console.log("Server is up and running! 🚀");
});
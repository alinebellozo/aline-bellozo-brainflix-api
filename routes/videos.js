const express = require("express");
const router = express.Router();
// json file path
const path = require("node:path");
const { restart } = require("nodemon");
const { getNewId, writeJSONFile } = require("../helper/helper");

const videosJSONFile = path.join(__dirname, "../data/videos.json");
const videos = require(videosJSONFile);

// APIs related to the videos
/*
 * C - HTTP POST
 * R - HTTP GET
 * U - HTTP PUT/PATCH
 * D - HTTP DELETE
 */

// http://localhost:8080/videos
router.get("/", (req, res) => {
    // return the videos, but first I need to create the path to the json file to then require it (videosJSONFile)
    try {
    res.status(200).json(videos);
  } catch (error) {
    // console.log("Error retrieving the videos", error);
  }
});

// get videos by ID
// :id -> URL Param -> req.params.id
router.get("/:id", (req, res) => {
  // find the video using id -> req.params.videoId
  const selected = videos.find((video) => video.id === req.params.id);
    if (selected) {
      res.status(200).json(selected);
    } else {
      res
        .status(404)
        .json({ error: `Video with ID ${req.params.id} not found` });
    }
});

router.post("/:id/comment", (req, res) => {
  const videoId = req.params.id;
  const { comment } = req.body;
  const selectedVideo = videos.find((video) => video.id === videoId);
  
  if (selectedVideo && comment !== "") {
    const newComment = {
      id: getNewId(),
      name: "Jane Doe",
      comment: comment,
      likes: 0,
      timestamp: new Date(),
    }
    selectedVideo.comments.push(newComment);
    writeJSONFile(videosJSONFile, videos);

    res.status(201).json(videos);
  } else {
    let msg = "The video you're trying to comment on doesn't exist!";
    if (comment === "") {
      msg = "The comment field is blank, please write something.";
    }
    res.status(404).json({ error: msg })
  }
  
  return res;
})

// create API endpoint with POST request to post new videos
router.post("/", (req, res) => {
  // console.log(req.body.title);
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      error: "Oops, you need to fill all the fields...",
  });
  }

  const newVideo = {
    title: title,
    channel: "BrainStation",
    image: "http://localhost:8080/images/joffrey.jpeg",
    description: description,
    views: 0,
    likes: 0,
    timestamp: new Date(),
    comment: [],
    id: getNewId(),
  };
 
  // update json file with new video
  videos.push(newVideo);
  writeJSONFile(videosJSONFile, videos);

  // respond to the client with new video and status code 201
  res.status(201).json(newVideo);
});

module.exports = router;
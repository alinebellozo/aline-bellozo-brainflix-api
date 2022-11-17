const express = require("express");
const router = express.Router();
// json file path
const path = require("node:path");
// const { Router } = require("express");

const videosJSONFile = path.join(__dirname, "../data/videos.json");
const videos = require(videosJSONFile);

// APIs related to the videos
/*
 * C - HTTP POST
 * R - HTTP GET
 * U - HTTP PUT/PATCH
 * D - HTTP DELETE
 */

// http://localhost:8080/api/videos
router.get("/", (req, res) => {
    // return the videos, but first I need to create the path to the json file to then require it (line 7)
    try {
    res.status(200).json(videos);
  } catch (error) {
    console.log("Error retrieving the videos", error);
  }    
});


//router.post
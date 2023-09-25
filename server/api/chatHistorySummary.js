var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("app.get called");
  const filePath = path.join(__dirname, "posts", "chatHistorySummary.json");

  // Read the chat history from the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading chat history summary");
    } else {
      const chatHistorySummary = JSON.parse(data);
      res.json(chatHistorySummary);
    }
  });
});

router.post("/", function (req, res, next) {
  console.log("app.post called");
  const filePath = path.join(__dirname, "posts", "chatHistorySummary.json");

  // Get the updated chatHistory data from the request body
  const updatedChatHistorySummary = req.body;

  // Write the updated systemRole to the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    try {
      // Parse the JSON data
      let jsonData = JSON.parse(data);
      //console.log("app.get jsonData = ", jsonData);

      // Modify the desired data in the JSON object
      jsonData = updatedChatHistorySummary;
      //console.log("app.get update jsonData = ", jsonData);

      // Convert the modified JSON object back to a string
      const updatedData = JSON.stringify(jsonData, null, 2);

      // Write the stringified JSON to the file, overwriting its contents
      fs.writeFile(filePath, updatedData, { flag: "w" }, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("File written successfully");
        }
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
});

module.exports = router;

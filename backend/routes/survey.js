const express = require("express");
// const UserResponse = require("../models/UserResponse");
const UserResponse = require("../models/UserResponse");

const router = express.Router();

// Submit survey responses
router.post("/submit", async (req, res) => {
  try {
    const { userId, responses } = req.body;

    if (!userId || !responses) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newResponse = new UserResponse({ userId, responses });
    await newResponse.save();

    // You can invoke your ML model here to process the responses
    const result = await processWithMLModel(responses);

    res.status(200).json({ message: "Responses submitted successfully", result });
  } catch (error) {
    console.error("Error submitting responses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// A placeholder function for ML processing
const processWithMLModel = async (responses) => {
  // Call your ML model logic here
  // This could involve running a Python script, or calling a REST API
  return { score: 85, riskLevel: "Moderate" }; // Example response
};

module.exports = router;

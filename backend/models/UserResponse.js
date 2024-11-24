const mongoose = require("mongoose");

const UserResponseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  responses: { type: Object, required: true }, // Stores survey answers
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserResponse", UserResponseSchema);

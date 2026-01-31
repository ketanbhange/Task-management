const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const taskRoutes = require("./Routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mensTodoApp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// API routes
app.use("/api/tasks", taskRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

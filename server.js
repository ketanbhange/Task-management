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
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// API routes
app.use("/api/tasks", taskRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ✅ Correct port handling
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

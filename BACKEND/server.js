const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Portfolio Backend Running");
});

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
    });

// Project Schema
const projectSchema = new mongoose.Schema({
    title: String,
    tech: String,
});

// Model
const Project = mongoose.model("Project", projectSchema);

// GET ALL PROJECTS
app.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Task Manager Backend Running");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
})
.catch(err => {
    console.log("MongoDB Connection Error:");
    console.log(err);
});

// Task Schema
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority: String,
    completed: {
        type: Boolean,
        default: false
    }
});

// Task Model
const Task = mongoose.model("Task", taskSchema);

// CREATE TASK
app.post("/tasks", async (req, res) => {
    try {

        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority
        });

        res.status(201).json(task);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

// GET ALL TASKS
app.get("/tasks", async (req, res) => {
    try {

        const tasks = await Task.find();

        res.json(tasks);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});
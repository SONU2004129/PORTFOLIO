const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.error("MongoDB Error:");
        console.error(err);
    });

// Project Schema
const projectSchema = new mongoose.Schema({
    title: String,
    tech: String,
});

const Project = mongoose.model("Project", projectSchema);

// Get Projects
app.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find(
            {},
            {
                _id: 0,
                __v: 0,
            },
        );

        res.json(projects);
    } catch (err) {
        res.status(500).json({
            error: "Failed to load projects",
        });
    }
});

// Contact Form
app.post("/contact", (req, res) => {
    console.log(req.body);

    res.json({
        message: "Received successfully",
    });
});

// Home Route
app.get("/", (req, res) => {
    res.send("Portfolio Backend Running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

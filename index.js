require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/note.route");
const app = express();

app.use(express.json());
app.use("/api/notes", noteRoutes);




const PORT = process.env.PORT || 5000;


const startServer = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log("MongoDB error:", error.message);
    }
};


startServer();
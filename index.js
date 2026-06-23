require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/note.route");
const authRoutes = require('./routes/auth.route');
const aiRoutes = require("./routes/ai.route");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use("/api/ai", aiRoutes);




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
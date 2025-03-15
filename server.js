const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Import Routes
const couponRoutes = require("./routes/couponRoutes");
app.use("/api", couponRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api", adminRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

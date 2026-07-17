const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const departmentRoutes = require("./routes/departmentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);
app.use("/dashboard", dashboardRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("People Hub API is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
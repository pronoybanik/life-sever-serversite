const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
require("dotenv").config();
const DoctorProfileRouter = require("./Routes/DoctorsProfile.Routers")

app.use(cors());
app.use(express.json());


// mongoose patten 
// 1.schema > 2.model > 3.query

 // 3. query
app.use("/doctorProfile", DoctorProfileRouter);

// Data Base Connection
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('database connection is successful');
});


app.get("/", (req, res) => {
    res.send("Life Server Server RunIng")
});

app.listen(port, (req, res) => {
    console.log(`Life site server${port}`);
});

module.exports = app;


// life_sever
// yay630ewmiHWq9g6


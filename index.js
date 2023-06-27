const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// Data Base Connection
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('database connection is successful');
})

app.get("/", (req, res) => {
    res.send("Life Server Server RunIng")
});

app.listen(port, (req, res) => {
    console.log(`Life site server${port}`);
});


// life_sever
// yay630ewmiHWq9g6

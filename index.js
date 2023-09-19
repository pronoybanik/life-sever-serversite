const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


app.use(cors());
app.use(express.json());


// Route
const DoctorProfileRouter = require("./Routes/DoctorsProfile.Routers")
const Appointment = require("./Routes/appointmentBooking.Routers")
const userRoute = require("./Routes/user.Routes")
const FeedBackRoute = require("./Routes/feedBack.Route")

// mongoose patten 
// 1.schema > 2.model > 3.query

// 3. query
app.use("/api/v1/doctorProfile", DoctorProfileRouter);
app.use("/api/v1/appointment", Appointment);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/feedBack", FeedBackRoute);

// Data Base Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('database connection is successful');
});


// swagger setup system
const swaggerOptions = {
    swaggerDefinition: {
        // Path to the API docs
        openapi: '3.0.0',
        info: {
            title: 'Node js API project Life sever useIng mongodb',
            version: '1.0.0',
            description: 'That is hospital website ',

        },

        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    // List of files to be processed
    apis: ['./index.js'], // You can specify the path to your routes
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


app.get("/", (req, res) => {
    res.send("Life Server Server RunIng")
});

app.listen(port, (req, res) => {
    console.log(`Life site server${port}`);
});

module.exports = app;



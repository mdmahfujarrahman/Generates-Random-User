const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/users.route.js");
const fs = require('fs');


app.use(express.json());
app.use(cors());


app.use("/user", userRoutes);



app.get('/', (req, res) => {
    res.send("Welcome to assainment 1")
})


app.listen(port, ()=> {
    console.log("Server running on port " + port);
});
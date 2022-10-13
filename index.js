const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/users.route.js");
const fs = require('fs');


app.use(express.json());
app.use(cors());


app.use("/user", userRoutes);



app.get('/', (req, res) => {
    res.send("Welcome to Assignment One");
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
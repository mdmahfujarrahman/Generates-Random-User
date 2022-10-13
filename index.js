const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/users.route.js");


app.use(express.json());
app.use(cors());


app.use("/user", userRoutes);



app.get('/', (req, res) => {
    res.send("Welcome to Assignment One");
})


app.listen(5000, () => {
    console.log(`Server listening on ${PORT}`);
});
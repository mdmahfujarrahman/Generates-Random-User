const fs = require('fs');
let usersInfo = fs.readFileSync("userInfo.json");
let userData = JSON.parse(usersInfo);


module.exports.getAllUser = (req, res, next) => {
    res.send(userData);
};

module.exports.getRandomUser = (req, res, next) => {
    console.log(usersInfo);
    const randomUser = userData[Math.floor(Math.random() * userData.length)];
    console.log(randomUser);
    res.send(randomUser);
};
module.exports.saveAUser = (req, res, next) => {
    const body = req.body;
    const filterId = usersInfo.find((user) => user.id === body.id);
    if (filterId) {
        res.send({ message : "id already in server"})
        return
    } else {
        usersInfo.push(body);
    }
    res.json(usersInfo);
};

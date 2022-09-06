const fs = require('fs');
let usersInfo = fs.readFileSync("userInfo.json");
let userData = JSON.parse(usersInfo);


module.exports.getAllUser = (req, res, next) => {
    res.send(userData);
};

module.exports.getRandomUser = (req, res, next) => {
    const randomUser = userData[Math.floor(Math.random() * userData.length)];
    res.send(randomUser);
};
module.exports.saveAUser = (req, res, next) => {
    const body = req.body;
    const filterId = userData.find((user) => user.id === body.id);
    if (filterId) {
        res.send({ message : "id already in server"})
        return
    } else {
        userData.push(body);
        fs.writeFileSync("userInfo.json", JSON.stringify(userData), (err) => {
            if (err) throw err;
        });
    }
    res.send(userData);
};

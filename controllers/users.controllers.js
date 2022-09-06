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


module.exports.updateAUser = (req, res, next) => {
    const id = req.params.id
    const body = req.body
    const filter = userData.find((user) => user.id === id);
    if (!filter){
        res.send({message: 'User id not found'})
        return;
    } else {
        let updateData = userData.find((user) => user.id === filter.id);
        filter.id = id;
        filter.name = body.name || filter.name;
        filter.gender = body.gender || filter.gender;
        filter.address = body.address || filter.address;
        filter.contact = body.contact || filter.contact;
        filter.photoUrl = body.photoUrl || filter.photoUrl;
        updateData = filter,
        userData,
        fs.writeFileSync("userInfo.json", JSON.stringify(userData), (err) => {
            if (err) throw err;
        });
        res.send(updateData);
    }
    
};
module.exports.updateBulkAUser = (req, res, next) => {
    const id = req.params.id
    const body = req.body
    const filter = userData.find((user) => user.id === id);
    if (!filter){
        res.send({message: 'User id not found'})
        return;
    } else {
        let updateData = userData.find((user) => user.id === filter.id);
        filter.id = id;
        filter.name = body.name || filter.name;
        filter.gender = body.gender || filter.gender;
        filter.address = body.address || filter.address;
        filter.contact = body.contact || filter.contact;
        filter.photoUrl = body.photoUrl || filter.photoUrl;
        updateData = filter,
        userData,
        fs.writeFileSync("userInfo.json", JSON.stringify(userData), (err) => {
            if (err) throw err;
        });
        res.send(updateData);
    }
    
};



module.exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    const filter = userData.find((user) => user.id === id);
    
    if (!filter) {
        res.send({ message: "User id not found" });
        return;
    } else {
        const getIndex = userData.findIndex((user) => user.id === filter.id);
       userData.splice(getIndex, 1);
       fs.writeFileSync("userInfo.json", JSON.stringify(userData), (err) => {
           if (err) throw err;
       });
       res.send({ message: "User successfully Delete", status: "success" });
    }
    
};
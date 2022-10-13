const fs = require('fs');
let usersInfo = fs.readFileSync("userInfo.json");
let userData = JSON.parse(usersInfo);

module.exports.getAllUser = (req, res, next) => {
    const {limit} = req.query
    res.send({user:  userData.slice(0, limit) , totalUser : userData.length});
};


module.exports.getRandomUser = (req, res, next) => {
    const randomUser = userData[Math.floor(Math.random() * userData.length)];
    res.send(randomUser);
};

module.exports.saveAUser = (req, res, next) => {
    const body = req.body;
    const filter = userData.find((user) => user.contact === body.contact);
    if (filter) {
        res.send({
            message: `User ${filter.contact} already exists`,
            status: "Fail",
        });
        return
    } else {
        let id = userData.at(-1).id;
        let newId = parseInt(id) + 1; 
        const newData = {
            id: newId.toString(),
            name: body.name,
            gender: body.gender,
            contact: body.contact,
            address: body.address,
            photoUrl: body.photoUrl,
        };
        userData.push(newData)
        fs.writeFileSync("userInfo.json", JSON.stringify(userData), (err) => {
            if (err) throw err;
        });
    }
    res.send({ userData, status: "success" });
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
        res.send({ updateData, status: "success" });
    }
    
};


module.exports.updateBulkUser = (req, res, next) => {
    const body = req.body;
    const updateData = Object.create(null);
    for (const user of body) {
            const index = userData.findIndex(item => item.id === user.id);
            if (index === -1) {
                return res.send({message: "User Not Found"})
            } else {
                updateData[index] = { ...userData[index], ...user }
            }
    }
    Object.assign(userData, updateData);
    fs.writeFileSync("userInfo.json", JSON.stringify(userData), (err) => {
            if (err) throw err;
    });
    return res.send({ updateData });
};


module.exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    const filter = userData.find((user) => user.id === id);
    if (!filter) {
        return res.send({ message: "User id not found", status: "Fail" });
        
    } else {
    const getIndex = userData.filter((user) => user.id !== filter.id);
       fs.writeFileSync("userInfo.json", JSON.stringify(getIndex), (err) => {
           if (err) throw err;
       });
       res.send({ message: "User successfully Delete", status: "success" });
    }
};
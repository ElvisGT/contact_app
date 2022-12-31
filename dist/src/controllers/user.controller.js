"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = exports.getUser = void 0;
const getUsers = (req, res) => {
    console.log(req.body);
    res.json({
        msg: "Todos"
    });
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
};
exports.getUser = getUser;
const createUser = (req, res) => {
    // const {name,password}:user = req.body
    console.log(req.body);
    // const user = new User()
    // user.name = name
    // user.password = password
    // res.status(201).json({
    //   msg:'OK',
    //   user
    // })
};
exports.createUser = createUser;
const updateUser = (req, res) => {
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
};
exports.deleteUser = deleteUser;

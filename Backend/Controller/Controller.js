"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
var fs = require('fs');
// global function for reading json file
const readFiledata = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data.json', 'utf8', (error, data) => {
            if (error) {
                reject(error);
                return;
            }
            else {
                const mdata = JSON.parse(data);
                resolve(mdata);
                // resolve('data9')
            }
        });
    });
};
// global function for writing in json file
const writeFiledata = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./data.json', JSON.stringify(data), function (err, done) {
            if (err) {
                reject();
                console.log('write file data failed');
            }
            else {
                // const newDone = JSON.parse(done)
                resolve(done);
                console.log('write file data worked fine');
            }
        });
    });
};
// send data using promise
const getdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userData = yield readFiledata();
    res.send(userData);
});
const postdata = (req, res) => {
    // console.log('req', req.body);
    const data = {
        id: req.body.id,
        first_name: req.body.first_name,
        DOB: req.body.DOB,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        role: req.body.role,
        address: req.body.address
    };
    res.send(data);
};
// in patch firstly we are taking an id a params, and creating a var userData in which we are storing content of
// data.json file and we are comparing and req.param.id with the user id and updating the content
const patchdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.param('id');
    let userData = yield readFiledata();
    for (let i = 0; i < userData.length; i++) {
        const singleUser = userData[i];
        // console.log(singleUser.id);
        // console.log('id is:', id);
        // res.send(req.body)
        if (id == singleUser.id) {
            singleUser.id = req.body.id,
                singleUser.first_name = req.body.first_name,
                singleUser.DOB = req.body.DOB,
                singleUser.middle_name = req.body.middle_name,
                singleUser.last_name = req.body.last_name,
                singleUser.email = req.body.email,
                singleUser.phone_number = req.body.phone_number,
                singleUser.role = req.body.role,
                singleUser.address = req.body.address;
            res.send(userData);
            yield writeFiledata(userData);
        }
    }
});
const deletedata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // first we are reading the data and then after getting all the data in a variable we are using delete and
    // the value which we are passing in key is removing the data & in postman its showing null on that index
    const id = req.param('id');
    let userData = yield readFiledata();
    // res.send(userData[2])
    var key = id;
    delete userData[key];
    res.send(userData);
});
// get single user 
// we are passing an id in header and using that id to get the single user
const getsingleuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uID = req.param('id');
    // console.log(req.param('id'));
    let userData = yield readFiledata();
    res.send(userData[uID]);
});
exports.default = { getdata, postdata, patchdata, deletedata, getsingleuser };

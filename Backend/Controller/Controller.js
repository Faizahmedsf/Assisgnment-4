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
const dbconfig_1 = require("../Database/dbconfig");
const interface_1 = require("../interface/interface");
console.log(interface_1.name);
// global function for reading json file
const readFiledata = () => {
    return new Promise((resolve, reject) => {
        // in this we are running a simple select query and getting all the data which are presented in users table
        dbconfig_1.client.query('select * from users order by id ASC', (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result.rows);
            }
        });
    });
};
const getdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userData = yield readFiledata();
    res.send(userData);
});
const postdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = [
        req.body.id,
        req.body.first_name,
        req.body.DOB,
        req.body.middle_name,
        req.body.last_name,
        req.body.email,
        req.body.phone_number,
        req.body.role,
        req.body.address
    ];
    const temp = `insert into users (id , first_name , dob, middle_name, last_name, email, phone_number, role, address) Values($1 , $2, $3, $4, $5, $6, $7, $8, $9) `;
    dbconfig_1.client.query(temp, data);
    if (temp) {
        res.send('Data Added Successfully');
    }
    else {
        res.send('Failed');
    }
});
const patchdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uID = req.param('id');
    const data = [
        req.body.first_name,
        req.body.DOB,
        req.body.middle_name,
        req.body.last_name,
        req.body.email,
        req.body.phone_number,
        req.body.role,
        req.body.address,
        req.param('id')
    ];
    const temp = "UPDATE users SET first_name =$1 , dob = $2 , middle_name = $3 , last_name = $4 , email = $5, phone_number = $6,  role = $7 ,  address = $8  where id = $9  RETURNING * ";
    dbconfig_1.client.query(temp, data);
    if (temp) {
        res.send('Update Successfully');
    }
    else {
        res.send('Update failed');
    }
});
const deletedata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.param('id');
    res.send(id);
    const temp = 'DELETE from users where id = $1';
    yield dbconfig_1.client.query(temp, [id]);
});
// get single user 
// we are passing an id in header and using that id to get the single user
const getsingleuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uID = req.param('id');
    const t = yield dbconfig_1.client.query("select * from users where id = $1", [uID]);
    res.send(t.rows);
});
exports.default = { getdata, postdata, patchdata, deletedata, getsingleuser };

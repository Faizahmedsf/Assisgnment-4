"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//  const connect = () => {
exports.client = new pg_1.Client({
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    database: process.env.DB,
});
exports.client.connect();
exports.client.query('select * from users', (err, res) => {
    if (err) {
        console.log('err');
    }
    else {
        // console.log(res.rows);
        // return res
    }
    exports.client.end;
});
// }

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Controller_1 = __importDefault(require("../Controller/Controller"));
router.get('/getdata', Controller_1.default.getdata);
router.get('/getsingleuser/:id', Controller_1.default.getsingleuser);
router.post('/postdata', Controller_1.default.postdata);
router.patch('/patchdata/:id', Controller_1.default.patchdata);
router.delete('/deldata/:id', Controller_1.default.deletedata);
exports.default = router;

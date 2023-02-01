"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Router_js_1 = __importDefault(require("./Router/Router.js"));
const cors_1 = __importDefault(require("cors"));
// import bodyParser  from "body-parser"
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
// app.use(bodyParser.urlencoded({ extended:true }))
app.get('/', (req, res) => {
    res.send('lets run the game');
});
app.listen(port, () => {
    console.log(`[server]:  Server is running at http://localhost:${port}`);
});
app.use(Router_js_1.default);

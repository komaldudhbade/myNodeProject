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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mysql = require("mysql");
const path_1 = __importDefault(require("path"));
class App {
    constructor() {
        this.express = express();
        this.createConnection();
        this.mountRoutes();
    }
    createConnection() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'node_project_db'
        });
    }
    mountRoutes() {
        const routerDefaultRouter = express.Router();
        routerDefaultRouter.get('/', (req, res) => {
            res.status(200).sendFile(__dirname + "/public/index.html");
        });
        const apiRouter = express.Router();
        apiRouter.get('/', (req, res) => {
            res.status(200).json({ message: "api endpoint." });
        });
        apiRouter.get('/userList', (req, res) => {
            const userList = [
                { firstName: "nilesh", lastName: "nartam", location: "pune", profile: "S/W Engineer" },
                { firstName: "komal", lastName: "dudhbade", location: "pune", profile: "S/W Engineer" },
                { firstName: "kiran", lastName: "gawali", location: "nagpur", profile: "S/W Engineer" },
                { firstName: "raman", lastName: "chaturvedi", location: "pune", profile: "S/W Engineer" },
                { firstName: "swapnil", lastName: "shriwas", location: "amaravati", profile: "S/W Engineer" },
                { firstName: "viaks", lastName: "eakde", location: "pune", profile: "S/W Engineer" },
                { firstName: "swapnjeet", lastName: "mahure", location: "nagpur", profile: "S/W Engineer" }
            ];
            res.status(200).json(userList);
        });
        apiRouter.get('/userDb', (req, resp) => __awaiter(this, void 0, void 0, function* () {
            this.connection.query('select * from tbl_users', (err, rows, fields) => {
                resp.status(200).json(rows);
            });
        }));
        this.express.use(express.static(path_1.default.join(__dirname, '/public/')));
        this.express.use('/', routerDefaultRouter);
        this.express.use('/api', apiRouter);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map
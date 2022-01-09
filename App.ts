import express = require('express');
import mysql = require('mysql');
import path from 'path';

class App {
  public express;
  private connection: any;

  constructor () {
    this.express = express();
    this.createConnection();
    this.mountRoutes();
  }
  private createConnection(): void{
    this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'node_project_db'
    });
  }
  private mountRoutes (): void {
    const routerDefaultRouter = express.Router();
    routerDefaultRouter.get('/', (req, res) => {
        res.status(200).sendFile(__dirname+"/public/index.html");
    });

    const apiRouter = express.Router();
    apiRouter.get('/',(req, res)=>{
        res.status(200).json({message:"api endpoint."});
    });
    apiRouter.get('/userList', (req, res) => {
        const userList: any[] = [
            {firstName: "nilesh", lastName: "nartam", location: "pune", profile: "S/W Engineer"},
            {firstName: "komal", lastName: "dudhbade", location: "pune", profile: "S/W Engineer"},
            {firstName: "kiran", lastName: "gawali", location: "nagpur", profile: "S/W Engineer"},
            {firstName: "raman", lastName: "chaturvedi", location: "pune", profile: "S/W Engineer"},
            {firstName: "swapnil", lastName: "shriwas", location: "amaravati", profile: "S/W Engineer"},
            {firstName: "viaks", lastName: "eakde", location: "pune", profile: "S/W Engineer"},
            {firstName: "swapnjeet", lastName: "mahure", location: "nagpur", profile: "S/W Engineer"}
        ];
        res.status(200).json(userList);
    });

    apiRouter.get('/userDb',async (req, resp) => {
        this.connection.query('select * from tbl_users', (err: any, rows: any, fields: any) => {
            resp.status(200).json(rows);
        });
    });

    this.express.use(express.static(path.join(__dirname, '/public/')));   
    this.express.use('/', routerDefaultRouter);
    this.express.use('/api', apiRouter);
  }
}

export default new App().express;
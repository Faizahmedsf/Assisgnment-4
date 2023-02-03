import { Client } from "pg";
import dotenv from 'dotenv';
dotenv.config();

//  const connect = () => {


   export const client = new Client({
        host: process.env.HOST,
        user: process.env.USER,
        port: process.env.PORT as any,
        password: process.env.PASSWORD,
        database: process.env.DB,
    })



    client.connect();
    client.query('select * from users', (err, res) => {
        if (err) {
            console.log('err');
        }
        else {
            // console.log(res.rows);
            // return res
        }
        client.end;
    })


// }




import e, { Request, Response } from 'express';
import { QueryResult } from 'pg';
var http = require('http');
var fs = require('fs');
import { client } from '../Database/dbconfig'
import { name , User } from '../interface/interface';
console.log(name);

// global function for reading json file
const readFiledata = () => {
    return new Promise<User[]>((resolve, reject) => {

        // in this we are running a simple select query and getting all the data which are presented in users table
        client.query('select * from users order by id ASC', (err: Error, result) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(result.rows)
            }
        })
    })
}

const getdata = async (req: Request, res: Response) => {
    let userData:User[] = await readFiledata()
    res.send(userData)
}

const postdata = async (req: Request, res: Response) => {

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

    client.query(temp, data);

    if (temp) {
        res.send('Data Added Successfully')
    }
    else {
        res.send('Failed')
    }
}

const patchdata = async (req: Request, res: Response) => {
    let uID: any = req.param('id')

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
    ]

    const temp: any = "UPDATE users SET first_name =$1 , dob = $2 , middle_name = $3 , last_name = $4 , email = $5, phone_number = $6,  role = $7 ,  address = $8  where id = $9  RETURNING * ";

    client.query(temp, data)

    if (temp) {
        res.send('Update Successfully')
    } else {
        res.send('Update failed')
    }
}

const deletedata = async (req: Request, res: Response) => {

    const id:string = req.param('id');
    res.send(id);

    const temp = 'DELETE from users where id = $1'
    await client.query(temp , [id])
}

// get single user 
// we are passing an id in header and using that id to get the single user
const getsingleuser = async (req: Request, res: Response) => {
    let uID: string = req.param('id')
    const t = await client.query("select * from users where id = $1", [uID])
    res.send(t.rows)
}

export default { getdata, postdata, patchdata, deletedata, getsingleuser }
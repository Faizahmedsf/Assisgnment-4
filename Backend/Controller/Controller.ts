import e, { Request, Response } from 'express';
var http = require('http');
var fs = require('fs');

// global function for reading json file
const readFiledata = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data.json', 'utf8', (error: Error, data:any) => {
            if (error) {
                reject(error)
                return;
            }
            else {
                const mdata = JSON.parse(data);
                resolve(mdata);
                // resolve('data9')
            }
        })
    })
}

// global function for writing in json file
const writeFiledata = (data: any[]) => {

    return new Promise((resolve, reject) => {
        fs.writeFile('./data.json', JSON.stringify(data), function (err: Error, done:any) {
            if (err) {
                reject()
                console.log('write file data failed');
                
            }
            else {
                // const newDone = JSON.parse(done)
                resolve(done)
                console.log('write file data worked fine')
            }
        });
    })

}

// send data using promise

const getdata = async (req: Request, res: Response) => {
    let userData: any = await readFiledata()
    res.send(userData)
}

const postdata = (req: Request, res: Response) => {
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
}

// in patch firstly we are taking an id a params, and creating a var userData in which we are storing content of
// data.json file and we are comparing and req.param.id with the user id and updating the content
const patchdata = async (req: Request, res: Response) => {
    const id = req.param('id');
    let userData: any = await readFiledata()

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
                singleUser.address = req.body.address

            res.send(userData);
            await writeFiledata(userData)

        }


    }

}

const deletedata = async (req: Request, res: Response) => {

    // first we are reading the data and then after getting all the data in a variable we are using delete and
    // the value which we are passing in key is removing the data & in postman its showing null on that index

    const id = req.param('id');
    let userData: any = await readFiledata()
    // res.send(userData[2])

    var key: string = id
    delete userData[key]
    res.send(userData)

}

// get single user 
// we are passing an id in header and using that id to get the single user
const getsingleuser = async (req: Request, res: Response) => {
    let uID: string = req.param('id')
    // console.log(req.param('id'));
    let userData: any = await readFiledata()
    res.send(userData[uID])
}

export default { getdata, postdata, patchdata, deletedata, getsingleuser }
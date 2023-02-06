console.log('index.ts');

// read data from json file
// user model (interface , type ya class)
// decorator
// class table give only types
// data table 
// node typing 
// call reflect api

interface User {
    id: string,
    first_name: string,
    DOB: string,
    middle_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: string;
    address: string;
}

// enum for user roles
enum userRole {
    SuperAdmin = "SuperAdmin",
    Admin = "Admin",
    Subscriber = "Subscriber"
}


// fetching the data from data.json for user data
// const n = async () => {

const newp = fetch('http://localhost:8001/getdata', {
    method: 'GET'
}).then((response) => response.json())
    .then(data => { return data })
// }


const getjsondata = async () => {
    let userData = await newp;

    // we are creating a table instance and passing the data from .json file
    const newTable = new Table(userData);
    newTable.getdata(userData)

}


// calling the function on onclick event load data
function jsonformdata() {
    console.log('json form data() clicked');

    let loadtable = document.getElementById('loadtable') as HTMLDivElement
    loadtable.innerHTML = ''

    let loadData = document.getElementById('loadData') as HTMLButtonElement;
    loadData.innerText = 'Refresh Data';

    getjsondata();
}

// edit button functionality
const globaledit = <T extends string>(id: T, tableheader: User[]): void => {
    // const t = new Table(data.getdata());

    // we are extending string because id cant be assigned to string when we are using just <T>
    const editelem = document.getElementById(id) as any;
    if (editelem) {
        editelem.style.backgroundColor = '#E2C4B8';

        for (let i = 0; i < tableheader.length; i++) {
            editelem.querySelectorAll('.tcell')[i].setAttribute('contenteditable', 'true')
        }

        // lets toggle buttons
        for (let j = 0; j < editelem.querySelector('#savecleartd').children.length; j++) {
            if (editelem.querySelector('#savecleartd').children[j].style.display === 'none') {
                editelem.querySelector('#savecleartd').children[j].style.display = 'block'
            } else {
                editelem.querySelector('#savecleartd').children[j].style.display = 'none'
            }
        }
    }
}

// delete button functionality
const globaldelete = (id: string): void => {
    // console.log('delete button is clicked')
    // console.log(id)
    let delelem = document.getElementById(id) as HTMLElement
    delelem.remove()
}

// save button functionality
const globalsave = <T extends string>(id: T, tableheader: User[]) => {
    let saveelem = document.getElementById(id) as any;
    saveelem.style.backgroundColor = '#fff';

    for (let i = 0; i < tableheader.length; i++) {
        let getcell = saveelem.querySelectorAll('.tcell')[i]
        getcell.setAttribute('contenteditable', 'false')
    }

    // lets toggle buttons
    for (let j = 0; j < saveelem.querySelector('#savecleartd').children.length; j++) {
        // console.log(saveelem.querySelector('#savecleartd').children[j])
        if (saveelem.querySelector('#savecleartd').children[j].style.display === 'none') {
            saveelem.querySelector('#savecleartd').children[j].style.display = 'block'
        } else {
            saveelem.querySelector('#savecleartd').children[j].style.display = 'none'
        }
    }

}

// clear button functionality
const globalclear = (id: string, tableheader: User[], data: User[]): void => {
    console.log('global clear');

    let clearelem = document.getElementById(id) as any
    let clearelemindex = clearelem?.rowIndex;
    clearelem.style.backgroundColor = '#fff';

    for (let i = 0; i < data.length; i++) {

        for (let j = 0; j < tableheader.length; j++) {
            let content = data[clearelemindex - 1][tableheader[j]];
            clearelem.querySelectorAll('.tcell')[j].innerHTML = content;
            clearelem.querySelectorAll('.tcell')[j].setAttribute('contenteditable', 'false');
        }
    }

    // lets toggle buttons
    for (let j = 0; j < clearelem.querySelector('#savecleartd').children.length; j++) {
        console.log(clearelem.querySelector('#savecleartd').children[j])

        if (clearelem.querySelector('#savecleartd').children[j].style.display === 'none') {
            clearelem.querySelector('#savecleartd').children[j].style.display = 'block'
        } else {
            clearelem.querySelector('#savecleartd').children[j].style.display = 'none'

        }
    }
}

// function DatetimeFormatter() {
//     console.log('Decorator')
//     return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
//         const og = propertyDescriptor.get;
//         console.log('og', og)
//         let value: string
//         // console.log('propertyDescriptor', memberName);

//         propertyDescriptor.get = function () {
//             const result = og?.apply(this);
//             // console.log(`value:`, value);
//             console.log(`result we got :`, result);
//             value =
//                 result.slice(0, 2) +
//                 "-" +
//                 result.slice(3, 5) +
//                 "-" +
//                 result.slice(6, result.length);
//             return value
//         }
//         return propertyDescriptor;
//     }
// }

class Table {
    data: User[]
    constructor(data: User[]) {
        console.log('table')
        this.data = data
    }



    getdata(data: any[]): void {
        // console.log('data is', data);

        var tableheader: any[] = [];

        for (let i = 0; i < data.length; i++) {
            for (const key in data[i]) {
                // console.log(tableData[i])
                if (tableheader.indexOf(key) === -1) {
                    tableheader.push(key)
                }
            }
        }

        // creating a dynamic table
        let Createtable = document.createElement('table')
        Createtable.classList.add('table', 'container')
        document.getElementById('loadtable')?.append(Createtable)

        // creating a dynamic header for table
        let Createthead = document.createElement('thead')
        Createthead.classList.add('thead')

        // lets insert a row in header
        let theadtr = Createthead.insertRow(-1)
        for (let i = 0; i < tableheader.length; i++) {
            let theadrow = document.createElement('th')
            theadrow.setAttribute('id', 'theadrow-' + i)
            theadrow.append(tableheader[i])
            theadtr.append(theadrow)
            theadtr.setAttribute('id', 'theadtr-' + i)
        }

        let actionbtn = theadtr.insertCell(-1)
        actionbtn.innerText = 'Action'

        Createtable.append(Createthead)

        // creating a dynamic body for table
        let Createtbody = document.createElement('tbody')
        Createtbody.classList.add('tbody')
        Createtable.append(Createtbody)

        for (let i = 0; i < data.length; i++) {
            let tbodyrow = Createtbody.insertRow(0)
            Createtbody.append(tbodyrow)
            tbodyrow.setAttribute('id', 'tbodyrow-' + i)

            for (let j = 0; j < tableheader.length; j++) {
                let tablecell = tbodyrow.insertCell(-1)
                tablecell.innerText = data[i][tableheader[j]]
                // console.log(j)
                tablecell.classList.add('tcell');
            }

            // now lets create a edit button 
            let editButton = document.createElement('button')
            editButton.classList.add('edit-btn', 'btn-info')
            editButton.innerText = 'Edit'
            editButton.setAttribute('id', 'editBtn');

            let trid = 'tbodyrow-' + i;
            editButton?.addEventListener("click",
                function () { globaledit(trid, tableheader) })
            let editcell = tbodyrow.insertCell(-1)
            editcell.setAttribute('id', 'savecleartd')
            editcell.append(editButton)
            tbodyrow.append(editcell)

            //  delete button
            let deletebtn = document.createElement('button')
            deletebtn.classList.add("btn-danger", "delete-btn", 'ml-2');
            deletebtn.innerHTML = 'Delete';
            deletebtn.addEventListener("click",
                function () { globaldelete(trid) })

            deletebtn.setAttribute('id', 'deletebtn' + i)
            editcell.append(deletebtn)

            // save button
            let savebutton = document.createElement('button');
            savebutton.setAttribute('id', 'save-button-' + i);
            savebutton.innerText = 'Save';
            savebutton.classList.add('btn-primary', 'save');
            savebutton.addEventListener("click", function () { globalsave(trid, tableheader) })
            savebutton.style.display = 'none';

            // clear button
            let clearbutton = document.createElement('button');
            clearbutton.setAttribute('id', 'clear-button-' + i);
            clearbutton.innerText = 'Clear';
            clearbutton.classList.add('btn-info', 'clear', 'ml-2');
            clearbutton.addEventListener("click", function () { globalclear(trid, tableheader, data) })
            clearbutton.style.display = 'none';
            editcell.append(savebutton)
            editcell.append(clearbutton);
        }
    }

}

// form submission
let ab: any = {}
const getvalue = (val: Event): void => {
    console.log('val is', val)
    const { name, value } = val.target as HTMLInputElement
    console.log({ ...ab, [name]: value })
    ab[name] = value;
}

const createUser = async (e: Event) => {
    e.preventDefault()
    console.log('ab', ab)
    // localStorage.setItem('ab', JSON.stringify(ab))
    // window.location.href = 'index.html';
    const res = await fetch('http://localhost:8001/postdata' , {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ab)
    })
}

// create a  tableheader
const newtableheader = <T extends User>(hData: T[]): object | any => {
    let tableheader: string[] = []
    for (let i = 0; i < hData.length; i++) {
        for (const key in hData[i]) {
            if (tableheader.indexOf(key) === -1) {
                tableheader.push(key)
            }
        }
    }

    console.log('typeof tableheader', typeof tableheader);
    return tableheader
}



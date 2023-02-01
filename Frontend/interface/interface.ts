// export class User2 { 
//     constructor(
//         id: string,
//         first_name: string,
//         DOB: string,
//         middle_name: string,
//         last_name: string,
//         email: string,
//         phone_number: string,
//         role: string,
//         address: string
//     )
//     {}
// }

export enum userRole2 {
    SuperAdmin = "SuperAdmin",
    Admin = "Admin",
    Subscriber = "Subscriber"
}


interface User2{
            id: string,
            first_name: string,
            DOB: string,
            middle_name: string,
            last_name: string,
            email: string,
            phone_number: string,
            role: string,
            address: string
}


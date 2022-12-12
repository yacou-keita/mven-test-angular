export interface Response {
    status:string,
    results:number,
    data:any
}

export interface Client {
    _id:string,
    name:string,
    email:string,
    phone:string,
    providers?:Provider[]
}

export interface Provider {
    _id:string,
    name:string,
}

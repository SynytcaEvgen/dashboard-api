import e from "express";

let a = 5;

let b: number = 5;

let c = 'string';


let d = a + c;


const userName: Array<string> = ['sdsdsd', 'dssdsd', 'dsdsdsd'];

const tup: [number, string] = [3, 'sdsdsd'];

const er: any = 2323; // not recomendet


function getSomeOne(name: string): string { 
    return name + 'mudack'
}

function coord(coor: { lat: number, long: number }) {
    return coor;
}

// Union type

let universalId: number | string = 5;

function printId(id: number | string) {
    if (typeof id == 'string') {
        console.log(id.toUpperCase);
    } else { 
        console.log(id + 33); 
    }
};

function helloUser(user: string | string[]) { 
    if (Array.isArray(user)) {
        console.log(user.join('---'));
    } else { 
        console.log( user + 'Hi!')
    }
}

// types and interface 

type coord = {
    lat: number,
    long: number,
};

interface Icoord {
    lat: number;
    long: number;
}

function compute(cord: coord): string {  
    return 'eee'
}

interface Animal {
    name: string;
}

interface Dog extends Animal { 
    tail: boolean;
}

const someDog: Dog = {
    name: 'dfdfdf',
    tail: false
}

type Bird = {
    name: string;
    canFly: boolean;
}

type Duck = Bird & {
    canSwim: boolean;
}
const duch: Duck = {
    name: 'sdsdsd',
    canFly: false,
    canSwim: true,
}


//Generics

// function log(obj: string): string { 
//     console.log(obj);
//     return obj;
// }
function log<T>(obj: T): T { // <T> any char or sen
    console.log(obj);
    return obj;
}
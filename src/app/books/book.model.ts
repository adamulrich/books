import { ObjectId } from "mongodb";


export class Book { 

    constructor(
        public id: Number, 
        public title: string ="",
        public subTitle: string ="",
        public year: Number,
        public imageUrl: string ="",
        public author: string ="",
    )
    { }
}


import { ObjectId } from "mongodb";
import { Author } from "../authors/author.model";


export class Book { 

    constructor(
        public id: Number, 
        public title: string ="",
        public subTitle: string ="",
        public series: string = "",
        public year: Number,
        public imageUrl: string ="",
        public author: Author = {
            name: "",
            id: 0,
            imageUrl: "",
            bioUrl: ""

        },
    )
    { }
}


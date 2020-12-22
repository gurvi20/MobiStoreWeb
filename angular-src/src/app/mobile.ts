
import { Component, OnInit } from '@angular/core';

export class Mobile {
    _id: string;
    name : string;
	brand: string;
    imgpath: string;
    colors: string[];
    releasedDate: Date;
    rating: number;
    reviews: [{
        author: string,
        rating: number,
        reviewText: string,
        createdOn: Date
    }];
    features: string[]
}

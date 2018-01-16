// @flow

export type Product = {
    id: number;
    name: string;
    price: string;
    likes: number;
    image: string; // TODO: change this into object to contain meta data on the image
    description: string;
};
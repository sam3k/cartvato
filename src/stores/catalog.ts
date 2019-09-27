import {observable} from 'mobx';

export enum ITEM {
  clothing = 'clothing',
  kitchen = 'kitchen',
  appliances = 'appliances',
}

export interface CatalogItem {
  id: number;
  name: string;
  description: string;
  image: string;
  type: string;
  price: number;
}

export interface ICatalog {
  list: CatalogItem[];
}

export default class CatalogStore implements ICatalog {
  @observable
  public list:CatalogItem[] = [
    {
      id: 3,
      name: 'Samsung TV',
      description: 'TV Blah blah blah',
      image: '/images/1.jpg',
      type: ITEM.appliances,
      price: 1000,
    },
    {
      id: 1,
      name: 'Boots',
      description: 'Lorem ipsum blah blah blah',
      image: '/images/3.jpg',
      type: ITEM.clothing,
      price: 49.99,
    },
    {
      id: 2,
      name: 'Coffee Machine',
      description: 'Blah blah blah',
      image: '/images/2.jpg',
      type: ITEM.kitchen,
      price: 39.99,
    },
  ];
}
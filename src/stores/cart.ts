import {observable, runInAction, action, computed} from 'mobx';
import { CatalogItem } from './catalog';

interface IResponse {
  success: boolean;
  message: string;
}

export interface CartItem extends CatalogItem {
  quantity: number;
}

interface CartItems {
  [key: string]: any;
}

export interface ICart {
  items?: CartItems;
  loading: boolean;
  error: string;
  discount: number;
  total: () => number;
  add: (item: CartItem) => Promise<IResponse>;
  remove: (id:number) => Promise<IResponse>;
  setDiscount: (id:number) => void;
}

export default class CartStore {
  @observable
  public loading: boolean = false;

  @observable
  public error: string = '';

  @observable
  public items:any = {};

  @observable
  public discount:number = 0;

  @action
  public async remove(id:number) {
    const errMessage = 'Could not delete item';

    this.loading = true;

    try {
      runInAction(() => {
        delete this.items[id.toString()];
      });

      return {
        success: true,
        message: 'Item removed from cart!'
      }
    } catch (e) {
      runInAction(() => {
        this.error = errMessage;
      });

      return {
        success: false,
        message: errMessage,
      }
    }
  }

  @computed 
  get total() {
    const keys = Object.keys(this.items);
    const preTotal = keys.length > 0 ?
      keys
        .map((i) => this.items[i].price)
        .reduce((prev, next) => prev + next)
      : 0;

    const totalValue = this.discount > 0 ?
      ( preTotal - ((preTotal / 100)  * this.discount) ).toFixed(2) :
      preTotal;

    return totalValue;
  }

  @action
  public setDiscount(percentage:number) {
    this.discount = percentage;
  }

  @action
  public async add(item: CartItem, quantity:number = 1) {
    const errMessage = 'Oops! Something went wrong. =(';

    this.loading = true;

    try {
      if (!this.items || !this.items[item.id.toString()]) {

        runInAction(() => {
          this.items[item.id.toString()] = {
            quantity,
            ...item
          };
        });

        return {
          success: true,
          message: 'Item added to cart!'
        }
      } else {
        return {
          success: true,
          message: 'Item already in the cart!'
        }
      }
    } catch (e) {
      runInAction(() => {
        this.error = errMessage;
      });

      return {
        success: false,
        message: errMessage,
      }
    }
  }
}
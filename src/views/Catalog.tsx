import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { ICatalog, CatalogItem } from '../stores/catalog';
import { Button, Intent } from '@blueprintjs/core';
import { ICart, CartItem } from '../stores/cart';
import { AppToaster } from '../utils/toaster';
import SelectSort from '../components/SelectSort';

interface IProps {
  catalogStore: ICatalog;
  cartStore: ICart;
}

interface IState {
  sortBy: string;
}

@inject('catalogStore', 'cartStore')
@observer
export default class CatalogView extends Component<IProps, IState> {

  public state:IState = {
    sortBy: 'Name'
  }

  private showAlert = (message:string, intent:Intent = Intent.PRIMARY) => {
    AppToaster.show({ 
      message,
      intent
    });
  }

  private async addToCart(item: CartItem) {
    const { cartStore } = this.props;
    const res = await cartStore!.add(item);
    const intent = res.success ? Intent.SUCCESS : Intent.DANGER;

    this.showAlert(res.message, intent);
  }

  private onClickItem = (item: CartItem) => {
    this.addToCart(item);
  }

  private onSortSelected = (value:any) => {
    this.setState({
      sortBy: value.query,
    });
  }

  public render() {
    const { catalogStore, cartStore } = this.props;
    const { sortBy } = this.state;

    const sortedList = sortBy === 'Price' ? 
      catalogStore!
        .list
        .slice()
        // @ts-ignore
        .sort((a:CatalogItem, b:CatalogItem) => a[sortBy.toLowerCase()] - b[sortBy.toLowerCase()]) :
      catalogStore!.list.slice().sort((a:any, b:any) => {
        return a[sortBy.toLowerCase()].localeCompare(b[sortBy.toLowerCase()]);
      });
      

    return (
      <div className="page page-catalog">

        <SelectSort
          sortBy={sortBy}
          onItemSelect={this.onSortSelected}
        />
        
        <ul className="view-grid">
          {sortedList.map((item) => {
              const inCart = cartStore!.items && cartStore!.items[item.id];

              return (
                <li key={item.id}>
                  <img src={item.image} />
                  <h3>{item.name}</h3>
                  <p><strong>Price:</strong> ${item.price}</p>
                  <Button 
                    disabled={inCart}
                    icon="shopping-cart" 
                    intent={inCart ? Intent.NONE : Intent.SUCCESS} 
                    text={inCart ? 'Added to cart' : 'Add to Cart'} 
                    onClick={() => this.onClickItem(item as CartItem) }
                  />
                </li>
              )
            }
          )}
        </ul>
      </div>
    )
  }
}
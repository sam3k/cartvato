import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Intent, MenuItem } from '@blueprintjs/core';
import { ICart, CartItem } from '../stores/cart';
import { AppToaster } from '../utils/toaster';
import { Select } from '@blueprintjs/select';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import SelectSort from '../components/SelectSort';
import { CatalogItem } from '../stores/catalog';

interface IProps extends RouteComponentProps {
  cartStore?: ICart;
}

interface IState {
  total: number;
  sortBy: string;
  applyDiscount: boolean;
}

@inject('cartStore')
@observer
class Checkout extends Component<IProps> {
  
  public state:IState = {
    total: 0,
    sortBy: 'Name',
    applyDiscount: false,
  }

  private showAlert = (message:string, intent:Intent = Intent.PRIMARY) => {
    AppToaster.show({ 
      message,
      intent
    });
  }

  private async deleteItem(id: number) {
    const { cartStore } = this.props;
    const res = await cartStore!.remove(id);
    const intent = res.success ? Intent.SUCCESS : Intent.DANGER;

    this.showAlert(res.message, intent);
  }

  private onDeleteItem = (id: number) => {
    this.deleteItem(id);
  }

  private renderQtyOption = (item:number) => {
    return (
      <MenuItem
        //active={modifiers.active}
        //disabled={modifiers.disabled}
        key={item}
        onClick={() => {}}
        text={item}
      />
    );
  }

  private renderRow(item: CartItem) {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td className="center-cell">${item.price}</td>
        <td className="center-cell">
          <Button 
            icon="trash" 
            intent={Intent.DANGER} 
            small={true}
            onClick={() => this.onDeleteItem(item.id)}
          />
        </td>
      </tr>
    );
  }

  private onSortSelected = (value:any) => {
    const { cartStore } = this.props;

    this.setState({
      sortBy: value.query,
    });

    cartStore!.setDiscount(value.query === 'Name' ? 0 : 10);
  }

  public render() {
    const { cartStore } = this.props;
    const { total, sortBy, applyDiscount } = this.state;
    
    const sortedList = sortBy === 'Price' ?
        Object
          .keys(cartStore!.items!)
          .sort((a:string, b:string) => cartStore!.items![a][sortBy.toLowerCase()] - cartStore!.items![b][sortBy.toLowerCase()]) :
        Object
          .keys(cartStore!.items!)
          .sort((a:string, b:string) => {
            return cartStore!.items![a][sortBy.toLowerCase()].localeCompare(cartStore!.items![b][sortBy.toLowerCase()]);
          });

    return (
      <div className="page page-checkout">
        <h1>Checkout</h1>

        <SelectSort
          sortBy={sortBy}
          onItemSelect={this.onSortSelected}
        />

        <table className="bp3-html-table bp3-html-table-striped checkout-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Description</th>
              <th className="center-cell">Price</th>
              <th className="center-cell">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartStore!.items && sortedList.map((item) => {
              return this.renderRow(cartStore!.items![item]);
            })}
          </tbody>
          <tfoot>
            {cartStore!.discount > 0 && (
              <tr>
                <td colSpan={3} className="checkout-discount-text">Discount</td>
                <td className="checkout-discount-price">{cartStore!.discount}%</td>
              </tr>
            )}
            {cartStore!.total ? (
              <tr className="checkout-total">
                <td colSpan={3} className="checkout-total-text">Total</td>
                <td className="checkout-total-price">${cartStore!.total}</td>
              </tr>
            ) : <></>}
          </tfoot>
        </table>

        {cartStore!.items && Object.keys(cartStore!.items).length === 0 ? (
          <div className="empty-cart-note">Cart is empty</div>
        ) : (
          <Button 
            intent={Intent.SUCCESS} 
            text={'Complete Purchase'} 
            onClick={() => this.props.history.push('/success') }
          />
        )}
      </div>
    );
  }
}

export default withRouter(Checkout);
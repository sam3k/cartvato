import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from '@blueprintjs/core';
import { ICart } from '../stores/cart';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { isEmpty } from 'lodash';


interface IProps extends RouteComponentProps {
  cartStore?: ICart;
}


@inject('cartStore')
@observer
class Header extends Component<IProps> {

  public onCheckout = () => {
    this.props.history.push('/checkout');
  }

  public render() {
    const { cartStore } = this.props;
    const emptyCart = isEmpty(cartStore!.items);

    return (
      <header>
        <div className="justify-left">
          <ul>
            <li><Link to="/">Home</Link></li>
          </ul>
        </div>
        <div className="justify-center">
          <h2>Cartvato</h2>
        </div>
        <div className="justify-right">
          <Button 
            disabled={emptyCart}
            icon="shopping-cart" 
            intent="success" 
            text={emptyCart ? 'Empty Cart' : 'Checkout'}
            small={true}
            onClick={this.onCheckout}
          />
        </div> 
      </header>
    );
  }
}

export default withRouter(Header);
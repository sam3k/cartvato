import React, {Component} from 'react';
import { Provider } from 'mobx-react';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/table/lib/css/table.css';
import './App.css';
import { Router, Route } from "react-router-dom";
import history from './utils/history';
import CatalogView from './views/Catalog';
import CheckoutView from './views/Checkout';
import SuccessView from './views/SuccessView';
import CartStore from './stores/cart';
import CatalogStore from './stores/catalog';
import Header from './components/Header';

export class App extends Component {
  private catalogStore = new CatalogStore();
  private cartStore = new CartStore();

  render() {
    return (
      <Provider
        cartStore={this.cartStore}
        catalogStore={this.catalogStore}
      >
        <div className="app">
          <Router history={history}>
            <div>
              <Header />

              <main>
                <Route exact path="/" component={CatalogView} />
                <Route path="/checkout" component={CheckoutView} />
                <Route path="/success" component={SuccessView} />
              </main>

            </div>
          </Router>
        </div>
      </Provider>
    )
  }
}

export default App;

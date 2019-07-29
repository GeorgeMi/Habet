import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router'

import { Home } from "./Components/PageHome";
import { Contact } from './Components/PageContact';
import { Footer } from "./Components/Footer";
import { NotFound } from "./Components/PageNotFound";
import { Product } from "./Components/PageProduct";
import { Checkout } from "./Components/PageCheckout";
import { Search } from "./Components/PageSearch";
import { Cart } from "./Components/PageCart";
import { Register } from "./Components/PageRegister";
import { CookiePolicy } from "./Components/PageCookiePolicy";


class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/item/:id" component={Product} />
                        <Route exact path="/contact" component={Contact} />
                        <Route exact path="/checkout" component={Checkout} />
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/cookie_policy" component={CookiePolicy} />
                        <Route component={NotFound} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
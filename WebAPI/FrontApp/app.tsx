import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

import { Home } from "./Components/PageHome";
import { Contact } from './Components/PageContact';
import { Footer } from "./Components/Footer";
import { NotFound } from "./Components/PageNotFound";
import { Product } from "./Components/PageProduct";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/product" component={Product} />
                        <Route exact path="/contact" component={Contact} />
                        <Route component={NotFound} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
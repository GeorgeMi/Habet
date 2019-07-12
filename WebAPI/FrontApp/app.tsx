import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

import { Home } from "./Components/PageHome";
import { Contact } from './Components/PageContact';
import { Header } from './Components/Header';
import { Footer } from "./Components/Footer";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/contact" component={Contact} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
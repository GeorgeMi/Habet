declare var require: any

import { Header } from './Header'
import { Intro } from "./Intro";
import { Main } from "./Main";
import { Footer } from "./Footer";

var React = require('react');

export class Layout extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Intro />
                <Main />
                <Footer />
            </div>
        );

    }
}
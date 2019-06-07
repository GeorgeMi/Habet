declare var require: any
import { Footer } from "./Footer";
import { Header } from './Header'

var React = require('react');

export class Layout extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <h1>Welcome</h1>
                <Footer />
            </div>
        );

    }
}
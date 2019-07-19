import * as React from 'react';
import { KeyedCollection } from './Dictionary';
import { HashLink as Link } from 'react-router-hash-link';

export class Header extends React.Component<any, any> {
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        dictionary.Add(props.Active, 'cta cta-colored');

        this.state = {headerDictionary: dictionary };
    }

    render() {
        const { headerDictionary } = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                        <a className="navbar-brand" href="index.html">GabrielHabet</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="oi oi-menu"></span> Menu
	                    </button>
                        <div className="collapse navbar-collapse" id="ftco-nav">
                            <ul className="navbar-nav ml-auto">
                                <li className={"nav-item " + headerDictionary.Item('Home')}><a href="/" className="nav-link">Home</a></li>
                                <li className="nav-item dropdown">
                                    <Link className={"nav-link dropdown-toggle "+ headerDictionary.Item('Women')} to="#Women-section" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Women</Link>
                                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                                        <Link className="dropdown-item" to="#Women-Bags-section">Bags</Link>
                                        <Link className="dropdown-item" to="#Women-Belts-section">Belts</Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className={"nav-link dropdown-toggle "+ headerDictionary.Item('Men')} to="#Men-section" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Men</Link>
                                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                                        <Link className="dropdown-item" to="#Men-Bags-section">Bags</Link>
                                        <Link className="dropdown-item" to="#Men-Belts-section">Belts</Link>
                                    </div>
                                </li>
                                <li className={"nav-item " + headerDictionary.Item('Search') }><a href="/#/search" className="nav-link">Search</a></li>
                                <li className={"nav-item " + headerDictionary.Item('Contact') }><a href="/#/contact" className="nav-link">Contact</a></li>
                                <li className={"nav-item " + headerDictionary.Item('Cart')}><a href="/#/cart" className="nav-link"><span className="icon-shopping_cart"></span>[0]</a></li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
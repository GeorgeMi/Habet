import * as React from 'react';
import { KeyedCollection } from './Dictionary';
import { HashLink as Link } from 'react-router-hash-link';

export class Header extends React.Component<any, any> {
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        dictionary.Add(props.Active, 'menu-active');

        this.state = {headerDictionary: dictionary };
    }

    render() {
        const { headerDictionary } = this.state;
        return (
            <header id="header">
                <div className="container-fluid">
                    <div id="logo" className="pull-left">
                        <h1><a href="/#/" className="scrollto">GabrielHabet</a></h1>
                        
                        <a href="/#/"><img src="img/logo.png" alt="" title="" /></a>
            </div>

                    <nav id="nav-menu-container">
                        <ul className="nav-menu">
                            <li className={headerDictionary.Item('Home')}><a href="#">Home</a></li>
                            <li className={headerDictionary.Item('Women')}>
                                <Link to="#Women-section">Women</Link>
                                <ul>
                                    <li><Link to="#Women-Bags-section">Bags</Link></li>
                                    <li><Link to="#Women-Belts-section">Belts</Link></li>
                                </ul>
                            </li>
                            <li className={headerDictionary.Item('Men')}>
                                <Link to="#Men-section">Men</Link>
                                <ul>
                                    <li><Link to="#Men-Bags-section">Bags</Link></li>
                                    <li><Link to="#Men-Belts-section">Belts</Link></li>
                                </ul>
                            </li>
                           
                            <li className={headerDictionary.Item('Contact')}><a href="/#/contact">Contact</a></li>
                        </ul>
                    </nav>
        </div>
            </header>
        );
    }
}
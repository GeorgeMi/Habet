import * as React from 'react';
import { KeyedCollection } from './Dictionary';

export class Header extends React.Component<any, any> {
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        dictionary.Add(props.Active, 'menu-active');
        console.log(dictionary);

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
                            <li className={headerDictionary.Item('Home')}><a href="/#/">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#portfolio">Portfolio</a></li>
                            <li><a href="#team">Team</a></li>
                            <li className="menu-has-children">
                                <a href="">Drop Down</a>
                                <ul>
                                    <li><a href="#">Drop Down 1</a></li>
                                    <li><a href="#">Drop Down 3</a></li>
                                    <li><a href="#">Drop Down 4</a></li>
                                    <li><a href="#">Drop Down 5</a></li>
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
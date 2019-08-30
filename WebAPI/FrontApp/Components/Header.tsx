import * as React from 'react';
import { KeyedCollection } from './Dictionary';
import { HashLink as Link } from 'react-router-hash-link';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');

export class Header extends React.Component<any, any> {
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        dictionary.Add(props.Active, 'cta cta-colored');

        this.state = { email: '', password: '', api_response: '', loggedIn: false, headerDictionary: dictionary };

        if (read_cookie('token') != null && read_cookie('token').length !== 0) {
            this.checkIfTokenIsValid();
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkIfTokenIsValid = this.checkIfTokenIsValid.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post(API_Path + '/Auth', {
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => {
                this.setState({ email: '', password: '', api_response: response.data, loggedIn: true });
                delete_cookie('token');
                bake_cookie('token', response.data.token);
            })
            .catch((error) => {
                this.setState({ error});
                NotificationManager.error('Invalid email or password.');
            })
            .then();
    }

    checkIfTokenIsValid() {
        axios.post(API_Path + '/AuthToken', {
            token: read_cookie('token')
        })
            .then((response) => {
                this.setState({ loggedIn: true, api_response: response.data });
            })
            .catch((error) => {     
                delete_cookie('token');
            })
            .then(
            );
    }

    signOut() {
        delete_cookie('token');
        window.location.reload();
    }

    render() {
        var { headerDictionary, loggedIn, api_response } = this.state;
        var cartItemNumber = read_cookie('cartProducts').count;

        return (
            <div>

                <NotificationContainer />

                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                        <a className="navbar-brand" href="/#/">GabrielHabet</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="oi oi-menu"></span> Menu
	                    </button>
                        <div className="collapse navbar-collapse" id="ftco-nav">
                            <ul className="navbar-nav ml-auto">
                                <li className={"nav-item " + headerDictionary.Item('Home')}><a href="/" className="nav-link">Home</a></li>
                                <li className={"nav-item dropdown " + headerDictionary.Item('Women')}>
                                    <Link className="nav-link dropdown-toggle" to="#Women-section" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Women</Link>
                                    <div className="dropdown-content" aria-labelledby="dropdown04">
                                        <Link className="dropdown-item" to="#Women-Bags-section">Bags</Link>
                                        <Link className="dropdown-item" to="#Women-Belts-section">Belts</Link>
                                    </div>
                                </li>
                                <li className={"nav-item dropdown " + headerDictionary.Item('Men')}>
                                    <Link className="nav-link dropdown-toggle" to="#Men-section" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Men</Link>
                                    <div className="dropdown-content" aria-labelledby="dropdown04">
                                        <Link className="dropdown-item" to="#Men-Bags-section">Bags</Link>
                                        <Link className="dropdown-item" to="#Men-Belts-section">Belts</Link>
                                    </div>
                                </li>
                                <li className={"nav-item " + headerDictionary.Item('Search')}><a href="/#/search" className="nav-link">Search</a></li>
                                <li className={"nav-item " + headerDictionary.Item('Contact')}><a href="/#/contact" className="nav-link">Contact</a></li>

                                {
                                    loggedIn ?
                                        <li className={"nav-item " + headerDictionary.Item('Cart')}><a href="/#/cart" className="nav-link"><span className="icon-shopping_cart"></span>{cartItemNumber}</a></li>
                                        :
                                        <li className="dropdown nav-item">
                                            <div id="dropdownMenu" data-toggle="dropdown" className="nav-link dropdown">Login <span className="caret"></span></div>
                                            <ul className="dropdown-content dropdown-menu-right">
                                                <li className="login-dropdown-content px-3 py-2">
                                                    <form action="" className="form" role="form" onSubmit={this.handleSubmit}>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control form-control-sm" placeholder="Email" value={this.state.email} onChange={this.handleChange} name="email" id="emailInput" required />
                                                        </div>
                                                        <div className="form-group">
                                                            <input id="passwordInput" placeholder="Password" value={this.state.password} onChange={this.handleChange} className="form-control form-control-sm" type="password" name="password" required />
                                                        </div>

                                                        <div className="form-group">
                                                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                                                        </div>
                                                        <div className="form-group text-center">
                                                            <small><a href="/#/recover_password">Forgot password?</a></small>
                                                            <small><a href="/#/register">Create account</a></small>
                                                        </div>
                                                    </form>
                                                </li>
                                            </ul>
                                        </li>
                                }
                                {
                                    loggedIn ?
                                        <li className={"nav-item dropdown " + headerDictionary.Item('Account')}>
                                            <div id="dropdownMenu" data-toggle="dropdown" className="nav-link dropdown">Account<span className="caret"></span></div>
                                            <div className="dropdown-content" aria-labelledby="dropdown04">
                                                <Link className="dropdown-item" to="/user_details">Edit details</Link>
                                                <Link className="dropdown-item" to="/change_password">Change password</Link>
                                                {
                                                    api_response.role == 'admin' ?                                                       
                                                        <Link className="dropdown-item" to="/add_product">Add product</Link>
                                                        :
                                                        <div></div>
                                                }
                                                <a href="/#/" onClick={this.signOut}>SignOut</a>
                                            </div>
                                        </li>
                                        :
                                        <div></div>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );      
    }
}
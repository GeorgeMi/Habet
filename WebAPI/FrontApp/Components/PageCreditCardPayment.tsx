import * as React from 'react';
import { Header } from './Header';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'react-credit-cards/es/styles-compiled.css'
import { Redirect } from 'react-router-dom'
import * as Translate from 'react-translate-component';
import en from './languages/en';
import it from './languages/it';
import ro from './languages/ro';

import Cards from 'react-credit-cards';
import Payment from 'payment';


var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');
var counterpart = require('counterpart');

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('ro', ro);
counterpart.registerTranslations('it', it);

function clearNumber(value = '') {
    return value.replace(/\D+/g, '');
}

export function formatCreditCardNumber(value) {
    if (!value) {
        return value;
    }

    const clearValue = clearNumber(value);
    let nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
    return nextValue.trim();
}

export function formatCVC(value) {
    const clearValue = clearNumber(value);
    let maxLength = 4;

    return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
    const clearValue = clearNumber(value);

    if (clearValue.length >= 3) {
        return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }

    return clearValue;
}

export class CreditCardPayment extends React.Component<any, any> {
    constructor(props) {
        super(props);

        counterpart.setLocale(read_cookie('lang'));
        this.state = {
            error: null,
            waitingResponse: false,
            isChanged: false,
            language: read_cookie('lang'),
            currency: read_cookie('currency'),
            cvc: '',
            expiry: '',
            focused: '',
            name: '',
            number: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ isChanged: true });
    }

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name,
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
    };

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.waitingResponse == false) {
            this.setState({ waitingResponse: true });
        }

        axios.post(API_Path + '/Orders', {
            userDetails: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                state: this.state.state,
                city: this.state.city,
                streetAddress: this.state.streetAddress,
                zipCode: this.state.zipCode,
                phone: this.state.phone
            },
            cartProducts: this.state.cartProducts,
            paymentMethod: this.state.paymentMethod,
        }, {
            headers: {
                token: read_cookie('token') //the token is a variable which holds the token
            }
        })
            .then((response) => {
                NotificationManager.success(response.data.message);
            })
            .catch((error) => {
                NotificationManager.error("Request failed. Please, try again later.");
            })
            .then(() => {
                this.setState({ waitingResponse: false });
            }
            );
    }


    public reloadPage() {
        //do nothing
    }


    render() {
        return (
            <main id="main">
                <div id="PaymentForm">>
                    <Header reloadPage={this.reloadPage} />

                    <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                        <div className="container">
                            <div className="row no-gutters slider-text align-items-center justify-content-center">
                                <Cards
                                    cvc={this.state.cvc}
                                    expiry={this.state.expiry}
                                    focused={this.state.focused}
                                    name={this.state.name}
                                    number={this.state.number}
                                />
                            </div>
                        </div>
                    </div>

                    <section className="ftco-section">
                        <div className="container">                             
                                <div className="row justify-content-center">
                                    <div className="col-xl-10">
                                    <form action="" className="billing-form" onSubmit={this.handleSubmit}>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        type="tel"
                                                        name="number"
                                                        className="form-control"
                                                        placeholder="Card Number"
                                                        required
                                                        onChange={this.handleInputChange}
                                                        onFocus={this.handleInputFocus}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="form-control"
                                                        placeholder="Name"
                                                        required
                                                        onChange={this.handleInputChange}
                                                        onFocus={this.handleInputFocus}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="tel"
                                                        name="expiry"
                                                        className="form-control"
                                                        placeholder="Valid Thru"
                                                        required
                                                        onChange={this.handleInputChange}
                                                        onFocus={this.handleInputFocus}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="tel"
                                                        name="cvc"
                                                        className="form-control"
                                                        placeholder="CVC"
                                                        required
                                                        onChange={this.handleInputChange}
                                                        onFocus={this.handleInputFocus}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <button className="btn btn-primary btn-block">PAY</button>
                                                </div>
                                        </div>                                     
                                        </form>
                                    </div>
                                </div>
                            </div>
                    </section>
                </div>
            </main>
        );
    }
}


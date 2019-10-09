import * as React from 'react';
import { Header } from './Header';
import { read_cookie } from 'sfcookies'
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Redirect } from 'react-router-dom'
import * as Translate from 'react-translate-component';
import en from './languages/en';
import it from './languages/it';
import ro from './languages/ro';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');
var counterpart = require('counterpart');

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('ro', ro);
counterpart.registerTranslations('it', it);

export class Order extends React.Component<any, any> {
    constructor(props) {
        super(props);

        counterpart.setLocale(read_cookie('lang'));
        this.state = {
            isLoaded: false,
            error: null,
            subtotal: '',
            total: '',
            delivery: '',
            cartProducts: '',
            paymentMethod: '',
            firstName: '',
            lastName: '',
            state: '',
            city: '',
            streetAddress: '',
            zipCode: '',
            phone: '',
            email: '',
            waitingResponse: false,
            isChanged: false,
            language: read_cookie('lang'),
            currency: read_cookie('currency')
        };

        this.reloadPage = this.reloadPage.bind(this);
    }

    componentWillMount() {
        if (read_cookie('token') != null && read_cookie('token').length !== 0) {
            axios.get(API_Path + '/Users',
                {
                    headers: {
                        token: read_cookie('token') //the token is a variable which holds the token
                    }
                })
                .then((response) => {
                    var user_details = response.data.data[0];
                    this.setState({
                        isLoaded: true,
                        firstName: user_details.FirstName,
                        lastName: user_details.LastName,
                        state: user_details.State,
                        city: user_details.City,
                        streetAddress: user_details.StreetAddress,
                        zipCode: user_details.ZipCode,
                        phone: user_details.Phone,
                        email: user_details.Email,
                        items: response.data.data
                    });
                })
                .catch((error) => {
                    this.setState({ isLoaded: true, error });
                })
                .then();
        }
    }

    public reloadPage() {
        //do nothing
    }

    render() {
        const { error, isLoaded, waitingResponse, currency, items } = this.state;
        var currencyBeforeSign = '€';
        var currencyAfterSign = '';
        if (currency == 'lei') { currencyBeforeSign = ''; currencyAfterSign = 'lei' }
        else if (currency == 'pounds') { currencyBeforeSign = '₤'; currencyAfterSign = '' }

        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <main id="main">
                    {waitingResponse ? <div className="loading">Loading&#8230;</div> : <div></div>}

                    <div>
                        <Header reloadPage={this.reloadPage} />

                        <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                            <div className="row justify-content-center mb-3 pb-3">
                                <div className="col-md-12 heading-section text-center">
                                    <h1 className="mb-4"><Translate content='checkout.Checkout' /></h1>
                                </div>
                            </div>
                        </div>
                        <div className="loading">Loading&#8230;</div>;
                </div>
                </main>
            );
        } else {
            if (read_cookie('token') == null || read_cookie('token').length == 0) {
                return <Redirect to='/#/' />;
            }

            return (
                <main id="main">
                    <div>
                        <Header reloadPage={this.reloadPage} />

                        <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                            <div className="container">
                                <div className="row no-gutters slider-text align-items-center justify-content-center">
                                    <div className="col-md-9 text-center">
                                        <h1 className="mb-0 bread"><Translate content='checkout.Checkout' /></h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="ftco-section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="cart-list">
                                            <table className="table">
                                                <thead className="thead-primary">
                                                    <tr className="text-center">
                                                        <th>&nbsp;</th>
                                                        <th><Translate content='checkout.Product' /></th>
                                                        <th><Translate content='checkout.Price' /></th>
                                                        <th><Translate content='checkout.Quantity' /></th>
                                                        <th><Translate content='checkout.Total' /></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        items.map((item, i) => (
                                                            <tr key={i} className="text-center">
                                                                <td className="image-prod"><img src={item.Image} className="img-fluid" alt="..." /></td>

                                                                <td className="product-name"><h3>{item.Name}</h3></td>

                                                                <td className="price">{currencyBeforeSign + " " + item.Price + " " + currencyAfterSign}</td>

                                                                <td className="quantity">
                                                                    <div className="input-group mb-3">
                                                                        <input type="text" name={item.ProductId} className="quantity form-control input-number" value={item.Qty} min="1" max="100" disabled/>
                                                                    </div>
                                                                </td>

                                                                <td className="total">{currencyBeforeSign + " " + item.Price * item.Qty + " " + currencyAfterSign}</td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-xl-10">
                                        <form action="" className="billing-form">
                                            <h3 className="mb-4 billing-heading"><Translate content='checkout.BillingDetails' /></h3>
                                            <div className="row align-items-end">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="firstname"><Translate content='checkout.FirstName' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.firstName} name="firstName" id="firstName" maxLength={32} disabled />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="lastname"><Translate content='checkout.LastName' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.lastName} name="lastName" id="lastName" maxLength={32} disabled />
                                                    </div>
                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="state"><Translate content='checkout.State' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.state} name="state" id="state" maxLength={50} disabled />
                                                    </div>
                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="streetaddress"><Translate content='checkout.StreetAddress' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.streetAddress} name="streetAddress" id="streetAddress" maxLength={50} disabled />
                                                    </div>
                                                </div>

                                                <div className="w-100"></div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="towncity"><Translate content='checkout.Town' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.city} name="city" id="city" maxLength={32} disabled />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="postcodezip"><Translate content='checkout.Postcode' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.zipCode} name="zipCode" id="zipCode" maxLength={10} disabled />
                                                    </div>
                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="phone"><Translate content='checkout.Phone' /></label>
                                                        <input type="tel" className="form-control" placeholder="" value={this.state.phone} name="phone" id="phone" maxLength={32} disabled />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="emailaddress"><Translate content='checkout.Email' /></label>
                                                        <input type="email" className="form-control" placeholder="" value={this.state.email} name="email" id="email" maxLength={32} disabled />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mt-5 pt-3 d-flex">
                                                <div className="col-md-6 d-flex">
                                                    <div className="cart-detail cart-total bg-light p-3 p-md-4">
                                                        <h3 className="billing-heading mb-4">Cart Total</h3>
                                                        <p className="d-flex">
                                                            <span><Translate content='checkout.Subtotal' /></span>
                                                            <span>{currencyBeforeSign + " " + this.state.subtotal + " " + currencyAfterSign}</span>
                                                        </p>
                                                        <p className="d-flex">
                                                            <span><Translate content='checkout.Delivery' /></span>
                                                            <span>{currencyBeforeSign + " " + this.state.delivery + " " + currencyAfterSign}</span>
                                                        </p>
                                                        <hr />
                                                        <p className="d-flex total-price">
                                                            <span><Translate content='checkout.Total' /></span>
                                                            <span>{currencyBeforeSign + " " + this.state.total + " " + currencyAfterSign}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="cart-detail bg-light p-3 p-md-4">
                                                        <h3 className="billing-heading mb-4"><Translate content='checkout.PaymentMethod' /></h3>
                                                        <div className="form-group">
                                                            <div className="col-md-12">
                                                                <div className="radio">
                                                                    <label><input type="radio" name="paymentMethod" value="Paypal" checked={this.state.paymentMethod === "Paypal"}  id="Paypal" className="mr-2" /><Translate content='checkout.Paypal' /></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="col-md-12">
                                                                <div className="radio">
                                                                    <label><input type="radio" name="paymentMethod" value="Cash" checked={this.state.paymentMethod === "Cash"}  id="Cash" className="mr-2" defaultChecked /><Translate content='checkout.CashOnDelivery' /></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <Translate component="input" attributes={{ value: 'checkout.PlaceOrder' }} type="submit" className="btn btn-primary py-3 px-4" />
                                                        </div>
                                                    </div>
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
}
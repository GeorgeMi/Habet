import * as React from 'react';
import { Header } from './Header';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
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

export class Checkout extends React.Component<any, any> {
    constructor(props) {
        super(props);

        counterpart.setLocale(read_cookie('lang'));
        this.state = {
            isLoaded: false,
            error: null,
            subtotal: this.props.location.subtotal,
            total: this.props.location.total,
            delivery: this.props.location.delivery,
            cartProducts: this.props.location.cartProducts.items,
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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                        email: user_details.Email
                    });
                })
                .catch((error) => {
                    this.setState({ isLoaded: true, error });
                })
                .then();
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ isChanged: true });
    }

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
        const { error, isLoaded, waitingResponse, currency } = this.state;
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
                                <div className="row justify-content-center">
                                    <div className="col-xl-10">
                                        <form action="" className="billing-form" onSubmit={this.handleSubmit}>
                                            <h3 className="mb-4 billing-heading"><Translate content='checkout.BillingDetails' /></h3>
                                            <div className="row align-items-end">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="firstname"><Translate content='checkout.FirstName' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.firstName} onChange={this.handleChange} name="firstName" id="firstName" maxLength={32} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="lastname"><Translate content='checkout.LastName' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.lastName} onChange={this.handleChange} name="lastName" id="lastName" maxLength={32} required />
                                                    </div>
                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="state"><Translate content='checkout.State' /></label>
                                                        <div className="select-wrap">
                                                            <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                            <select className="form-control" value={this.state.state} onChange={this.handleChange} name="state" id="state" required>
                                                                <option value="GB">United Kingdom</option>
                                                                <option value="AL">Albania</option>
                                                                <option value="AD">Andorra</option>
                                                                <option value="AT">Austria</option>
                                                                <option value="BY">Belarus</option>
                                                                <option value="BE">Belgium</option>
                                                                <option value="BA">Bosnia and Herzegovina</option>
                                                                <option value="BG">Bulgaria</option>
                                                                <option value="HR">Croatia (Hrvatska)</option>
                                                                <option value="CY">Cyprus</option>
                                                                <option value="CZ">Czech Republic</option>
                                                                <option value="FR">France</option>
                                                                <option value="GI">Gibraltar</option>
                                                                <option value="DE">Germany</option>
                                                                <option value="GR">Greece</option>
                                                                <option value="VA">Holy See (Vatican City State)</option>
                                                                <option value="HU">Hungary</option>
                                                                <option value="IT">Italy</option>
                                                                <option value="LI">Liechtenstein</option>
                                                                <option value="LU">Luxembourg</option>
                                                                <option value="MK">Macedonia</option>
                                                                <option value="MT">Malta</option>
                                                                <option value="MD">Moldova</option>
                                                                <option value="MC">Monaco</option>
                                                                <option value="ME">Montenegro</option>
                                                                <option value="NL">Netherlands</option>
                                                                <option value="PL">Poland</option>
                                                                <option value="PT">Portugal</option>
                                                                <option value="RO">Romania</option>
                                                                <option value="SM">San Marino</option>
                                                                <option value="RS">Serbia</option>
                                                                <option value="SK">Slovakia</option>
                                                                <option value="SI">Slovenia</option>
                                                                <option value="ES">Spain</option>
                                                                <option value="UA">Ukraine</option>
                                                                <option value="DK">Denmark</option>
                                                                <option value="EE">Estonia</option>
                                                                <option value="FO">Faroe Islands</option>
                                                                <option value="FI">Finland</option>
                                                                <option value="GL">Greenland</option>
                                                                <option value="IS">Iceland</option>
                                                                <option value="IE">Ireland</option>
                                                                <option value="LV">Latvia</option>
                                                                <option value="LT">Lithuania</option>
                                                                <option value="NO">Norway</option>
                                                                <option value="SJ">Svalbard and Jan Mayen Islands</option>
                                                                <option value="SE">Sweden</option>
                                                                <option value="CH">Switzerland</option>
                                                                <option value="TR">Turkey</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="streetaddress"><Translate content='checkout.StreetAddress' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.streetAddress} onChange={this.handleChange} name="streetAddress" id="streetAddress" maxLength={50} required />
                                                    </div>
                                                </div>

                                                <div className="w-100"></div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="towncity"><Translate content='checkout.Town' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.city} onChange={this.handleChange} name="city" id="city" maxLength={32} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="postcodezip"><Translate content='checkout.Postcode' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.zipCode} onChange={this.handleChange} name="zipCode" id="zipCode" maxLength={10} required />
                                                    </div>
                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="phone"><Translate content='checkout.Phone' /></label>
                                                        <input type="tel" className="form-control" placeholder="" value={this.state.phone} onChange={this.handleChange} name="phone" id="phone" maxLength={32} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="emailaddress"><Translate content='checkout.Email' /></label>
                                                        <input type="email" className="form-control" placeholder="" value={this.state.email} onChange={this.handleChange} name="email" id="email" maxLength={32} disabled />
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
                                                                    <label><input type="radio" name="paymentMethod" value="Paypal" checked={this.state.paymentMethod === "Paypal"} onChange={this.handleChange} id="Paypal" className="mr-2" /><Translate content='checkout.Paypal' /></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="col-md-12">
                                                                <div className="radio">
                                                                    <label><input type="radio" name="paymentMethod" value="Cash" checked={this.state.paymentMethod === "Cash"} onChange={this.handleChange} id="Cash" className="mr-2" defaultChecked /><Translate content='checkout.CashOnDelivery' /></label>
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
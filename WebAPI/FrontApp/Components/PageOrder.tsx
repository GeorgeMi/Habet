import * as React from 'react';
import { Header } from './Header';
import { read_cookie } from 'sfcookies'
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
            shipping: '',
            paymentMethod: '',
            invoice: null,
            waitingResponse: false,
            orderId: props.match.params.id,
            isChanged: false,
            language: read_cookie('lang'),
            currency: read_cookie('currency')
        };

        this.reloadPage = this.reloadPage.bind(this);
        this.download = this.download.bind(this);
        this.base64ToArrayBuffer = this.base64ToArrayBuffer.bind(this);
        this.saveByteArray = this.saveByteArray.bind(this);
    }

    componentWillMount() {
        if (read_cookie('token') != null && read_cookie('token').length !== 0) {
            axios.get(API_Path + '/Orders',
                {
                    headers: {
                        token: read_cookie('token') //the token is a variable which holds the token
                    },
                    params: {
                        orderId: this.state.orderId,
                        lang: this.state.language
                    }
                })
                .then((response) => {
                    var order = response.data;
                    this.setState({
                        isLoaded: true,
                        userDetails: order.UserDetails,
                        products: order.Products,
                        currency: order.Currency,
                        subtotal: order.Subtotal,
                        shipping: order.Shipping,
                        paymentMethod: order.PaymentMethod,
                        invoice: order.Invoice
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

    public download() {
        var pdf = this.base64ToArrayBuffer(this.state.invoice);
        this.saveByteArray("invoice_" + this.state.orderId, pdf);
    }

    public base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
    }

    public saveByteArray(reportName, byte) {
    var blob = new Blob([byte], { type: "application/pdf" });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
};

    render() {
        const { error, isLoaded, waitingResponse, currency, userDetails, products } = this.state;
        var currencyBeforeSign = '€';
        var currencyAfterSign = '';
        if (currency == 'RON') { currencyBeforeSign = ''; currencyAfterSign = 'RON' }
        else if (currency == 'GBP') { currencyBeforeSign = '₤'; currencyAfterSign = '' }

        if (error) {
            return (
                <div>
                    <Header reloadPage={this.reloadPage} />
                    <div className="hero-wrap hero-bread" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" }}> }}>
                        <div className="row no-gutters slider-text align-items-center justify-content-center">
                            <div className="col-md-9 text-center">
                                <h1 className="mb-0 bread">ARE YOU HAPPY NOW?</h1>
                                <h5>Just kidding! Our bad. 404 NOT FOUND</h5>
                            </div>
                        </div>
                    </div>
                </div>
            );

        }
        else if (read_cookie('token') == null || read_cookie('token').length == 0) {
            return <Redirect to='/#/' />;
        } else if (!isLoaded) {
            return (
                <main id="main">
                    {waitingResponse ? <div className="loading">Loading&#8230;</div> : <div></div>}

                    <div>
                        <Header reloadPage={this.reloadPage} />

                        <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                            <div className="row justify-content-center mb-3 pb-3">
                                <div className="col-md-12 heading-section text-center">
                                    <h1 className="mb-4"><Translate content='order.OrderNo' /></h1>
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
                                        <h1 className="mb-0 bread"><Translate content='order.OrderDetails' /></h1>
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
                                                        products.map((item, i) => (
                                                            <tr key={i} className="text-center">
                                                                <td className="image-prod"><a href={"/#/item/" + item.ProductId}><img src={item.Image} className="img-fluid-cart" alt="..." /></a></td>

                                                                <td className="product-name"><a href={"/#/item/" + item.ProductId}><h3>{item.Name}</h3></a></td>

                                                                <td className="price">{currencyBeforeSign + " " + item.Price + " " + currencyAfterSign}</td>

                                                                <td className="quantity">
                                                                    <div className="input-group mb-3">
                                                                        <input type="text" name={item.ProductId} className="quantity form-control input-number" value={item.Amount} disabled/>
                                                                    </div>
                                                                </td>

                                                                <td className="total">{currencyBeforeSign + " " + item.Price * item.Amount + " " + currencyAfterSign}</td>
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
                                                        <input type="text" className="form-control" placeholder="" value={userDetails.FirstName} name="firstName" id="firstName" maxLength={32} disabled />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="lastname"><Translate content='checkout.LastName' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={userDetails.LastName} name="lastName" id="lastName" maxLength={32} disabled />
                                                    </div>
                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="state"><Translate content='checkout.State' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={userDetails.State} name="state" id="state" maxLength={50} disabled />
                                                    </div>
                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="streetaddress"><Translate content='checkout.StreetAddress' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={userDetails.StreetAddress} name="streetAddress" id="streetAddress" maxLength={50} disabled />
                                                    </div>
                                                </div>

                                                <div className="w-100"></div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="towncity"><Translate content='checkout.Town' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={userDetails.City} name="city" id="city" maxLength={32} disabled />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="postcodezip"><Translate content='checkout.Postcode' /></label>
                                                        <input type="text" className="form-control" placeholder="" value={userDetails.ZipCode} name="zipCode" id="zipCode" maxLength={10} disabled />
                                                    </div>
                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="phone"><Translate content='checkout.Phone' /></label>
                                                        <input type="tel" className="form-control" placeholder="" value={userDetails.Phone} name="phone" id="phone" maxLength={32} disabled />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="emailaddress"><Translate content='checkout.Email' /></label>
                                                        <input type="email" className="form-control" placeholder="" value={userDetails.Email} name="email" id="email" maxLength={32} disabled />
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
                                                            <span>{currencyBeforeSign + " " + this.state.shipping + " " + currencyAfterSign}</span>
                                                        </p>
                                                        <hr />
                                                        <p className="d-flex total-price">
                                                            <span><Translate content='checkout.Total' /></span>
                                                            <span>{currencyBeforeSign + " " + eval(this.state.subtotal + this.state.shipping) + " " + currencyAfterSign}</span>
                                                        </p>
                                                        <div className="btn-group btn-group-justified">
                                                            <button type="button" className="btn btn-primary py-3 px-4" onClick={this.download}>
                                                                Download invoice
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="cart-detail bg-light p-3 p-md-4">
                                                        <h3 className="billing-heading mb-4"><Translate content='checkout.PaymentMethod' /></h3>
                                                        <div className="form-group">
                                                            <div className="col-md-12">
                                                              <label>{this.state.paymentMethod}</label>
                                                            </div>
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
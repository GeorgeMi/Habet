"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Header_1 = require("./Header");
var sfcookies_1 = require("sfcookies");
var react_notifications_1 = require("react-notifications");
require("react-notifications/lib/notifications.css");
var react_router_dom_1 = require("react-router-dom");
var Translate = require("react-translate-component");
var en_1 = require("./languages/en");
var it_1 = require("./languages/it");
var ro_1 = require("./languages/ro");
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var counterpart = require('counterpart');
counterpart.registerTranslations('en', en_1.default);
counterpart.registerTranslations('ro', ro_1.default);
counterpart.registerTranslations('it', it_1.default);
var Checkout = /** @class */ (function (_super) {
    __extends(Checkout, _super);
    function Checkout(props) {
        var _this = _super.call(this, props) || this;
        counterpart.setLocale(sfcookies_1.read_cookie('lang'));
        _this.state = {
            isLoaded: false,
            error: null,
            subtotal: _this.props.location.subtotal,
            total: _this.props.location.total,
            delivery: _this.props.location.delivery,
            cartProducts: _this.props.location.cartProducts.items,
            paymentMethod: 'Card',
            firstName: '',
            lastName: '',
            state: '',
            city: '',
            streetAddress: '',
            zipCode: '',
            phone: '',
            email: '',
            paymentResponse: '',
            waitingResponse: false,
            isChanged: false,
            language: sfcookies_1.read_cookie('lang'),
            currency: _this.props.location.currency
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.reloadPage = _this.reloadPage.bind(_this);
        _this.cardPay = _this.cardPay.bind(_this);
        _this.createOrder = _this.createOrder.bind(_this);
        return _this;
    }
    Checkout.prototype.componentWillMount = function () {
        var _this = this;
        if (sfcookies_1.read_cookie('token') != null && sfcookies_1.read_cookie('token').length !== 0) {
            axios.get(API_Path + '/Users', {
                headers: {
                    token: sfcookies_1.read_cookie('token') //the token is a variable which holds the token
                }
            })
                .then(function (response) {
                var user_details = response.data.data[0];
                _this.setState({
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
                .catch(function (error) {
                _this.setState({ isLoaded: true, error: error });
            })
                .then();
        }
    };
    Checkout.prototype.handleChange = function (event) {
        var _a;
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
        this.setState({ isChanged: true });
    };
    Checkout.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.setState({ waitingResponse: true });
        var state = this.state;
        this.createOrder(state);
    };
    Checkout.prototype.createOrder = function (state) {
        var _this = this;
        this.setState({ waitingResponse: true });
        axios.post(API_Path + '/CreateOrder', {
            userDetails: {
                firstName: state.firstName,
                lastName: state.lastName,
                state: state.state,
                city: state.city,
                streetAddress: state.streetAddress,
                zipCode: state.zipCode,
                phone: state.phone,
                email: state.email
            },
            cartProducts: state.cartProducts,
            currency: state.currency,
            lang: state.language,
        }, {
            headers: {
                token: sfcookies_1.read_cookie('token')
            }
        })
            .then(function (response) {
            _this.cardPay(function (returnValue) {
                var order = response.data;
                if (returnValue != false) {
                    axios.post(API_Path + '/CompleteOrder', {
                        transactionId: returnValue,
                        paymentMethod: state.paymentMethod,
                        paymentStatus: true,
                        orderId: order.OrderId
                    }, {
                        headers: {
                            token: sfcookies_1.read_cookie('token') //the token is a variable which holds the token
                        }
                    })
                        .then(function (response) {
                        sfcookies_1.delete_cookie('cartProducts');
                        react_notifications_1.NotificationManager.success(response.data.message);
                        document.location.href = "/#/";
                    })
                        .catch(function (error) {
                        react_notifications_1.NotificationManager.error("Request failed. Please, try again later.");
                    })
                        .then(function () { });
                }
            });
        })
            .catch(function (error) {
            react_notifications_1.NotificationManager.error("Request failed. Please, try again later.");
        })
            .then(function () { });
    };
    Checkout.prototype.reloadPage = function () {
        //do nothing
    };
    Checkout.prototype.cardPay = function (callback) {
        window.pay(this.state.currency, this.state.total * 100, function (returnValue) {
            callback(returnValue);
        });
    };
    Checkout.prototype.render = function () {
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, waitingResponse = _a.waitingResponse, currency = _a.currency;
        var currencyBeforeSign = '€';
        var currencyAfterSign = '';
        if (currency == 'RON') {
            currencyBeforeSign = '';
            currencyAfterSign = 'RON';
        }
        else if (currency == 'GBP') {
            currencyBeforeSign = '₤';
            currencyAfterSign = '';
        }
        //-------------- PayPal ---------------------
        var onSuccess = function (payment) {
            // Congratulation, it came here means everything's fine!
            console.log("The payment was succeeded!", payment);
            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        };
        var onCancel = function (data) {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        };
        var onError = function (err) {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        };
        var env = 'sandbox'; // you can set here to 'production' for production
        //let currency = 'USD'; // or you can set this value from your props or state
        var total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
        var client = {
            sandbox: 'YOUR-SANDBOX-APP-ID',
            production: 'YOUR-PRODUCTION-APP-ID',
        };
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        //-------------- PayPal ---------------------
        if (error) {
            console.log(error);
            return React.createElement("div", null,
                "Error: ",
                error.message);
        }
        else if (!isLoaded) {
            return (React.createElement("main", { id: "main" },
                waitingResponse ? React.createElement("div", { className: "loading" }, "Loading\u2026") : React.createElement("div", null),
                React.createElement("div", null,
                    React.createElement(Header_1.Header, { reloadPage: this.reloadPage }),
                    React.createElement("div", { className: "hero-wrap page-title", style: { backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" } },
                        React.createElement("div", { className: "row justify-content-center" },
                            React.createElement("div", { className: "col-md-12 heading-section text-center" },
                                React.createElement("h1", { className: "mb-4" },
                                    React.createElement(Translate, { content: 'checkout.Checkout' }))))),
                    React.createElement("div", { className: "loading" }, "Loading\u2026"),
                    ";")));
        }
        else {
            if (sfcookies_1.read_cookie('token') == null || sfcookies_1.read_cookie('token').length == 0) {
                return React.createElement(react_router_dom_1.Redirect, { to: '/#/' });
            }
            return (React.createElement("main", { id: "main" },
                React.createElement("div", null,
                    React.createElement(Header_1.Header, { reloadPage: this.reloadPage }),
                    React.createElement("div", { className: "hero-wrap page-title", style: { backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" } },
                        React.createElement("div", { className: "row justify-content-center" },
                            React.createElement("div", { className: "col-md-12 heading-section text-center" },
                                React.createElement("h1", { className: "mb-4" },
                                    React.createElement(Translate, { content: 'checkout.Checkout' }))))),
                    React.createElement("section", { className: "ftco-section" },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "row justify-content-center" },
                                React.createElement("div", { className: "col-xl-10" },
                                    React.createElement("form", { action: "", className: "billing-form", onSubmit: this.handleSubmit },
                                        React.createElement("h3", { className: "mb-4 billing-heading" },
                                            React.createElement(Translate, { content: 'checkout.BillingDetails' })),
                                        React.createElement("div", { className: "row align-items-end" },
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "firstname" },
                                                        React.createElement(Translate, { content: 'checkout.FirstName' })),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.firstName, onChange: this.handleChange, name: "firstName", id: "firstName", maxLength: 32, required: true }))),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "lastname" },
                                                        React.createElement(Translate, { content: 'checkout.LastName' })),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.lastName, onChange: this.handleChange, name: "lastName", id: "lastName", maxLength: 32, required: true }))),
                                            React.createElement("div", { className: "w-100" }),
                                            React.createElement("div", { className: "col-md-12" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "state" },
                                                        React.createElement(Translate, { content: 'checkout.State' })),
                                                    React.createElement("div", { className: "select-wrap" },
                                                        React.createElement("div", { className: "icon" },
                                                            React.createElement("span", { className: "ion-ios-arrow-down" })),
                                                        React.createElement("select", { className: "form-control", value: this.state.state, onChange: this.handleChange, name: "state", id: "state", required: true },
                                                            React.createElement("option", { value: "GB" }, "United Kingdom"),
                                                            React.createElement("option", { value: "AL" }, "Albania"),
                                                            React.createElement("option", { value: "AD" }, "Andorra"),
                                                            React.createElement("option", { value: "AT" }, "Austria"),
                                                            React.createElement("option", { value: "BY" }, "Belarus"),
                                                            React.createElement("option", { value: "BE" }, "Belgium"),
                                                            React.createElement("option", { value: "BA" }, "Bosnia and Herzegovina"),
                                                            React.createElement("option", { value: "BG" }, "Bulgaria"),
                                                            React.createElement("option", { value: "HR" }, "Croatia (Hrvatska)"),
                                                            React.createElement("option", { value: "CY" }, "Cyprus"),
                                                            React.createElement("option", { value: "CZ" }, "Czech Republic"),
                                                            React.createElement("option", { value: "FR" }, "France"),
                                                            React.createElement("option", { value: "GI" }, "Gibraltar"),
                                                            React.createElement("option", { value: "DE" }, "Germany"),
                                                            React.createElement("option", { value: "GR" }, "Greece"),
                                                            React.createElement("option", { value: "VA" }, "Holy See (Vatican City State)"),
                                                            React.createElement("option", { value: "HU" }, "Hungary"),
                                                            React.createElement("option", { value: "IT" }, "Italy"),
                                                            React.createElement("option", { value: "LI" }, "Liechtenstein"),
                                                            React.createElement("option", { value: "LU" }, "Luxembourg"),
                                                            React.createElement("option", { value: "MK" }, "Macedonia"),
                                                            React.createElement("option", { value: "MT" }, "Malta"),
                                                            React.createElement("option", { value: "MD" }, "Moldova"),
                                                            React.createElement("option", { value: "MC" }, "Monaco"),
                                                            React.createElement("option", { value: "ME" }, "Montenegro"),
                                                            React.createElement("option", { value: "NL" }, "Netherlands"),
                                                            React.createElement("option", { value: "PL" }, "Poland"),
                                                            React.createElement("option", { value: "PT" }, "Portugal"),
                                                            React.createElement("option", { value: "RO" }, "Romania"),
                                                            React.createElement("option", { value: "SM" }, "San Marino"),
                                                            React.createElement("option", { value: "RS" }, "Serbia"),
                                                            React.createElement("option", { value: "SK" }, "Slovakia"),
                                                            React.createElement("option", { value: "SI" }, "Slovenia"),
                                                            React.createElement("option", { value: "ES" }, "Spain"),
                                                            React.createElement("option", { value: "UA" }, "Ukraine"),
                                                            React.createElement("option", { value: "DK" }, "Denmark"),
                                                            React.createElement("option", { value: "EE" }, "Estonia"),
                                                            React.createElement("option", { value: "FO" }, "Faroe Islands"),
                                                            React.createElement("option", { value: "FI" }, "Finland"),
                                                            React.createElement("option", { value: "GL" }, "Greenland"),
                                                            React.createElement("option", { value: "IS" }, "Iceland"),
                                                            React.createElement("option", { value: "IE" }, "Ireland"),
                                                            React.createElement("option", { value: "LV" }, "Latvia"),
                                                            React.createElement("option", { value: "LT" }, "Lithuania"),
                                                            React.createElement("option", { value: "NO" }, "Norway"),
                                                            React.createElement("option", { value: "SJ" }, "Svalbard and Jan Mayen Islands"),
                                                            React.createElement("option", { value: "SE" }, "Sweden"),
                                                            React.createElement("option", { value: "CH" }, "Switzerland"),
                                                            React.createElement("option", { value: "TR" }, "Turkey"))))),
                                            React.createElement("div", { className: "w-100" }),
                                            React.createElement("div", { className: "col-md-12" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "streetaddress" },
                                                        React.createElement(Translate, { content: 'checkout.StreetAddress' })),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.streetAddress, onChange: this.handleChange, name: "streetAddress", id: "streetAddress", maxLength: 50, required: true }))),
                                            React.createElement("div", { className: "w-100" }),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "towncity" },
                                                        React.createElement(Translate, { content: 'checkout.Town' })),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.city, onChange: this.handleChange, name: "city", id: "city", maxLength: 32, required: true }))),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "postcodezip" },
                                                        React.createElement(Translate, { content: 'checkout.Postcode' })),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.zipCode, onChange: this.handleChange, name: "zipCode", id: "zipCode", maxLength: 10, required: true }))),
                                            React.createElement("div", { className: "w-100" }),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "phone" },
                                                        React.createElement(Translate, { content: 'checkout.Phone' })),
                                                    React.createElement("input", { type: "tel", className: "form-control", placeholder: "", value: this.state.phone, onChange: this.handleChange, name: "phone", id: "phone", maxLength: 32, required: true }))),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "emailaddress" },
                                                        React.createElement(Translate, { content: 'checkout.Email' })),
                                                    React.createElement("input", { type: "email", className: "form-control", placeholder: "", value: this.state.email, onChange: this.handleChange, name: "email", id: "email", maxLength: 32, disabled: true })))),
                                        React.createElement("div", { className: "row mt-5 pt-3 d-flex" },
                                            React.createElement("div", { className: "col-md-6 d-flex" },
                                                React.createElement("div", { className: "cart-detail cart-total bg-light p-3 p-md-4" },
                                                    React.createElement("h3", { className: "billing-heading mb-4" }, "Cart Total"),
                                                    React.createElement("p", { className: "d-flex" },
                                                        React.createElement("span", null,
                                                            React.createElement(Translate, { content: 'checkout.Subtotal' })),
                                                        React.createElement("span", null, currencyBeforeSign + " " + this.state.subtotal + " " + currencyAfterSign)),
                                                    React.createElement("p", { className: "d-flex" },
                                                        React.createElement("span", null,
                                                            React.createElement(Translate, { content: 'checkout.Delivery' })),
                                                        React.createElement("span", null, currencyBeforeSign + " " + this.state.delivery + " " + currencyAfterSign)),
                                                    React.createElement("hr", null),
                                                    React.createElement("p", { className: "d-flex total-price" },
                                                        React.createElement("span", null,
                                                            React.createElement(Translate, { content: 'checkout.Total' })),
                                                        React.createElement("span", null, currencyBeforeSign + " " + this.state.total + " " + currencyAfterSign)))),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "cart-detail bg-light p-3 p-md-4" },
                                                    React.createElement("h3", { className: "billing-heading mb-4" },
                                                        React.createElement(Translate, { content: 'checkout.PaymentMethod' })),
                                                    React.createElement("div", { className: "row col-md-8" },
                                                        React.createElement("div", { className: "column" },
                                                            React.createElement("img", { src: "images/visa.svg", alt: "Visa", style: { width: '100%' } })),
                                                        React.createElement("div", { className: "column" },
                                                            React.createElement("img", { src: "images/mastercard.svg", alt: "Mastercard", style: { width: '100%' } }))),
                                                    React.createElement("div", { className: "form-group" },
                                                        React.createElement(Translate, { component: "input", attributes: { value: 'checkout.PlaceOrder' }, type: "submit", className: "btn btn-primary py-3 px-4" })))))))))))));
        }
    };
    return Checkout;
}(React.Component));
exports.Checkout = Checkout;
//# sourceMappingURL=PageCheckout.js.map
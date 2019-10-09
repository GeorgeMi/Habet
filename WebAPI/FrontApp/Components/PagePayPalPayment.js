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
var sfcookies_1 = require("sfcookies");
var react_notifications_1 = require("react-notifications");
require("react-notifications/lib/notifications.css");
var en_1 = require("./languages/en");
var it_1 = require("./languages/it");
var ro_1 = require("./languages/ro");
var react_paypal_express_checkout_1 = require("react-paypal-express-checkout");
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var counterpart = require('counterpart');
counterpart.registerTranslations('en', en_1.default);
counterpart.registerTranslations('ro', ro_1.default);
counterpart.registerTranslations('it', it_1.default);
var PayPalPayment = /** @class */ (function (_super) {
    __extends(PayPalPayment, _super);
    function PayPalPayment(props) {
        var _this = _super.call(this, props) || this;
        counterpart.setLocale(sfcookies_1.read_cookie('lang'));
        _this.state = {
            error: null,
            waitingResponse: false,
            isChanged: false,
            language: sfcookies_1.read_cookie('lang'),
            currency: sfcookies_1.read_cookie('currency'),
            cvc: '',
            expiry: '',
            focused: '',
            name: '',
            number: ''
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.reloadPage = _this.reloadPage.bind(_this);
        return _this;
    }
    PayPalPayment.prototype.componentWillMount = function () {
    };
    PayPalPayment.prototype.handleChange = function (event) {
        var _a;
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
        this.setState({ isChanged: true });
    };
    PayPalPayment.prototype.handleSubmit = function (event) {
        var _this = this;
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
                token: sfcookies_1.read_cookie('token') //the token is a variable which holds the token
            }
        })
            .then(function (response) {
            react_notifications_1.NotificationManager.success(response.data.message);
        })
            .catch(function (error) {
            react_notifications_1.NotificationManager.error("Request failed. Please, try again later.");
        })
            .then(function () {
            _this.setState({ waitingResponse: false });
        });
    };
    PayPalPayment.prototype.reloadPage = function () {
        //do nothing
    };
    PayPalPayment.prototype.render = function () {
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
        var currency = 'USD'; // or you can set this value from your props or state
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
        return (React.createElement(react_paypal_express_checkout_1.default, { env: env, client: client, currency: currency, total: total, onError: onError, onSuccess: onSuccess, onCancel: onCancel }));
    };
    return PayPalPayment;
}(React.Component));
exports.PayPalPayment = PayPalPayment;
//# sourceMappingURL=PagePayPalPayment.js.map
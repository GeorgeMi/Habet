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
require("react-credit-cards/es/styles-compiled.css");
var en_1 = require("./languages/en");
var it_1 = require("./languages/it");
var ro_1 = require("./languages/ro");
var react_credit_cards_1 = require("react-credit-cards");
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var counterpart = require('counterpart');
counterpart.registerTranslations('en', en_1.default);
counterpart.registerTranslations('ro', ro_1.default);
counterpart.registerTranslations('it', it_1.default);
function clearNumber(value) {
    if (value === void 0) { value = ''; }
    return value.replace(/\D+/g, '');
}
function formatCreditCardNumber(value) {
    if (!value) {
        return value;
    }
    var clearValue = clearNumber(value);
    var nextValue = clearValue.slice(0, 4) + " " + clearValue.slice(4, 8) + " " + clearValue.slice(8, 12) + " " + clearValue.slice(12, 19);
    return nextValue.trim();
}
exports.formatCreditCardNumber = formatCreditCardNumber;
function formatCVC(value) {
    var clearValue = clearNumber(value);
    var maxLength = 4;
    return clearValue.slice(0, maxLength);
}
exports.formatCVC = formatCVC;
function formatExpirationDate(value) {
    var clearValue = clearNumber(value);
    if (clearValue.length >= 3) {
        return clearValue.slice(0, 2) + "/" + clearValue.slice(2, 4);
    }
    return clearValue;
}
exports.formatExpirationDate = formatExpirationDate;
var CreditCardPayment = /** @class */ (function (_super) {
    __extends(CreditCardPayment, _super);
    function CreditCardPayment(props) {
        var _this = _super.call(this, props) || this;
        _this.handleInputFocus = function (_a) {
            var target = _a.target;
            _this.setState({
                focused: target.name,
            });
        };
        _this.handleInputChange = function (_a) {
            var _b;
            var target = _a.target;
            if (target.name === 'number') {
                target.value = formatCreditCardNumber(target.value);
            }
            else if (target.name === 'expiry') {
                target.value = formatExpirationDate(target.value);
            }
            else if (target.name === 'cvc') {
                target.value = formatCVC(target.value);
            }
            _this.setState((_b = {}, _b[target.name] = target.value, _b));
        };
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
        _this.handleInputFocus = _this.handleInputFocus.bind(_this);
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        return _this;
    }
    CreditCardPayment.prototype.componentWillMount = function () {
    };
    CreditCardPayment.prototype.handleChange = function (event) {
        var _a;
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
        this.setState({ isChanged: true });
    };
    CreditCardPayment.prototype.handleSubmit = function (event) {
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
    CreditCardPayment.prototype.reloadPage = function () {
        //do nothing
    };
    CreditCardPayment.prototype.render = function () {
        return (React.createElement("main", { id: "main" },
            React.createElement("div", { id: "PaymentForm" },
                ">",
                React.createElement(Header_1.Header, { reloadPage: this.reloadPage }),
                React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" } },
                    " }}>",
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                            React.createElement(react_credit_cards_1.default, { cvc: this.state.cvc, expiry: this.state.expiry, focused: this.state.focused, name: this.state.name, number: this.state.number })))),
                React.createElement("section", { className: "ftco-section" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row justify-content-center" },
                            React.createElement("div", { className: "col-xl-10" },
                                React.createElement("form", { action: "", className: "billing-form", onSubmit: this.handleSubmit },
                                    React.createElement("div", { className: "col-md-12" },
                                        React.createElement("div", { className: "form-group" },
                                            React.createElement("input", { type: "tel", name: "number", className: "form-control", placeholder: "Card Number", required: true, onChange: this.handleInputChange, onFocus: this.handleInputFocus }))),
                                    React.createElement("div", { className: "col-md-12" },
                                        React.createElement("div", { className: "form-group" },
                                            React.createElement("input", { type: "text", name: "name", className: "form-control", placeholder: "Name", required: true, onChange: this.handleInputChange, onFocus: this.handleInputFocus }))),
                                    React.createElement("div", { className: "col-md-6" },
                                        React.createElement("div", { className: "form-group" },
                                            React.createElement("input", { type: "tel", name: "expiry", className: "form-control", placeholder: "Valid Thru", required: true, onChange: this.handleInputChange, onFocus: this.handleInputFocus }))),
                                    React.createElement("div", { className: "col-md-6" },
                                        React.createElement("div", { className: "form-group" },
                                            React.createElement("input", { type: "tel", name: "cvc", className: "form-control", placeholder: "CVC", required: true, onChange: this.handleInputChange, onFocus: this.handleInputFocus }))),
                                    React.createElement("div", { className: "col-md-6" },
                                        React.createElement("div", { className: "form-group" },
                                            React.createElement("button", { className: "btn btn-primary btn-block" }, "PAY")))))))))));
    };
    return CreditCardPayment;
}(React.Component));
exports.CreditCardPayment = CreditCardPayment;
//# sourceMappingURL=PageCreditCardPayment.js.map
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
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order(props) {
        var _this = _super.call(this, props) || this;
        counterpart.setLocale(sfcookies_1.read_cookie('lang'));
        _this.state = {
            isLoaded: false,
            error: null,
            subtotal: '',
            shipping: '',
            paymentMethod: '',
            waitingResponse: false,
            orderId: props.match.params.id,
            isChanged: false,
            language: sfcookies_1.read_cookie('lang'),
            currency: sfcookies_1.read_cookie('currency')
        };
        _this.reloadPage = _this.reloadPage.bind(_this);
        return _this;
    }
    Order.prototype.componentWillMount = function () {
        var _this = this;
        if (sfcookies_1.read_cookie('token') != null && sfcookies_1.read_cookie('token').length !== 0) {
            axios.get(API_Path + '/Orders', {
                headers: {
                    token: sfcookies_1.read_cookie('token') //the token is a variable which holds the token
                },
                params: {
                    orderId: this.state.orderId,
                    lang: this.state.language
                }
            })
                .then(function (response) {
                var order = response.data;
                _this.setState({
                    isLoaded: true,
                    userDetails: order.UserDetails,
                    products: order.Products,
                    currency: order.Currency,
                    subtotal: order.Subtotal,
                    shipping: order.Shipping,
                    paymentMethod: order.PaymentMethod,
                });
            })
                .catch(function (error) {
                _this.setState({ isLoaded: true, error: error });
            })
                .then();
        }
    };
    Order.prototype.reloadPage = function () {
        //do nothing
    };
    Order.prototype.render = function () {
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, waitingResponse = _a.waitingResponse, currency = _a.currency, userDetails = _a.userDetails, products = _a.products;
        var currencyBeforeSign = '€';
        var currencyAfterSign = '';
        if (currency == 'lei') {
            currencyBeforeSign = '';
            currencyAfterSign = 'lei';
        }
        else if (currency == 'pounds') {
            currencyBeforeSign = '₤';
            currencyAfterSign = '';
        }
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
                    React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                        React.createElement("div", { className: "row justify-content-center mb-3 pb-3" },
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
                    React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                                React.createElement("div", { className: "col-md-9 text-center" },
                                    React.createElement("h1", { className: "mb-0 bread" },
                                        React.createElement(Translate, { content: 'checkout.Checkout' })))))),
                    React.createElement("section", { className: "ftco-section" },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("div", { className: "cart-list" },
                                        React.createElement("table", { className: "table" },
                                            React.createElement("thead", { className: "thead-primary" },
                                                React.createElement("tr", { className: "text-center" },
                                                    React.createElement("th", null, "\u00A0"),
                                                    React.createElement("th", null,
                                                        React.createElement(Translate, { content: 'checkout.Product' })),
                                                    React.createElement("th", null,
                                                        React.createElement(Translate, { content: 'checkout.Price' })),
                                                    React.createElement("th", null,
                                                        React.createElement(Translate, { content: 'checkout.Quantity' })),
                                                    React.createElement("th", null,
                                                        React.createElement(Translate, { content: 'checkout.Total' })))),
                                            React.createElement("tbody", null, products.map(function (item, i) { return (React.createElement("tr", { key: i, className: "text-center" },
                                                React.createElement("td", { className: "image-prod" },
                                                    React.createElement("img", { src: item.Image, className: "img-fluid", alt: "..." })),
                                                React.createElement("td", { className: "product-name" },
                                                    React.createElement("h3", null, item.Name)),
                                                React.createElement("td", { className: "price" }, currencyBeforeSign + " " + item.Price + " " + currencyAfterSign),
                                                React.createElement("td", { className: "quantity" },
                                                    React.createElement("div", { className: "input-group mb-3" },
                                                        React.createElement("input", { type: "text", name: item.ProductId, className: "quantity form-control input-number", value: item.Amount, disabled: true }))),
                                                React.createElement("td", { className: "total" }, currencyBeforeSign + " " + item.Price * item.Amount + " " + currencyAfterSign))); })))))),
                            React.createElement("div", { className: "row justify-content-center" },
                                React.createElement("div", { className: "col-xl-10" },
                                    React.createElement("form", { action: "", className: "billing-form" },
                                        React.createElement("h3", { className: "mb-4 billing-heading" },
                                            React.createElement(Translate, { content: 'checkout.BillingDetails' })),
                                        React.createElement("div", { className: "row align-items-end" },
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "firstname" },
                                                        React.createElement(Translate, { content: 'checkout.FirstName' })),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: userDetails.FirstName, name: "firstName", id: "firstName", maxLength: 32, disabled: true }))),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "lastname" },
                                                        React.createElement(Translate, { content: 'checkout.LastName' })),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: userDetails.LastName, name: "lastName", id: "lastName", maxLength: 32, disabled: true }))),
                                            React.createElement("div", { className: "w-100" }),
                                            React.createElement("div", { className: "col-md-12" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "state" },
                                                        React.createElement(Translate, { content: 'checkout.State' })),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: userDetails.State, name: "state", id: "state", maxLength: 50, disabled: true }))),
                                            React.createElement("div", { className: "w-100" }),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "streetaddress" },
                                                        React.createElement(Translate, { content: 'checkout.StreetAddress' })),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: userDetails.StreetAddress, name: "streetAddress", id: "streetAddress", maxLength: 50, disabled: true }))),
                                            React.createElement("div", { className: "w-100" }),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "towncity" },
                                                        React.createElement(Translate, { content: 'checkout.Town' })),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: userDetails.City, name: "city", id: "city", maxLength: 32, disabled: true }))),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "postcodezip" },
                                                        React.createElement(Translate, { content: 'checkout.Postcode' })),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: userDetails.ZipCode, name: "zipCode", id: "zipCode", maxLength: 10, disabled: true }))),
                                            React.createElement("div", { className: "w-100" }),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "phone" },
                                                        React.createElement(Translate, { content: 'checkout.Phone' })),
                                                    React.createElement("input", { type: "tel", className: "form-control", placeholder: "", value: userDetails.Phone, name: "phone", id: "phone", maxLength: 32, disabled: true }))),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "emailaddress" },
                                                        React.createElement(Translate, { content: 'checkout.Email' })),
                                                    React.createElement("input", { type: "email", className: "form-control", placeholder: "", value: userDetails.Email, name: "email", id: "email", maxLength: 32, disabled: true })))),
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
                                                        React.createElement("span", null, currencyBeforeSign + " " + this.state.shipping + " " + currencyAfterSign)),
                                                    React.createElement("hr", null),
                                                    React.createElement("p", { className: "d-flex total-price" },
                                                        React.createElement("span", null,
                                                            React.createElement(Translate, { content: 'checkout.Total' })),
                                                        React.createElement("span", null, currencyBeforeSign + " " + eval(this.state.subtotal + this.state.shipping) + " " + currencyAfterSign)))),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "cart-detail bg-light p-3 p-md-4" },
                                                    React.createElement("h3", { className: "billing-heading mb-4" },
                                                        React.createElement(Translate, { content: 'checkout.PaymentMethod' })),
                                                    React.createElement("div", { className: "form-group" },
                                                        React.createElement("div", { className: "col-md-12" },
                                                            React.createElement("label", null, this.state.paymentMethod))))))))))))));
        }
    };
    return Order;
}(React.Component));
exports.Order = Order;
//# sourceMappingURL=PageOrder.js.map
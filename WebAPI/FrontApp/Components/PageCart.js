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
var Dictionary_1 = require("./Dictionary");
var sfcookies_1 = require("sfcookies");
var react_router_hash_link_1 = require("react-router-hash-link");
var Translate = require("react-translate-component");
var react_router_dom_1 = require("react-router-dom");
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
var Cart = /** @class */ (function (_super) {
    __extends(Cart, _super);
    function Cart(props) {
        var _this = _super.call(this, props) || this;
        counterpart.setLocale(sfcookies_1.read_cookie('lang'));
        _this.state = { isLoaded: false, items: null, error: null, cartProducts: null, subtotal: 0, total: 0, delivery: 0, language: sfcookies_1.read_cookie('lang'), currency: sfcookies_1.read_cookie('currency') };
        _this.updateTotal = _this.updateTotal.bind(_this);
        _this.getQuantity = _this.getQuantity.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.removeProductFromCart = _this.removeProductFromCart.bind(_this);
        _this.updateTotalAfterRemove = _this.updateTotalAfterRemove.bind(_this);
        _this.reloadPage = _this.reloadPage.bind(_this);
        return _this;
    }
    Cart.prototype.readCartFromCookie = function (cookie) {
        var cartProducts = new Dictionary_1.KeyedCollection();
        for (var prop in cookie.items) {
            cartProducts.Add(parseInt(prop, 10), parseInt(cookie.items[prop], 10));
        }
        return cartProducts;
    };
    Cart.prototype.componentWillMount = function () {
        var _this = this;
        var cookie = sfcookies_1.read_cookie('cartProducts');
        if (cookie.length != 0) {
            var cartProducts = this.readCartFromCookie(cookie);
            this.setState({ cartProducts: cartProducts });
            if (cartProducts.Count() > 0) {
                axios.post(API_Path + '/ChartProducts', {
                    productIds: cartProducts.Keys(),
                    lang: this.state.language,
                    currency: this.state.currency
                })
                    .then(function (response) {
                    _this.setState({ isLoaded: true, items: response.data.data });
                    _this.updateTotal();
                })
                    .catch(function (error) {
                    _this.setState({ isLoaded: true, error: error });
                })
                    .then();
            }
        }
    };
    Cart.prototype.handleChange = function (event) {
        var cartProducts = this.state.cartProducts;
        cartProducts.Remove([event.target.name]);
        cartProducts.Add([event.target.name], event.target.value);
        sfcookies_1.delete_cookie('cartProducts');
        sfcookies_1.bake_cookie('cartProducts', cartProducts);
        this.setState({ cartProducts: cartProducts });
        this.setState({ isChanged: true });
        this.updateTotal();
    };
    Cart.prototype.removeProductFromCart = function (productId) {
        var cartProducts = this.state.cartProducts;
        cartProducts.Remove(productId);
        var filteredArray = this.state.items.filter(function (item) { return item.ProductId != productId; });
        sfcookies_1.delete_cookie('cartProducts');
        sfcookies_1.bake_cookie('cartProducts', cartProducts);
        this.setState({ cartProducts: cartProducts, items: filteredArray });
        this.setState({ isChanged: true });
        this.updateTotalAfterRemove(productId);
    };
    Cart.prototype.updateTotal = function () {
        var subtotal = 0;
        var delivery = 0;
        var cartProducts = this.readCartFromCookie(sfcookies_1.read_cookie('cartProducts'));
        this.state.items.map(function (item, i) { return (subtotal = subtotal + (item.Price * cartProducts.Item(item.ProductId))); });
        this.setState({ delivery: 0, subtotal: subtotal, total: subtotal + delivery });
    };
    Cart.prototype.updateTotalAfterRemove = function (productId) {
        var subtotal = 0;
        var delivery = 0;
        var cartProducts = this.readCartFromCookie(sfcookies_1.read_cookie('cartProducts'));
        var filteredArray = this.state.items.filter(function (item) { return item.ProductId != productId; });
        filteredArray.map(function (item, i) { return (subtotal = subtotal + (item.Price * cartProducts.Item(item.ProductId))); });
        this.setState({ items: filteredArray, delivery: 0, subtotal: subtotal, total: subtotal + delivery });
    };
    Cart.prototype.getQuantity = function (productId) {
        var cartProducts = this.readCartFromCookie(sfcookies_1.read_cookie('cartProducts'));
        return cartProducts.Item(productId);
    };
    Cart.prototype.reloadPage = function () {
        window.location.reload(false);
    };
    Cart.prototype.render = function () {
        var _this = this;
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, items = _a.items, currency = _a.currency;
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
        if (error) {
            console.log(error);
            return React.createElement("div", null,
                "Error: ",
                error.message);
        }
        else if (sfcookies_1.read_cookie('cartProducts').length == 0) {
            return React.createElement(react_router_dom_1.Redirect, { to: '/#/' });
        }
        else if (!isLoaded) {
            return (React.createElement("div", null,
                React.createElement(Header_1.Header, { reloadPage: this.reloadPage }),
                React.createElement("div", { className: "hero-wrap page-title", style: { backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" } },
                    React.createElement("div", { className: "row justify-content-center" },
                        React.createElement("div", { className: "col-md-12 heading-section text-center" },
                            React.createElement("h1", { className: "mb-4" },
                                React.createElement(Translate, { content: 'checkout.Checkout' }))))),
                React.createElement("div", { className: "loading" }, "Loading\u2026"),
                ";"));
        }
        else {
            if (sfcookies_1.read_cookie('token') == null || sfcookies_1.read_cookie('token').length == 0) {
                return React.createElement(react_router_dom_1.Redirect, { to: '/#/' });
            }
            return (React.createElement("div", null,
                React.createElement(Header_1.Header, { Active: 'Cart', reloadPage: this.reloadPage }),
                React.createElement("div", { className: "hero-wrap page-title", style: { backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" } },
                    React.createElement("div", { className: "row justify-content-center" },
                        React.createElement("div", { className: "col-md-12 heading-section text-center" },
                            React.createElement("h1", { className: "mb-4" },
                                React.createElement(Translate, { content: 'checkout.MyCart' }))))),
                React.createElement("section", { className: "ftco-section ftco-cart" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-md-12" },
                                React.createElement("div", { className: "cart-list" },
                                    React.createElement("table", { className: "table" },
                                        React.createElement("thead", { className: "thead-primary" },
                                            React.createElement("tr", { className: "text-center" },
                                                React.createElement("th", null, "\u00A0"),
                                                React.createElement("th", { className: "hide-column" }, "\u00A0"),
                                                React.createElement("th", null,
                                                    React.createElement(Translate, { content: 'checkout.Product' })),
                                                React.createElement("th", null,
                                                    React.createElement(Translate, { content: 'checkout.Price' })),
                                                React.createElement("th", null,
                                                    React.createElement(Translate, { content: 'checkout.Quantity' })),
                                                React.createElement("th", null,
                                                    React.createElement(Translate, { content: 'checkout.Total' })))),
                                        React.createElement("tbody", null, items.map(function (item, i) { return (React.createElement("tr", { key: i, className: "text-center" },
                                            React.createElement("td", { className: "product-remove" },
                                                React.createElement("span", { onClick: function () { return _this.removeProductFromCart(item.ProductId); }, className: "ion-ios-close" })),
                                            React.createElement("td", { className: "image-prod hide-column" },
                                                React.createElement("a", { href: "/#/item/" + item.ProductId },
                                                    React.createElement("img", { src: item.Image, className: "img-fluid-cart", alt: "..." }))),
                                            React.createElement("td", { className: "product-name" },
                                                React.createElement("a", { href: "/#/item/" + item.ProductId },
                                                    React.createElement("h3", null, item.Name))),
                                            React.createElement("td", { className: "price" }, currencyBeforeSign + " " + item.Price + " " + currencyAfterSign),
                                            React.createElement("td", { className: "quantity" },
                                                React.createElement("div", { className: "input-group mb-3" },
                                                    React.createElement("input", { type: "text", name: item.ProductId, className: "quantity form-control input-number", value: _this.getQuantity(item.ProductId), min: "1", max: "100", onChange: _this.handleChange, disabled: true }))),
                                            React.createElement("td", { className: "total" }, currencyBeforeSign + " " + item.Price * _this.getQuantity(item.ProductId) + " " + currencyAfterSign))); })))))),
                        React.createElement("div", { className: "row justify-content-start" },
                            React.createElement("div", { className: "col col-lg-5 col-md-6 mt-5 cart-wrap" },
                                React.createElement("div", { className: "cart-total mb-3" },
                                    React.createElement("h3", null, "Cart Totals"),
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
                                        React.createElement("span", null, currencyBeforeSign + " " + this.state.total + " " + currencyAfterSign))),
                                React.createElement("p", { className: "text-center" },
                                    React.createElement(react_router_hash_link_1.HashLink, { to: {
                                            pathname: "/checkout",
                                            subtotal: this.state.subtotal,
                                            delivery: this.state.delivery,
                                            total: this.state.total,
                                            cartProducts: this.state.cartProducts,
                                            currency: this.state.currency
                                        }, className: "btn btn-primary py-3 px-4" },
                                        React.createElement(Translate, { content: 'checkout.ProceedToCheckout' })))))))));
        }
    };
    return Cart;
}(React.Component));
exports.Cart = Cart;
//# sourceMappingURL=PageCart.js.map
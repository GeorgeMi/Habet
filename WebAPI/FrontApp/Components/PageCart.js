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
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var Cart = /** @class */ (function (_super) {
    __extends(Cart, _super);
    function Cart(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { isLoaded: false, items: null, error: null, cartProducts: null, subtotal: 0, total: 0, delivery: 0 };
        _this.updateTotal = _this.updateTotal.bind(_this);
        _this.getQuantity = _this.getQuantity.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.removeProductFromCart = _this.removeProductFromCart.bind(_this);
        _this.updateTotalAfterRemove = _this.updateTotalAfterRemove.bind(_this);
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
                    productIds: cartProducts.Keys()
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
    Cart.prototype.render = function () {
        var _this = this;
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, items = _a.items;
        if (error) {
            console.log(error);
            return React.createElement("div", null,
                "Error: ",
                error.message);
        }
        else if (!isLoaded) {
            return React.createElement("div", null);
        }
        else {
            return (React.createElement("div", null,
                React.createElement(Header_1.Header, { Active: 'Cart' }),
                React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                    React.createElement("div", { className: "row justify-content-center mb-3 pb-3" },
                        React.createElement("div", { className: "col-md-12 heading-section text-center" },
                            React.createElement("h1", { className: "mb-4" }, "My cart")))),
                React.createElement("section", { className: "ftco-section ftco-cart" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-md-12" },
                                React.createElement("div", { className: "cart-list" },
                                    React.createElement("table", { className: "table" },
                                        React.createElement("thead", { className: "thead-primary" },
                                            React.createElement("tr", { className: "text-center" },
                                                React.createElement("th", null, "\u00A0"),
                                                React.createElement("th", null, "\u00A0"),
                                                React.createElement("th", null, "Product"),
                                                React.createElement("th", null, "Price"),
                                                React.createElement("th", null, "Quantity"),
                                                React.createElement("th", null, "Total"))),
                                        React.createElement("tbody", null, items.map(function (item, i) { return (React.createElement("tr", { key: i, className: "text-center" },
                                            React.createElement("td", { className: "product-remove" },
                                                React.createElement("span", { onClick: function () { return _this.removeProductFromCart(item.ProductId); }, className: "ion-ios-close" })),
                                            React.createElement("td", { className: "image-prod" },
                                                React.createElement("img", { src: item.Image, className: "img-fluid", alt: "..." })),
                                            React.createElement("td", { className: "product-name" },
                                                React.createElement("h3", null, item.Name)),
                                            React.createElement("td", { className: "price" },
                                                "$",
                                                item.Price),
                                            React.createElement("td", { className: "quantity" },
                                                React.createElement("div", { className: "input-group mb-3" },
                                                    React.createElement("input", { type: "text", name: item.ProductId, className: "quantity form-control input-number", value: _this.getQuantity(item.ProductId), min: "1", max: "100", onChange: _this.handleChange }))),
                                            React.createElement("td", { className: "total" },
                                                "$",
                                                item.Price * _this.getQuantity(item.ProductId)))); })))))),
                        React.createElement("div", { className: "row justify-content-start" },
                            React.createElement("div", { className: "col col-lg-5 col-md-6 mt-5 cart-wrap" },
                                React.createElement("div", { className: "cart-total mb-3" },
                                    React.createElement("h3", null, "Cart Totals"),
                                    React.createElement("p", { className: "d-flex" },
                                        React.createElement("span", null, "Subtotal"),
                                        React.createElement("span", null,
                                            "$",
                                            this.state.subtotal)),
                                    React.createElement("p", { className: "d-flex" },
                                        React.createElement("span", null, "Delivery"),
                                        React.createElement("span", null,
                                            "$",
                                            this.state.delivery)),
                                    React.createElement("hr", null),
                                    React.createElement("p", { className: "d-flex total-price" },
                                        React.createElement("span", null, "Total"),
                                        React.createElement("span", null,
                                            "$",
                                            this.state.total))),
                                React.createElement("p", { className: "text-center" },
                                    React.createElement(react_router_hash_link_1.HashLink, { to: "/checkout", className: "btn btn-primary py-3 px-4", subtotal: this.state.subtotal, delivery: this.state.delivery, total: this.state.total }, "Proceed to Checkout"))))))));
        }
    };
    return Cart;
}(React.Component));
exports.Cart = Cart;
//# sourceMappingURL=PageCart.js.map
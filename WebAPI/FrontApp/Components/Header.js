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
var Dictionary_1 = require("./Dictionary");
var react_router_hash_link_1 = require("react-router-hash-link");
var sfcookies_1 = require("sfcookies");
var react_notifications_1 = require("react-notifications");
require("react-notifications/lib/notifications.css");
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
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        var _this = _super.call(this, props) || this;
        var dictionary = new Dictionary_1.KeyedCollection();
        dictionary.Add(props.Active, 'cta cta-colored');
        var lang = 'en';
        if (sfcookies_1.read_cookie('lang') != null && sfcookies_1.read_cookie('lang').length !== 0) {
            lang = sfcookies_1.read_cookie('lang');
        }
        else {
            sfcookies_1.bake_cookie('lang', lang);
        }
        counterpart.setLocale(lang);
        var currency = 'GBP';
        if (sfcookies_1.read_cookie('currency') != null && sfcookies_1.read_cookie('currency').length !== 0) {
            currency = sfcookies_1.read_cookie('currency');
        }
        else {
            sfcookies_1.bake_cookie('currency', currency);
        }
        _this.state = { email: '', password: '', api_response: '', loggedIn: false, headerDictionary: dictionary, language: lang, currency: currency };
        if (sfcookies_1.read_cookie('token') != null && sfcookies_1.read_cookie('token').length !== 0) {
            _this.checkIfTokenIsValid();
        }
        _this.handleChange = _this.handleChange.bind(_this);
        _this.onLangChange = _this.onLangChange.bind(_this);
        _this.onCurrencyChange = _this.onCurrencyChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.checkIfTokenIsValid = _this.checkIfTokenIsValid.bind(_this);
        _this.signOut = _this.signOut.bind(_this);
        _this.minimizeMenu = _this.minimizeMenu.bind(_this);
        _this.logInScroll = _this.logInScroll.bind(_this);
        return _this;
    }
    Header.prototype.onLangChange = function (event) {
        this.handleChange(event);
        counterpart.setLocale(event.target.value);
        sfcookies_1.delete_cookie('lang');
        sfcookies_1.bake_cookie('lang', event.target.value);
        this.props.reloadPage();
    };
    Header.prototype.onCurrencyChange = function (event) {
        this.handleChange(event);
        sfcookies_1.delete_cookie('currency');
        sfcookies_1.bake_cookie('currency', event.target.value);
        this.props.reloadPage();
    };
    Header.prototype.handleChange = function (event) {
        var _a;
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
    };
    Header.prototype.minimizeMenu = function () {
        document.getElementById('ftco-nav').className = "collapse navbar-collapse";
    };
    Header.prototype.logInScroll = function () {
        window.scrollTo(0, document.body.scrollHeight);
    };
    Header.prototype.handleSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        axios.post(API_Path + '/Auth', {
            email: this.state.email,
            password: this.state.password
        })
            .then(function (response) {
            _this.setState({ email: '', password: '', api_response: response.data, loggedIn: true });
            sfcookies_1.delete_cookie('token');
            sfcookies_1.bake_cookie('token', response.data.token);
        })
            .catch(function (error) {
            _this.setState({ error: error });
            react_notifications_1.NotificationManager.error('Invalid email or password.');
        })
            .then();
    };
    Header.prototype.checkIfTokenIsValid = function () {
        var _this = this;
        axios.post(API_Path + '/AuthToken', {
            token: sfcookies_1.read_cookie('token')
        })
            .then(function (response) {
            _this.setState({ loggedIn: true, api_response: response.data });
        })
            .catch(function (error) {
            sfcookies_1.delete_cookie('token');
        })
            .then();
    };
    Header.prototype.readCartFromCookie = function (cookie) {
        var cartProducts = new Dictionary_1.KeyedCollection();
        for (var prop in cookie.items) {
            cartProducts.Add(parseInt(prop, 10), parseInt(cookie.items[prop], 10));
        }
        return cartProducts;
    };
    Header.prototype.signOut = function () {
        sfcookies_1.delete_cookie('token');
        window.location.reload();
        this.minimizeMenu();
    };
    Header.prototype.render = function () {
        var _a = this.state, headerDictionary = _a.headerDictionary, loggedIn = _a.loggedIn, api_response = _a.api_response;
        var cartProducts = this.readCartFromCookie(sfcookies_1.read_cookie('cartProducts'));
        var cartItemNumber = 0;
        if (cartProducts.Count() > 0) {
            cartItemNumber = cartProducts.Values().reduce(function (result, number) { return result + number; });
        }
        return (React.createElement("div", null,
            React.createElement(react_notifications_1.NotificationContainer, null),
            React.createElement("nav", { className: "navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light", id: "ftco-navbar" },
                React.createElement("div", { className: "container" },
                    React.createElement("a", { className: "navbar-brand", href: "/#/" },
                        React.createElement("img", { src: "images/logo.png" }),
                        " GabrielHabet"),
                    React.createElement("button", { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#ftco-nav", "aria-controls": "ftco-nav", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                        React.createElement("span", { className: "oi oi-menu" }),
                        " Menu"),
                    React.createElement("div", { className: "collapse navbar-collapse", id: "ftco-nav" },
                        React.createElement("ul", { className: "navbar-nav ml-auto" },
                            loggedIn == false &&
                                React.createElement("li", { className: "dropdown nav-item logInMobileNavbar" },
                                    React.createElement("div", { id: "dropdownMenu", "data-toggle": "dropdown", className: "nav-link dropdown" },
                                        React.createElement(Translate, { content: "nav.Login" }),
                                        " ",
                                        React.createElement("span", { className: "caret" })),
                                    React.createElement("ul", { className: "dropdown-content dropdown-menu-right" },
                                        React.createElement("li", { className: "login-dropdown-content px-3 py-2" },
                                            React.createElement("form", { action: "", className: "form", role: "form", onSubmit: this.handleSubmit },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("input", { type: "text", className: "form-control form-control-sm", placeholder: "Email", value: this.state.email, onChange: this.handleChange, name: "email", id: "emailInput", required: true })),
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("input", { id: "passwordInput", placeholder: "Password", value: this.state.password, onChange: this.handleChange, className: "form-control form-control-sm", type: "password", name: "password", required: true })),
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("button", { type: "submit", className: "btn btn-primary btn-block", onClick: this.minimizeMenu },
                                                        React.createElement(Translate, { content: "nav.Login" }))),
                                                React.createElement("div", { className: "form-group text-center" },
                                                    React.createElement("small", null,
                                                        React.createElement("a", { href: "/#/recover_password" },
                                                            React.createElement(Translate, { content: "nav.ForgotPassword" }))),
                                                    React.createElement("small", null,
                                                        React.createElement("a", { href: "/#/register" },
                                                            React.createElement(Translate, { content: "nav.CreateAccount" })))))))),
                            React.createElement("li", { className: "nav-item " + headerDictionary.Item('Home') },
                                React.createElement("a", { href: "/", className: "nav-link" },
                                    React.createElement(Translate, { content: "nav.Home" }))),
                            React.createElement("li", { className: "nav-item dropdown " + headerDictionary.Item('Women') },
                                React.createElement("a", { className: "nav-link dropdown-toggle", href: "/#/home/women", id: "dropdown04", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
                                    React.createElement(Translate, { content: "nav.Women" })),
                                React.createElement("div", { className: "dropdown-content", "aria-labelledby": "dropdown04" },
                                    React.createElement("a", { className: "dropdown-item", href: "/#/home/women-bags", onClick: this.minimizeMenu },
                                        React.createElement(Translate, { content: "nav.Bags" })),
                                    React.createElement("a", { className: "dropdown-item", href: "/#/home/women-accessories", onClick: this.minimizeMenu },
                                        React.createElement(Translate, { content: "nav.Accessories" })))),
                            React.createElement("li", { className: "nav-item dropdown " + headerDictionary.Item('Men') },
                                React.createElement("a", { className: "nav-link dropdown-toggle", href: "/#/home/men", id: "dropdown04", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
                                    React.createElement(Translate, { content: "nav.Men" })),
                                React.createElement("div", { className: "dropdown-content", "aria-labelledby": "dropdown04" },
                                    React.createElement("a", { className: "dropdown-item", href: "/#/home/men-bags", onClick: this.minimizeMenu },
                                        React.createElement(Translate, { content: "nav.Bags" })),
                                    React.createElement("a", { className: "dropdown-item", href: "/#/home/men-accessories", onClick: this.minimizeMenu },
                                        React.createElement(Translate, { content: "nav.Accessories" })))),
                            React.createElement("li", { className: "nav-item " + headerDictionary.Item('Search') },
                                React.createElement("a", { href: "/#/search", className: "nav-link" },
                                    React.createElement(Translate, { content: "nav.Search" }))),
                            React.createElement("li", { className: "nav-item " + headerDictionary.Item('Contact') },
                                React.createElement("a", { href: "/#/contact", className: "nav-link" },
                                    React.createElement(Translate, { content: "nav.Contact" }))),
                            loggedIn ?
                                React.createElement("li", { className: "nav-item " + headerDictionary.Item('Cart') },
                                    React.createElement("a", { href: "/#/cart", className: "nav-link" },
                                        React.createElement("span", { className: "icon-shopping_cart" }),
                                        cartItemNumber))
                                :
                                    React.createElement("li", { className: "dropdown nav-item logInNavbar" },
                                        React.createElement("div", { id: "dropdownMenu", "data-toggle": "dropdown", className: "nav-link dropdown" },
                                            React.createElement(Translate, { content: "nav.Login" }),
                                            " ",
                                            React.createElement("span", { className: "caret" })),
                                        React.createElement("ul", { className: "dropdown-content dropdown-menu-right" },
                                            React.createElement("li", { className: "login-dropdown-content px-3 py-2" },
                                                React.createElement("form", { action: "", className: "form", role: "form", onSubmit: this.handleSubmit },
                                                    React.createElement("div", { className: "form-group" },
                                                        React.createElement("input", { type: "text", className: "form-control form-control-sm", placeholder: "Email", value: this.state.email, onChange: this.handleChange, name: "email", id: "emailInput2", required: true })),
                                                    React.createElement("div", { className: "form-group" },
                                                        React.createElement("input", { id: "passwordInput2", placeholder: "Password", value: this.state.password, onChange: this.handleChange, className: "form-control form-control-sm", type: "password", name: "password", required: true })),
                                                    React.createElement("div", { className: "form-group" },
                                                        React.createElement("button", { type: "submit", className: "btn btn-primary btn-block", onClick: this.minimizeMenu },
                                                            React.createElement(Translate, { content: "nav.Login" }))),
                                                    React.createElement("div", { className: "form-group text-center" },
                                                        React.createElement("small", null,
                                                            React.createElement("a", { href: "/#/recover_password" },
                                                                React.createElement(Translate, { content: "nav.ForgotPassword" }))),
                                                        React.createElement("small", null,
                                                            React.createElement("a", { href: "/#/register" },
                                                                React.createElement(Translate, { content: "nav.CreateAccount" })))))))),
                            loggedIn ?
                                React.createElement("li", { className: "nav-item dropdown " + headerDictionary.Item('Account') },
                                    React.createElement("div", { id: "dropdownMenu", "data-toggle": "dropdown", className: "nav-link dropdown" },
                                        React.createElement(Translate, { content: "nav.Account" }),
                                        React.createElement("span", { className: "caret" })),
                                    React.createElement("div", { className: "dropdown-content", "aria-labelledby": "dropdown04" },
                                        React.createElement(react_router_hash_link_1.NavHashLink, { className: "dropdown-item", to: "/user_details" },
                                            React.createElement(Translate, { content: "nav.EditDetails" })),
                                        React.createElement(react_router_hash_link_1.NavHashLink, { className: "dropdown-item", to: "/change_password" },
                                            React.createElement(Translate, { content: "nav.ChangePassword" })),
                                        React.createElement(react_router_hash_link_1.NavHashLink, { className: "dropdown-item", to: "/orders" },
                                            React.createElement(Translate, { content: "nav.Orders" })),
                                        api_response.role.toUpperCase() === 'ADMIN' ?
                                            React.createElement(react_router_hash_link_1.NavHashLink, { className: "dropdown-item", to: "/add_product" },
                                                React.createElement(Translate, { content: "nav.AddProduct" }))
                                            :
                                                React.createElement("div", null),
                                        api_response.role.toUpperCase() === 'ADMIN' ?
                                            React.createElement(react_router_hash_link_1.NavHashLink, { className: "dropdown-item", to: "/admin_orders" },
                                                React.createElement(Translate, { content: "order.UsersOrders" }))
                                            :
                                                React.createElement("div", null),
                                        React.createElement("a", { href: "/#/", onClick: this.signOut },
                                            React.createElement(Translate, { content: "nav.SignOut" }))))
                                :
                                    React.createElement("div", null),
                            React.createElement("li", { className: "nav-item dropdown header-selector" },
                                React.createElement("select", { style: { backgroundColor: 'transparent', transform: 'translateY(22 %)' }, value: this.state.language, onChange: this.onLangChange, name: "language", id: "language" },
                                    React.createElement("option", { value: "en" }, "En"),
                                    React.createElement("option", { value: "it" }, "It"),
                                    React.createElement("option", { value: "ro" }, "Ro"))),
                            React.createElement("li", { className: "nav-item dropdown header-selector" },
                                React.createElement("select", { style: { backgroundColor: 'transparent', transform: 'translateY(22 %)' }, value: this.state.currency, onChange: this.onCurrencyChange, name: "currency", id: "currency" },
                                    React.createElement("option", { value: "GBP" }, "\u20A4"),
                                    React.createElement("option", { value: "EUR" }, "\u20AC"),
                                    React.createElement("option", { value: "RON" }, "RON")))))))));
    };
    return Header;
}(React.Component));
exports.Header = Header;
//# sourceMappingURL=Header.js.map
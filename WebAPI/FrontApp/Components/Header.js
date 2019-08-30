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
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        var _this = _super.call(this, props) || this;
        var dictionary = new Dictionary_1.KeyedCollection();
        dictionary.Add(props.Active, 'cta cta-colored');
        _this.state = { email: '', password: '', api_response: '', loggedIn: false, headerDictionary: dictionary };
        if (sfcookies_1.read_cookie('token') != null && sfcookies_1.read_cookie('token').length !== 0) {
            _this.checkIfTokenIsValid();
        }
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.checkIfTokenIsValid = _this.checkIfTokenIsValid.bind(_this);
        _this.signOut = _this.signOut.bind(_this);
        return _this;
    }
    Header.prototype.handleChange = function (event) {
        var _a;
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
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
    Header.prototype.signOut = function () {
        sfcookies_1.delete_cookie('token');
        window.location.reload();
    };
    Header.prototype.render = function () {
        var _a = this.state, headerDictionary = _a.headerDictionary, loggedIn = _a.loggedIn, api_response = _a.api_response;
        var cartItemNumber = sfcookies_1.read_cookie('cartProducts').count;
        return (React.createElement("div", null,
            React.createElement(react_notifications_1.NotificationContainer, null),
            React.createElement("nav", { className: "navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light", id: "ftco-navbar" },
                React.createElement("div", { className: "container" },
                    React.createElement("a", { className: "navbar-brand", href: "/#/" }, "GabrielHabet"),
                    React.createElement("button", { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#ftco-nav", "aria-controls": "ftco-nav", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                        React.createElement("span", { className: "oi oi-menu" }),
                        " Menu"),
                    React.createElement("div", { className: "collapse navbar-collapse", id: "ftco-nav" },
                        React.createElement("ul", { className: "navbar-nav ml-auto" },
                            React.createElement("li", { className: "nav-item " + headerDictionary.Item('Home') },
                                React.createElement("a", { href: "/", className: "nav-link" }, "Home")),
                            React.createElement("li", { className: "nav-item dropdown " + headerDictionary.Item('Women') },
                                React.createElement(react_router_hash_link_1.HashLink, { className: "nav-link dropdown-toggle", to: "#Women-section", id: "dropdown04", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, "Women"),
                                React.createElement("div", { className: "dropdown-content", "aria-labelledby": "dropdown04" },
                                    React.createElement(react_router_hash_link_1.HashLink, { className: "dropdown-item", to: "#Women-Bags-section" }, "Bags"),
                                    React.createElement(react_router_hash_link_1.HashLink, { className: "dropdown-item", to: "#Women-Belts-section" }, "Belts"))),
                            React.createElement("li", { className: "nav-item dropdown " + headerDictionary.Item('Men') },
                                React.createElement(react_router_hash_link_1.HashLink, { className: "nav-link dropdown-toggle", to: "#Men-section", id: "dropdown04", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, "Men"),
                                React.createElement("div", { className: "dropdown-content", "aria-labelledby": "dropdown04" },
                                    React.createElement(react_router_hash_link_1.HashLink, { className: "dropdown-item", to: "#Men-Bags-section" }, "Bags"),
                                    React.createElement(react_router_hash_link_1.HashLink, { className: "dropdown-item", to: "#Men-Belts-section" }, "Belts"))),
                            React.createElement("li", { className: "nav-item " + headerDictionary.Item('Search') },
                                React.createElement("a", { href: "/#/search", className: "nav-link" }, "Search")),
                            React.createElement("li", { className: "nav-item " + headerDictionary.Item('Contact') },
                                React.createElement("a", { href: "/#/contact", className: "nav-link" }, "Contact")),
                            loggedIn ?
                                React.createElement("li", { className: "nav-item " + headerDictionary.Item('Cart') },
                                    React.createElement("a", { href: "/#/cart", className: "nav-link" },
                                        React.createElement("span", { className: "icon-shopping_cart" }),
                                        cartItemNumber))
                                :
                                    React.createElement("li", { className: "dropdown nav-item" },
                                        React.createElement("div", { id: "dropdownMenu", "data-toggle": "dropdown", className: "nav-link dropdown" },
                                            "Login ",
                                            React.createElement("span", { className: "caret" })),
                                        React.createElement("ul", { className: "dropdown-content dropdown-menu-right" },
                                            React.createElement("li", { className: "login-dropdown-content px-3 py-2" },
                                                React.createElement("form", { action: "", className: "form", role: "form", onSubmit: this.handleSubmit },
                                                    React.createElement("div", { className: "form-group" },
                                                        React.createElement("input", { type: "text", className: "form-control form-control-sm", placeholder: "Email", value: this.state.email, onChange: this.handleChange, name: "email", id: "emailInput", required: true })),
                                                    React.createElement("div", { className: "form-group" },
                                                        React.createElement("input", { id: "passwordInput", placeholder: "Password", value: this.state.password, onChange: this.handleChange, className: "form-control form-control-sm", type: "password", name: "password", required: true })),
                                                    React.createElement("div", { className: "form-group" },
                                                        React.createElement("button", { type: "submit", className: "btn btn-primary btn-block" }, "Login")),
                                                    React.createElement("div", { className: "form-group text-center" },
                                                        React.createElement("small", null,
                                                            React.createElement("a", { href: "/#/recover_password" }, "Forgot password?")),
                                                        React.createElement("small", null,
                                                            React.createElement("a", { href: "/#/register" }, "Create account"))))))),
                            loggedIn ?
                                React.createElement("li", { className: "nav-item dropdown " + headerDictionary.Item('Account') },
                                    React.createElement("div", { id: "dropdownMenu", "data-toggle": "dropdown", className: "nav-link dropdown" },
                                        "Account",
                                        React.createElement("span", { className: "caret" })),
                                    React.createElement("div", { className: "dropdown-content", "aria-labelledby": "dropdown04" },
                                        React.createElement(react_router_hash_link_1.HashLink, { className: "dropdown-item", to: "/user_details" }, "Edit details"),
                                        React.createElement(react_router_hash_link_1.HashLink, { className: "dropdown-item", to: "/change_password" }, "Change password"),
                                        api_response.role == 'admin' ?
                                            React.createElement(react_router_hash_link_1.HashLink, { className: "dropdown-item", to: "/add_product" }, "Add product")
                                            :
                                                React.createElement("div", null),
                                        React.createElement("a", { href: "/#/", onClick: this.signOut }, "SignOut")))
                                :
                                    React.createElement("div", null)))))));
    };
    return Header;
}(React.Component));
exports.Header = Header;
//# sourceMappingURL=Header.js.map
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
var ChangePassword = /** @class */ (function (_super) {
    __extends(ChangePassword, _super);
    function ChangePassword(props) {
        var _this = _super.call(this, props) || this;
        var dictionary = new Dictionary_1.KeyedCollection();
        dictionary.Add(props.Active, 'cta cta-colored');
        counterpart.setLocale(sfcookies_1.read_cookie('lang'));
        _this.state = { password: '', confirm_password: '', waitingResponse: false, language: sfcookies_1.read_cookie('lang') };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.reloadPage = _this.reloadPage.bind(_this);
        return _this;
    }
    ChangePassword.prototype.handleChange = function (event) {
        var _a;
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
    };
    ChangePassword.prototype.handleSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.state.password == this.state.confirm_password && sfcookies_1.read_cookie('token') != null && sfcookies_1.read_cookie('token').length !== 0) {
            if (this.state.waitingResponse == false) {
                this.setState({ waitingResponse: true });
            }
            axios.post(API_Path + '/ChangePassword', {
                password: this.state.password
            }, {
                headers: {
                    token: sfcookies_1.read_cookie('token') //the token is a variable which holds the token
                }
            })
                .then(function (response) {
                react_notifications_1.NotificationManager.success(response.data.message);
                _this.setState({ password: '', confirm_password: '' });
            })
                .catch(function (error) {
                _this.setState({ error: error, confirm_password: '' });
                react_notifications_1.NotificationManager.error("Request failed. Please, try again later.");
            })
                .then(function () {
                _this.setState({ waitingResponse: false });
            });
        }
        else {
            react_notifications_1.NotificationManager.error("Passwords don't match!");
        }
    };
    ChangePassword.prototype.reloadPage = function () {
        //do nothing
    };
    ChangePassword.prototype.render = function () {
        var waitingResponse = this.state.waitingResponse;
        return (React.createElement("main", { id: "main" },
            waitingResponse ? React.createElement("div", { className: "loading" }, "Loading\u2026") : React.createElement("div", null),
            React.createElement("div", null,
                React.createElement(Header_1.Header, { reloadPage: this.reloadPage }),
                React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" } },
                    " }}>",
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                            React.createElement("div", { className: "col-md-9 text-center" },
                                React.createElement("h1", { className: "mb-0 bread" },
                                    React.createElement(Translate, { content: 'user.ChangePassword' })))))),
                React.createElement("section", { className: "ftco-section" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row justify-content-center" },
                            React.createElement("div", { className: "col-xl-10" },
                                React.createElement("form", { action: "", className: "billing-form", onSubmit: this.handleSubmit },
                                    React.createElement("h3", { className: "mb-4 billing-heading" },
                                        React.createElement(Translate, { content: 'user.LogInDetails' })),
                                    React.createElement("div", { className: "row align-items-end" },
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "lastname" },
                                                    React.createElement(Translate, { content: 'user.NewPassword' })),
                                                React.createElement("input", { type: "password", className: "form-control", placeholder: "", value: this.state.password, onChange: this.handleChange, name: "password", id: "password", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "lastname" },
                                                    React.createElement(Translate, { content: 'user.ConfirmPassword' })),
                                                React.createElement("input", { type: "password", className: "form-control", placeholder: "", value: this.state.confirm_password, onChange: this.handleChange, name: "confirm_password", id: "confirm_password", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement(Translate, { component: "input", attributes: { value: 'user.ChangePassword', }, type: "submit", className: "btn btn-primary py-3 px-5" }))))))))))));
    };
    return ChangePassword;
}(React.Component));
exports.ChangePassword = ChangePassword;
//# sourceMappingURL=PageChangePassword.js.map
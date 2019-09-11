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
var react_notifications_1 = require("react-notifications");
require("react-notifications/lib/notifications.css");
var sfcookies_1 = require("sfcookies");
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
var RecoverPassword = /** @class */ (function (_super) {
    __extends(RecoverPassword, _super);
    function RecoverPassword(props) {
        var _this = _super.call(this, props) || this;
        var dictionary = new Dictionary_1.KeyedCollection();
        dictionary.Add(props.Active, 'cta cta-colored');
        counterpart.setLocale(sfcookies_1.read_cookie('lang'));
        _this.state = { email: '', api_response: '', waitingResponse: false, language: sfcookies_1.read_cookie('lang') };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.langaugeChanged = _this.langaugeChanged.bind(_this);
        return _this;
    }
    RecoverPassword.prototype.handleChange = function (event) {
        var _a;
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
    };
    RecoverPassword.prototype.handleSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.state.waitingResponse == false) {
            this.setState({ waitingResponse: true });
        }
        axios.post(API_Path + '/Recover', {
            email: this.state.email
        })
            .then(function (response) {
        })
            .catch(function (error) {
        })
            .then(function () {
            _this.setState({ waitingResponse: false });
            react_notifications_1.NotificationManager.info("If you supplied a correct email address then an email should have been sent to you. It contains easy instructions to confirm and complete this password change.");
            _this.setState({ email: '' });
        });
    };
    RecoverPassword.prototype.langaugeChanged = function () {
        //do nothing
    };
    RecoverPassword.prototype.render = function () {
        var waitingResponse = this.state.waitingResponse;
        return (React.createElement("main", { id: "main" },
            waitingResponse ? React.createElement("div", { className: "loading" }, "Loading\u2026") : React.createElement("div", null),
            React.createElement("div", null,
                React.createElement(Header_1.Header, { langaugeChanged: this.langaugeChanged }),
                React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                    React.createElement("div", { className: "row justify-content-center mb-3 pb-3" },
                        React.createElement("div", { className: "col-md-12 heading-section text-center" },
                            React.createElement("h1", { className: "mb-4" },
                                React.createElement(Translate, { content: 'user.RecoverPassword' }))))),
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
                                                React.createElement("label", { htmlFor: "firstname" },
                                                    React.createElement(Translate, { content: 'user.Email' })),
                                                React.createElement("input", { type: "email", className: "form-control", placeholder: "", value: this.state.email, onChange: this.handleChange, name: "email", id: "email", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("input", { type: "submit", value: "Recover", className: "btn btn-primary py-3 px-5" }))))))))))));
    };
    return RecoverPassword;
}(React.Component));
exports.RecoverPassword = RecoverPassword;
//# sourceMappingURL=PageRecoverPassword.js.map
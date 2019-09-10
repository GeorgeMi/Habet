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
var Translate = require("react-translate-component");
var sfcookies_1 = require("sfcookies");
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
var Contact = /** @class */ (function (_super) {
    __extends(Contact, _super);
    function Contact(props) {
        var _this = _super.call(this, props) || this;
        counterpart.setLocale(sfcookies_1.read_cookie('lang'));
        _this.state = { name: '', email: '', subject: '', message: '', api_response: '', request_sent: false, language: sfcookies_1.read_cookie('lang') };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    Contact.prototype.handleChange = function (event) {
        var _a;
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
    };
    Contact.prototype.handleSubmit = function (event) {
        var _this = this;
        var x = this.state;
        console.log(x);
        event.preventDefault();
        axios.post(API_Path + '/Contact', {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message
        })
            .then(function (response) {
            _this.setState({ name: '', email: '', subject: '', message: '', api_response: response.data.data, request_sent: true });
        })
            .catch(function (error) {
            _this.setState({ isLoaded: true, error: error, request_sent: true });
        })
            .then();
    };
    Contact.prototype.render = function () {
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, request_sent = _a.request_sent;
        if (error) {
            console.log(error);
            return React.createElement("div", null,
                "Error: ",
                error.message);
        }
        else if (!isLoaded && request_sent) {
            return React.createElement("div", { className: "loading" }, "Loading\u2026");
        }
        else {
            return (React.createElement("div", null,
                React.createElement(Header_1.Header, { Active: 'Contact' }),
                React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                    React.createElement("div", { className: "row justify-content-center mb-3 pb-3" },
                        React.createElement("div", { className: "col-md-12 heading-section text-center" },
                            React.createElement("h2", { className: "mb-4" },
                                React.createElement(Translate, { content: 'contact.Title' })),
                            React.createElement("p", null,
                                React.createElement(Translate, { content: 'contact.Subtitle' }))))),
                React.createElement("section", { className: "ftco-section contact-section bg-light" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row d-flex mb-5 contact-info" },
                            React.createElement("div", { className: "w-100" }),
                            React.createElement("div", { className: "col-md-4 d-flex" },
                                React.createElement("div", { className: "info bg-white p-4" },
                                    React.createElement("p", null,
                                        React.createElement("span", null,
                                            React.createElement(Translate, { content: 'contact.Address' }),
                                            ":"),
                                        " 73 Somerfield Rd, Manchester M9 8AQ, UK"))),
                            React.createElement("div", { className: "col-md-4 d-flex" },
                                React.createElement("div", { className: "info bg-white p-4" },
                                    React.createElement("p", null,
                                        React.createElement("span", null,
                                            React.createElement(Translate, { content: 'contact.Phone' }),
                                            ":"),
                                        " ",
                                        React.createElement("a", { href: "tel:+441612582629" }, "+44 161 258 2629")))),
                            React.createElement("div", { className: "col-md-4 d-flex" },
                                React.createElement("div", { className: "info bg-white p-4" },
                                    React.createElement("p", null,
                                        React.createElement("span", null,
                                            React.createElement(Translate, { content: 'contact.Email' }),
                                            ":"),
                                        " ",
                                        React.createElement("a", { href: "mailto:habetgabriel@gmail.com" }, "habetgabriel@gmail.com"))))),
                        React.createElement("div", { className: "row block-9" },
                            React.createElement("div", { className: "col-md-12 order-md-last d-flex" },
                                React.createElement("form", { action: "", className: "bg-white p-5 contact-form", onSubmit: this.handleSubmit },
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("input", { type: "text", className: "form-control", placeholder: "Your Name", value: this.state.name, onChange: this.handleChange, name: "name", id: "name", pattern: ".{3,}", required: true })),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("input", { type: "text", className: "form-control", placeholder: "Your Email", value: this.state.email, onChange: this.handleChange, name: "email", id: "email", required: true })),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("input", { type: "text", className: "form-control", placeholder: "Subject", value: this.state.subject, onChange: this.handleChange, name: "subject", id: "subject", required: true, pattern: ".{3,}" })),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("textarea", { className: "form-control", placeholder: "Message", value: this.state.message, onChange: this.handleChange, name: "message", id: "message", required: true })),
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("input", { type: "submit", value: "Send Message", className: "btn btn-primary py-3 px-5" })))))))));
        }
    };
    return Contact;
}(React.Component));
exports.Contact = Contact;
//# sourceMappingURL=PageContact.js.map
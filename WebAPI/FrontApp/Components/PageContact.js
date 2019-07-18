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
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var Contact = /** @class */ (function (_super) {
    __extends(Contact, _super);
    function Contact(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { name: '', email: '', subject: '', message: '', api_response: '' };
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
            _this.setState({ name: '', email: '', subject: '', message: '', api_response: response.data });
        })
            .catch(function (error) {
            _this.setState({ isLoaded: true, error: error });
        })
            .then();
    };
    Contact.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Header_1.Header, { Active: 'Contact' }),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("section", { id: "contact", className: "section-bg wow fadeInUp" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "section-header" },
                        React.createElement("h3", null, "Contact our Support and Sales team"),
                        React.createElement("p", null, "Our team is happy to answer your questions. Fill out the form and we\u2019ll be in touch as soon as possible.")),
                    React.createElement("div", { className: "row contact-info" },
                        React.createElement("div", { className: "col-md-4" },
                            React.createElement("div", { className: "contact-address" },
                                React.createElement("i", { className: "ion-ios-location-outline" }),
                                React.createElement("h3", null, "Address"),
                                React.createElement("address", null, "73 Somerfield Rd, Manchester M9 8AQ, UK"))),
                        React.createElement("div", { className: "col-md-4" },
                            React.createElement("div", { className: "contact-phone" },
                                React.createElement("i", { className: "ion-ios-telephone-outline" }),
                                React.createElement("h3", null, "Phone Number"),
                                React.createElement("p", null,
                                    React.createElement("a", { href: "tel:+441612582629" }, "+44 161 258 2629")))),
                        React.createElement("div", { className: "col-md-4" },
                            React.createElement("div", { className: "contact-email" },
                                React.createElement("i", { className: "ion-ios-email-outline" }),
                                React.createElement("h3", null, "Email"),
                                React.createElement("p", null,
                                    React.createElement("a", { href: "mailto:habetgabriel@gmail.com" }, "habetgabriel@gmail.com"))))),
                    React.createElement("div", { className: "form" },
                        React.createElement("div", { id: "sendmessage" }, "Your message has been sent. Thank you!"),
                        React.createElement("div", { id: "errormessage" }),
                        React.createElement("form", { action: "", method: "post", role: "form", className: "contactForm", onSubmit: this.handleSubmit },
                            React.createElement("div", { className: "form-row" },
                                React.createElement("div", { className: "form-group col-md-6" },
                                    React.createElement("input", { type: "text", name: "name", value: this.state.name, onChange: this.handleChange, className: "form-control", id: "name", placeholder: "Your Name", pattern: ".{3,}", required: true }),
                                    React.createElement("div", { className: "validation" })),
                                React.createElement("div", { className: "form-group col-md-6" },
                                    React.createElement("input", { type: "email", className: "form-control", name: "email", value: this.state.email, onChange: this.handleChange, id: "email", placeholder: "Your Email", required: true }),
                                    React.createElement("div", { className: "validation" }))),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("input", { type: "text", className: "form-control", name: "subject", value: this.state.subject, onChange: this.handleChange, id: "subject", placeholder: "Subject", pattern: ".{3,}", required: true }),
                                React.createElement("div", { className: "validation" })),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("textarea", { className: "form-control", name: "message", value: this.state.message, onChange: this.handleChange, "data-msg": "Please write something for us", placeholder: "Message", required: true }, " "),
                                React.createElement("div", { className: "validation" })),
                            React.createElement("div", { className: "text-center" },
                                React.createElement("button", { type: "submit" }, "Send Message"))))))));
    };
    return Contact;
}(React.Component));
exports.Contact = Contact;
//# sourceMappingURL=PageContact.js.map
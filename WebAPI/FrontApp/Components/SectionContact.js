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
var React = require('react');
var SectionContact = /** @class */ (function (_super) {
    __extends(SectionContact, _super);
    function SectionContact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SectionContact.prototype.render = function () {
        return (React.createElement("section", { id: "contact", class: "section-bg wow fadeInUp" },
            React.createElement("div", { class: "container" },
                React.createElement("div", { class: "section-header" },
                    React.createElement("h3", null, "Contact Us"),
                    React.createElement("p", null, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque")),
                React.createElement("div", { class: "row contact-info" },
                    React.createElement("div", { class: "col-md-4" },
                        React.createElement("div", { class: "contact-address" },
                            React.createElement("i", { class: "ion-ios-location-outline" }),
                            React.createElement("h3", null, "Address"),
                            React.createElement("address", null, "A108 Adam Street, NY 535022, USA"))),
                    React.createElement("div", { class: "col-md-4" },
                        React.createElement("div", { class: "contact-phone" },
                            React.createElement("i", { class: "ion-ios-telephone-outline" }),
                            React.createElement("h3", null, "Phone Number"),
                            React.createElement("p", null,
                                React.createElement("a", { href: "tel:+155895548855" }, "+1 5589 55488 55")))),
                    React.createElement("div", { class: "col-md-4" },
                        React.createElement("div", { class: "contact-email" },
                            React.createElement("i", { class: "ion-ios-email-outline" }),
                            React.createElement("h3", null, "Email"),
                            React.createElement("p", null,
                                React.createElement("a", { href: "mailto:info@example.com" }, "info@example.com"))))),
                React.createElement("div", { class: "form" },
                    React.createElement("div", { id: "sendmessage" }, "Your message has been sent. Thank you!"),
                    React.createElement("div", { id: "errormessage" }),
                    React.createElement("form", { action: "", method: "post", role: "form", class: "contactForm" },
                        React.createElement("div", { class: "form-row" },
                            React.createElement("div", { class: "form-group col-md-6" },
                                React.createElement("input", { type: "text", name: "name", class: "form-control", id: "name", placeholder: "Your Name", "data-rule": "minlen:4", "data-msg": "Please enter at least 4 chars" }),
                                React.createElement("div", { class: "validation" })),
                            React.createElement("div", { class: "form-group col-md-6" },
                                React.createElement("input", { type: "email", class: "form-control", name: "email", id: "email", placeholder: "Your Email", "data-rule": "email", "data-msg": "Please enter a valid email" }),
                                React.createElement("div", { class: "validation" }))),
                        React.createElement("div", { class: "form-group" },
                            React.createElement("input", { type: "text", class: "form-control", name: "subject", id: "subject", placeholder: "Subject", "data-rule": "minlen:4", "data-msg": "Please enter at least 8 chars of subject" }),
                            React.createElement("div", { class: "validation" })),
                        React.createElement("div", { class: "form-group" },
                            React.createElement("textarea", { class: "form-control", name: "message", rows: "5", "data-rule": "required", "data-msg": "Please write something for us", placeholder: "Message" }),
                            React.createElement("div", { class: "validation" })),
                        React.createElement("div", { class: "text-center" },
                            React.createElement("button", { type: "submit" }, "Send Message")))))));
    };
    return SectionContact;
}(React.Component));
exports.SectionContact = SectionContact;
//# sourceMappingURL=SectionContact.js.map
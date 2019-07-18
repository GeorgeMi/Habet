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
var react_router_hash_link_1 = require("react-router-hash-link");
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        return (React.createElement("footer", { id: "footer" },
            React.createElement("div", { className: "footer-top" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-lg-3 col-md-6 footer-info" },
                            React.createElement("h4", null, "GabrielHabet"),
                            React.createElement("p", null, "Butterfly Gabriel Habet is a fashion brand mainly known for its bag and belt designs for both women and men.")),
                        React.createElement("div", { className: "col-lg-3 col-md-6 footer-links" },
                            React.createElement("h4", null, "Useful Links"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("i", { className: "ion-ios-arrow-right" }),
                                    " ",
                                    React.createElement("a", { href: "#" }, "Home")),
                                React.createElement("li", null,
                                    React.createElement("i", { className: "ion-ios-arrow-right" }),
                                    " ",
                                    React.createElement(react_router_hash_link_1.HashLink, { to: "#Women-section" }, "Women")),
                                React.createElement("li", null,
                                    React.createElement("i", { className: "ion-ios-arrow-right" }),
                                    " ",
                                    React.createElement(react_router_hash_link_1.HashLink, { to: "#Men-section" }, "Men")),
                                React.createElement("li", null,
                                    React.createElement("i", { className: "ion-ios-arrow-right" }),
                                    " ",
                                    React.createElement("a", { href: "/#/contact" }, "Contact")),
                                React.createElement("li", null,
                                    React.createElement("i", { className: "ion-ios-arrow-right" }),
                                    " ",
                                    React.createElement("a", { href: "/#/logIn" }, "LogIn")))),
                        React.createElement("div", { className: "col-lg-3 col-md-6 footer-contact" },
                            React.createElement("h4", null, "Contact Us"),
                            React.createElement("p", null,
                                "73 Somerfield Rd ",
                                React.createElement("br", null),
                                "Manchester M9 8AQ",
                                React.createElement("br", null),
                                "United Kingdom ",
                                React.createElement("br", null),
                                React.createElement("strong", null, "Phone:"),
                                " +44 161 258 2629",
                                React.createElement("br", null),
                                React.createElement("strong", null, "Email:"),
                                " habetgabriel@gmail.com",
                                React.createElement("br", null)),
                            React.createElement("div", { className: "social-links" },
                                React.createElement("a", { href: "#", className: "twitter" },
                                    React.createElement("i", { className: "fa fa-twitter" })),
                                React.createElement("a", { href: "https://www.facebook.com/butterflygabrielhabet/", className: "facebook" },
                                    React.createElement("i", { className: "fa fa-facebook" })),
                                React.createElement("a", { href: "#", className: "instagram" },
                                    React.createElement("i", { className: "fa fa-instagram" })),
                                React.createElement("a", { href: "#", className: "google-plus" },
                                    React.createElement("i", { className: "fa fa-google-plus" })),
                                React.createElement("a", { href: "https://www.linkedin.com/in/gabriel-habet-b27a9bba/", className: "linkedin" },
                                    React.createElement("i", { className: "fa fa-linkedin" })))),
                        React.createElement("div", { className: "col-lg-3 col-md-6 footer-newsletter" },
                            React.createElement("h4", null, "Our Newsletter"),
                            React.createElement("p", null, "I would like to receive emails from GabrielHabet with updates and special offers of GabrielHabet. I can unsubscribe any time by clicking the unsubscribe link in the email."),
                            React.createElement("form", { action: "", method: "post" },
                                React.createElement("input", { type: "email", name: "email" }),
                                React.createElement("input", { type: "submit", value: "Subscribe" })))))),
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "copyright" },
                    "\u00A9 Made by ",
                    React.createElement("strong", null, "George Miron"),
                    " \u00A9 2019. All Rights Reserved"),
                React.createElement("div", { className: "credits" }))));
    };
    return Footer;
}(React.Component));
exports.Footer = Footer;
//# sourceMappingURL=Footer.js.map
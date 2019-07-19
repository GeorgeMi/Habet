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
        return (React.createElement("footer", { className: "ftco-footer ftco-section" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "mouse" },
                        React.createElement("a", { href: "#", className: "mouse-icon" },
                            React.createElement("div", { className: "mouse-wheel" },
                                React.createElement("span", { className: "ion-ios-arrow-up" }))))),
                React.createElement("div", { className: "row mb-5" },
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("div", { className: "ftco-footer-widget mb-4" },
                            React.createElement("h2", { className: "ftco-heading-2" }, "GabrielHabet"),
                            React.createElement("p", null, "Butterfly Gabriel Habet is a fashion brand mainly known for its bag and belt designs for both women and men."),
                            React.createElement("ul", { className: "ftco-footer-social list-unstyled float-md-left float-lft mt-5" },
                                React.createElement("li", { className: "ftco-animate" },
                                    React.createElement("a", { href: "#" },
                                        React.createElement("span", { className: "icon-twitter" }))),
                                React.createElement("li", { className: "ftco-animate" },
                                    React.createElement("a", { href: "https://www.facebook.com/butterflygabrielhabet/" },
                                        React.createElement("span", { className: "icon-facebook" }))),
                                React.createElement("li", { className: "ftco-animate" },
                                    React.createElement("a", { href: "#" },
                                        React.createElement("span", { className: "icon-instagram" })))))),
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("div", { className: "ftco-footer-widget mb-4 ml-md-5" },
                            React.createElement("h2", { className: "ftco-heading-2" }, "Menu"),
                            React.createElement("ul", { className: "list-unstyled" },
                                React.createElement("li", null,
                                    React.createElement("a", { href: "/", className: "py-2 d-block" }, "Home")),
                                React.createElement("li", null,
                                    React.createElement(react_router_hash_link_1.HashLink, { to: "#Women-section", className: "py-2 d-block" }, "Women")),
                                React.createElement("li", null,
                                    React.createElement(react_router_hash_link_1.HashLink, { to: "#Men-section", className: "py-2 d-block" }, "Men")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "/#/contact", className: "py-2 d-block" }, "Contact")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "/#/logIn", className: "py-2 d-block" }, "LogIn"))))),
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("div", { className: "ftco-footer-widget mb-4" },
                            React.createElement("h2", { className: "ftco-heading-2" }, "Contact Us"),
                            React.createElement("div", { className: "d-flex" },
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
                                    React.createElement("br", null))))),
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("div", { className: "ftco-footer-widget mb-4" },
                            React.createElement("h2", { className: "ftco-heading-2" }, "Our Newsletter"),
                            React.createElement("div", { className: "block-23 mb-3" },
                                React.createElement("p", null, "I would like to receive emails from GabrielHabet with updates and special offers of GabrielHabet. I can unsubscribe any time by clicking the unsubscribe link in the email."),
                                React.createElement("form", { action: "", method: "post" },
                                    React.createElement("div", { className: "input-group" },
                                        React.createElement("input", { type: "email", name: "email" }),
                                        React.createElement("span", { className: "input-group-btn" },
                                            React.createElement("button", { className: "btn btn-info" }, "Subscribe")))))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-12 text-center" },
                        React.createElement("div", { className: "copyright" },
                            "\u00A9 Made by ",
                            React.createElement("strong", null, "George Miron"),
                            " \u00A9 2019. All Rights Reserved"))))));
    };
    return Footer;
}(React.Component));
exports.Footer = Footer;
//# sourceMappingURL=Footer.js.map
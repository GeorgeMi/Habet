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
var Checkout = /** @class */ (function (_super) {
    __extends(Checkout, _super);
    function Checkout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Checkout.prototype.render = function () {
        return (React.createElement("main", { id: "main" },
            React.createElement("div", null,
                React.createElement(Header_1.Header, null),
                React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                            React.createElement("div", { className: "col-md-9 text-center" },
                                React.createElement("h1", { className: "mb-0 bread" }, "Checkout"))))),
                React.createElement("section", { className: "ftco-section" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row justify-content-center" },
                            React.createElement("div", { className: "col-xl-10" },
                                React.createElement("form", { action: "#", className: "billing-form" },
                                    React.createElement("h3", { className: "mb-4 billing-heading" }, "Billing Details"),
                                    React.createElement("div", { className: "row align-items-end" },
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "firstname" }, "Firt Name"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "" }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "lastname" }, "Last Name"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "" }))),
                                        React.createElement("div", { className: "w-100" }),
                                        React.createElement("div", { className: "col-md-12" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "country" }, "State / Country"),
                                                React.createElement("div", { className: "select-wrap" },
                                                    React.createElement("div", { className: "icon" },
                                                        React.createElement("span", { className: "ion-ios-arrow-down" })),
                                                    React.createElement("select", { name: "", id: "", className: "form-control" },
                                                        React.createElement("option", { value: "" }, "France"),
                                                        React.createElement("option", { value: "" }, "Italy"),
                                                        React.createElement("option", { value: "" }, "Philippines"),
                                                        React.createElement("option", { value: "" }, "South Korea"),
                                                        React.createElement("option", { value: "" }, "Hongkong"),
                                                        React.createElement("option", { value: "" }, "Japan"))))),
                                        React.createElement("div", { className: "w-100" }),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "streetaddress" }, "Street Address"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "House number and street name" }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "Appartment, suite, unit etc: (optional)" }))),
                                        React.createElement("div", { className: "w-100" }),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "towncity" }, "Town / City"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "" }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "postcodezip" }, "Postcode / ZIP *"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "" }))),
                                        React.createElement("div", { className: "w-100" }),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "phone" }, "Phone"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "" }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "emailaddress" }, "Email Address"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "" }))),
                                        React.createElement("div", { className: "w-100" }),
                                        React.createElement("div", { className: "col-md-12" },
                                            React.createElement("div", { className: "form-group mt-4" },
                                                React.createElement("div", { className: "radio" },
                                                    React.createElement("label", { className: "mr-3" },
                                                        React.createElement("input", { type: "radio", name: "optradio" }),
                                                        " Create an Account? "),
                                                    React.createElement("label", null,
                                                        React.createElement("input", { type: "radio", name: "optradio" }),
                                                        " Ship to different address")))))),
                                React.createElement("div", { className: "row mt-5 pt-3 d-flex" },
                                    React.createElement("div", { className: "col-md-6 d-flex" },
                                        React.createElement("div", { className: "cart-detail cart-total bg-light p-3 p-md-4" },
                                            React.createElement("h3", { className: "billing-heading mb-4" }, "Cart Total"),
                                            React.createElement("p", { className: "d-flex" },
                                                React.createElement("span", null, "Subtotal"),
                                                React.createElement("span", null, "$20.60")),
                                            React.createElement("p", { className: "d-flex" },
                                                React.createElement("span", null, "Delivery"),
                                                React.createElement("span", null, "$0.00")),
                                            React.createElement("p", { className: "d-flex" },
                                                React.createElement("span", null, "Discount"),
                                                React.createElement("span", null, "$3.00")),
                                            React.createElement("hr", null),
                                            React.createElement("p", { className: "d-flex total-price" },
                                                React.createElement("span", null, "Total"),
                                                React.createElement("span", null, "$17.60")))),
                                    React.createElement("div", { className: "col-md-6" },
                                        React.createElement("div", { className: "cart-detail bg-light p-3 p-md-4" },
                                            React.createElement("h3", { className: "billing-heading mb-4" }, "Payment Method"),
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("div", { className: "col-md-12" },
                                                    React.createElement("div", { className: "radio" },
                                                        React.createElement("label", null,
                                                            React.createElement("input", { type: "radio", name: "optradio", className: "mr-2" }),
                                                            " Direct Bank Tranfer")))),
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("div", { className: "col-md-12" },
                                                    React.createElement("div", { className: "radio" },
                                                        React.createElement("label", null,
                                                            React.createElement("input", { type: "radio", name: "optradio", className: "mr-2" }),
                                                            " Check Payment")))),
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("div", { className: "col-md-12" },
                                                    React.createElement("div", { className: "radio" },
                                                        React.createElement("label", null,
                                                            React.createElement("input", { type: "radio", name: "optradio", className: "mr-2" }),
                                                            " Paypal")))),
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("div", { className: "col-md-12" },
                                                    React.createElement("div", { className: "checkbox" },
                                                        React.createElement("label", null,
                                                            React.createElement("input", { type: "checkbox", value: "", className: "mr-2" }),
                                                            " I have read and accept the terms and conditions")))),
                                            React.createElement("p", null,
                                                React.createElement("a", { href: "#", className: "btn btn-primary py-3 px-4" }, "Place an order"))))))))))));
    };
    return Checkout;
}(React.Component));
exports.Checkout = Checkout;
//# sourceMappingURL=PageCheckout.js.map
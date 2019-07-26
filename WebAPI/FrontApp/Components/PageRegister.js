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
var Register = /** @class */ (function (_super) {
    __extends(Register, _super);
    function Register() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Register.prototype.render = function () {
        return (React.createElement("main", { id: "main" },
            React.createElement("div", null,
                React.createElement(Header_1.Header, null),
                React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                            React.createElement("div", { className: "col-md-9 text-center" },
                                React.createElement("h1", { className: "mb-0 bread" }, "Register"))))),
                React.createElement("section", { className: "ftco-section" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row justify-content-center" },
                            React.createElement("div", { className: "col-xl-10" },
                                React.createElement("form", { action: "#", className: "billing-form" },
                                    React.createElement("h3", { className: "mb-4 billing-heading" }, "LogIn Details"),
                                    React.createElement("div", { className: "row align-items-end" },
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "firstname" }, "Email"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "" }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "lastname" }, "Password"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "" })))),
                                    React.createElement("h3", { className: "mb-4 billing-heading" }, "Personal Details"),
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
                                        React.createElement("div", { className: "col-md-6" },
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
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "towncity" }, "Town / City"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "" }))),
                                        React.createElement("div", { className: "w-100" }),
                                        React.createElement("div", { className: "col-md-12" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "streetaddress" }, "Street Address"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "Street Address" }))),
                                        React.createElement("div", { className: "w-100" }),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "postcodezip" }, "Postcode / ZIP *"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "" }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "phone" }, "Phone"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "" }))),
                                        React.createElement("div", { className: "w-100" }),
                                        React.createElement("div", { className: "col-md-8" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("input", { type: "submit", value: "Register", className: "btn btn-primary py-3 px-5" }))))))))))));
    };
    return Register;
}(React.Component));
exports.Register = Register;
//# sourceMappingURL=PageRegister.js.map
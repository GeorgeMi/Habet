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
var react_html_parser_1 = require("react-html-parser");
var PrivacyPolicy = /** @class */ (function (_super) {
    __extends(PrivacyPolicy, _super);
    function PrivacyPolicy(props) {
        var _this = _super.call(this, props) || this;
        _this.reloadPage = _this.reloadPage.bind(_this);
        return _this;
    }
    PrivacyPolicy.prototype.reloadPage = function () {
        //do nothing
    };
    PrivacyPolicy.prototype.render = function () {
        var html = React.createElement(Translate, { content: 'privacyPolicy.Title' });
        return (React.createElement("div", null,
            React.createElement("main", { id: "main" },
                React.createElement("div", null,
                    React.createElement(Header_1.Header, null),
                    React.createElement("section", { className: "ftco-section contact-section bg-light" },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "bg-white p-5", style: { textAlign: 'justify' } },
                                React.createElement("div", { className: "row justify-content-center mb-3 pb-3" },
                                    React.createElement("div", { className: "col-md-12 heading-section text-center" },
                                        React.createElement("h2", { className: "mb-4" },
                                            React.createElement(Translate, { content: 'privacyPolicy.Title' })))),
                                React.createElement("div", null, react_html_parser_1.default(html)))))))));
    };
    return PrivacyPolicy;
}(React.Component));
exports.PrivacyPolicy = PrivacyPolicy;
//# sourceMappingURL=PagePrivacyPolicy.js.map
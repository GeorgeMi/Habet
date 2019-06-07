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
var Header_1 = require("./Header");
var Intro_1 = require("./Intro");
var Main_1 = require("./Main");
var Footer_1 = require("./Footer");
var React = require('react');
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Header_1.Header, null),
            React.createElement(Intro_1.Intro, null),
            React.createElement(Main_1.Main, null),
            React.createElement(Footer_1.Footer, null)));
    };
    return Layout;
}(React.Component));
exports.Layout = Layout;
//# sourceMappingURL=Layout.js.map
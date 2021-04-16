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
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound(props) {
        var _this = _super.call(this, props) || this;
        _this.reloadPage = _this.reloadPage.bind(_this);
        return _this;
    }
    NotFound.prototype.reloadPage = function () {
        //do nothing
    };
    NotFound.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Header_1.Header, null),
            React.createElement("section", { className: "ftco-section contact-section bg-light" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "bg-white p-5", style: { textAlign: 'justify' } },
                        React.createElement("div", { className: "row justify-content-center mb-3 pb-3" },
                            React.createElement("div", { className: "col-md-12 heading-section text-center" },
                                React.createElement("h2", { className: "mb-4" }, "ARE YOU HAPPY NOW?"),
                                React.createElement("h5", null, "Just kidding! Our bad. 404 NOT FOUND"))))))));
    };
    return NotFound;
}(React.Component));
exports.NotFound = NotFound;
//# sourceMappingURL=PageNotFound.js.map
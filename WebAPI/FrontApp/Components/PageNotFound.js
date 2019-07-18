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
    function NotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotFound.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Header_1.Header, null),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("section", { id: "contact", className: "section-bg wow fadeInUp" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "section-header" },
                        React.createElement("h3", null, "ARE YOU HAPPY NOW?"),
                        React.createElement("p", null, "Just kidding! Our bad."),
                        React.createElement("p", null, "404 NOT FOUND"))))));
    };
    return NotFound;
}(React.Component));
exports.NotFound = NotFound;
//# sourceMappingURL=PageNotFound.js.map
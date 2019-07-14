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
var SectionServices_1 = require("./SectionServices");
var SectionSkills_1 = require("./SectionSkills");
var SectionAboutUs_1 = require("./SectionAboutUs");
var SectionCallToAction_1 = require("./SectionCallToAction");
var SectionFacts_1 = require("./SectionFacts");
var SectionFeaturedServices_1 = require("./SectionFeaturedServices");
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
            React.createElement("h2", null, "ARE YOU HAPPY NOW?"),
            React.createElement("h3", null, "Just kidding! Our bad."),
            React.createElement("br", null),
            React.createElement("h1", null, "404 NOT FOUND"),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(SectionFeaturedServices_1.SectionFeaturedServices, null),
            React.createElement(SectionAboutUs_1.SectionAboutUs, null),
            React.createElement(SectionServices_1.SectionServices, null),
            React.createElement(SectionCallToAction_1.SectionCallToAction, null),
            React.createElement(SectionSkills_1.SectionSkills, null),
            React.createElement(SectionFacts_1.SectionFacts, null)));
    };
    return NotFound;
}(React.Component));
exports.NotFound = NotFound;
//# sourceMappingURL=PageNotFound.js.map
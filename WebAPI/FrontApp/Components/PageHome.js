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
var SectionAboutUs_1 = require("./SectionAboutUs");
var SectionCallToAction_1 = require("./SectionCallToAction");
var SectionFacts_1 = require("./SectionFacts");
var SectionFeaturedServices_1 = require("./SectionFeaturedServices");
var SectionProducts_1 = require("./SectionProducts");
var SectionServices_1 = require("./SectionServices");
var SectionSkills_1 = require("./SectionSkills");
var SectionIntro_1 = require("./SectionIntro");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        return (React.createElement("main", { id: "main" },
            React.createElement("div", null,
                React.createElement(SectionIntro_1.SectionIntro, null),
                React.createElement(SectionFeaturedServices_1.SectionFeaturedServices, null),
                React.createElement(SectionAboutUs_1.SectionAboutUs, null),
                React.createElement(SectionServices_1.SectionServices, null),
                React.createElement(SectionCallToAction_1.SectionCallToAction, null),
                React.createElement(SectionSkills_1.SectionSkills, null),
                React.createElement(SectionFacts_1.SectionFacts, null),
                React.createElement(SectionProducts_1.SectionProducts, null))));
    };
    return Home;
}(React.Component));
exports.Home = Home;
//# sourceMappingURL=PageHome.js.map
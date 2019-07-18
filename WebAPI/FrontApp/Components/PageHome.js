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
var SectionProducts_1 = require("./SectionProducts");
var SectionIntro_1 = require("./SectionIntro");
var Header_1 = require("./Header");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        return (React.createElement("main", { id: "main" },
            React.createElement("div", null,
                React.createElement(Header_1.Header, { Active: 'Home' }),
                React.createElement(SectionIntro_1.SectionIntro, null),
                React.createElement("section", { className: "product section-bg" },
                    React.createElement("div", { className: "container" },
                        React.createElement("header", { className: "section-header", id: "Women-section" },
                            React.createElement("h3", { className: "section-title" }, " Women ")),
                        React.createElement("section", { id: "Women-Bags-section" },
                            React.createElement("header", { className: "section-header" },
                                React.createElement("h5", { className: "section-title" }, "Bags")),
                            React.createElement(SectionProducts_1.SectionProducts, { Gender: 'Women', Type: 'Bags' })),
                        React.createElement("section", { id: "Women-Belts-section" },
                            React.createElement("header", { className: "section-header" },
                                React.createElement("h5", { className: "section-title" }, "Belts")),
                            React.createElement(SectionProducts_1.SectionProducts, { Gender: 'Women', Type: 'Belts' })),
                        React.createElement("header", { className: "section-header", id: "Men-section" },
                            React.createElement("h3", { className: "section-title" }, " Men ")),
                        React.createElement("section", { id: "Men-Bags-section" },
                            React.createElement("header", { className: "section-header" },
                                React.createElement("h5", { className: "section-title" }, "Bags")),
                            React.createElement(SectionProducts_1.SectionProducts, { Gender: 'Men', Type: 'Bags' })),
                        React.createElement("section", { id: "Men-Belts-section" },
                            React.createElement("header", { className: "section-header" },
                                React.createElement("h5", { className: "section-title" }, "Belts")),
                            React.createElement(SectionProducts_1.SectionProducts, { Gender: 'Men', Type: 'Belts' })))))));
    };
    return Home;
}(React.Component));
exports.Home = Home;
//# sourceMappingURL=PageHome.js.map
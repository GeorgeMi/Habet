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
var React = require('react');
var SectionFeaturedServices = /** @class */ (function (_super) {
    __extends(SectionFeaturedServices, _super);
    function SectionFeaturedServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SectionFeaturedServices.prototype.render = function () {
        return (React.createElement("section", { id: "featured-services" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-4 box" },
                        React.createElement("i", { className: "ion-ios-bookmarks-outline" }),
                        React.createElement("h4", { className: "title" },
                            React.createElement("a", { href: "" }, "Lorem Ipsum Delino")),
                        React.createElement("p", { className: "description" }, "Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident")),
                    React.createElement("div", { className: "col-lg-4 box box-bg" },
                        React.createElement("i", { className: "ion-ios-stopwatch-outline" }),
                        React.createElement("h4", { className: "title" },
                            React.createElement("a", { href: "" }, "Dolor Sitema")),
                        React.createElement("p", { className: "description" }, "Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata")),
                    React.createElement("div", { className: "col-lg-4 box" },
                        React.createElement("i", { className: "ion-ios-heart-outline" }),
                        React.createElement("h4", { className: "title" },
                            React.createElement("a", { href: "" }, "Sed ut perspiciatis")),
                        React.createElement("p", { className: "description" }, "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"))))));
    };
    return SectionFeaturedServices;
}(React.Component));
exports.SectionFeaturedServices = SectionFeaturedServices;
//# sourceMappingURL=SectionFeaturedServices.js.map
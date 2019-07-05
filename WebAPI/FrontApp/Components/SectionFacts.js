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
var SectionFacts = /** @class */ (function (_super) {
    __extends(SectionFacts, _super);
    function SectionFacts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SectionFacts.prototype.render = function () {
        return (React.createElement("section", { id: "facts", className: "wow fadeIn" },
            React.createElement("div", { className: "container" },
                React.createElement("header", { className: "section-header" },
                    React.createElement("h3", null, "Facts"),
                    React.createElement("p", null, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque")),
                React.createElement("div", { className: "row counters" },
                    React.createElement("div", { className: "col-lg-3 col-6 text-center" },
                        React.createElement("span", { "data-toggle": "counter-up" }, "274"),
                        React.createElement("p", null, "Clients")),
                    React.createElement("div", { className: "col-lg-3 col-6 text-center" },
                        React.createElement("span", { "data-toggle": "counter-up" }, "421"),
                        React.createElement("p", null, "Projects")),
                    React.createElement("div", { className: "col-lg-3 col-6 text-center" },
                        React.createElement("span", { "data-toggle": "counter-up" }, "1,364"),
                        React.createElement("p", null, "Hours Of Support")),
                    React.createElement("div", { className: "col-lg-3 col-6 text-center" },
                        React.createElement("span", { "data-toggle": "counter-up" }, "18"),
                        React.createElement("p", null, "Hard Workers"))),
                React.createElement("div", { className: "facts-img" },
                    React.createElement("img", { src: "img/facts-img.png", alt: "", className: "img-fluid" })))));
    };
    return SectionFacts;
}(React.Component));
exports.SectionFacts = SectionFacts;
//# sourceMappingURL=SectionFacts.js.map
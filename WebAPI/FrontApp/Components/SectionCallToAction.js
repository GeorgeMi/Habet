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
var SectionCallToAction = /** @class */ (function (_super) {
    __extends(SectionCallToAction, _super);
    function SectionCallToAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SectionCallToAction.prototype.render = function () {
        return (React.createElement("section", { id: "call-to-action", class: "wow fadeIn" },
            React.createElement("div", { class: "container text-center" },
                React.createElement("h3", null, "Call To Action"),
                React.createElement("p", null, " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
                React.createElement("a", { class: "cta-btn", href: "#" }, "Call To Action"))));
    };
    return SectionCallToAction;
}(React.Component));
exports.SectionCallToAction = SectionCallToAction;
//# sourceMappingURL=SectionCallToAction.js.map
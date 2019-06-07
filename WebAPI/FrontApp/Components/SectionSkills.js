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
var SectionSkills = /** @class */ (function (_super) {
    __extends(SectionSkills, _super);
    function SectionSkills() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SectionSkills.prototype.render = function () {
        return (React.createElement("section", { id: "skills" },
            React.createElement("div", { class: "container" },
                React.createElement("header", { class: "section-header" },
                    React.createElement("h3", null, "Our Skills"),
                    React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip")),
                React.createElement("div", { class: "skills-content" },
                    React.createElement("div", { class: "progress" },
                        React.createElement("div", { class: "progress-bar bg-success", role: "progressbar", "aria-valuenow": "100", "aria-valuemin": "0", "aria-valuemax": "100" },
                            React.createElement("span", { class: "skill" },
                                "HTML ",
                                React.createElement("i", { class: "val" }, "100%")))),
                    React.createElement("div", { class: "progress" },
                        React.createElement("div", { class: "progress-bar bg-info", role: "progressbar", "aria-valuenow": "90", "aria-valuemin": "0", "aria-valuemax": "100" },
                            React.createElement("span", { class: "skill" },
                                "CSS ",
                                React.createElement("i", { class: "val" }, "90%")))),
                    React.createElement("div", { class: "progress" },
                        React.createElement("div", { class: "progress-bar bg-warning", role: "progressbar", "aria-valuenow": "75", "aria-valuemin": "0", "aria-valuemax": "100" },
                            React.createElement("span", { class: "skill" },
                                "JavaScript ",
                                React.createElement("i", { class: "val" }, "75%")))),
                    React.createElement("div", { class: "progress" },
                        React.createElement("div", { class: "progress-bar bg-danger", role: "progressbar", "aria-valuenow": "55", "aria-valuemin": "0", "aria-valuemax": "100" },
                            React.createElement("span", { class: "skill" },
                                "Photoshop ",
                                React.createElement("i", { class: "val" }, "55%"))))))));
    };
    return SectionSkills;
}(React.Component));
exports.SectionSkills = SectionSkills;
//# sourceMappingURL=SectionSkills.js.map
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
var SectionAboutUs = /** @class */ (function (_super) {
    __extends(SectionAboutUs, _super);
    function SectionAboutUs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SectionAboutUs.prototype.render = function () {
        return (React.createElement("section", { id: "about" },
            React.createElement("div", { class: "container" },
                React.createElement("header", { class: "section-header" },
                    React.createElement("h3", null, "About Us"),
                    React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")),
                React.createElement("div", { class: "row about-cols" },
                    React.createElement("div", { class: "col-md-4 wow fadeInUp" },
                        React.createElement("div", { class: "about-col" },
                            React.createElement("div", { class: "img" },
                                React.createElement("img", { src: "img/about-mission.jpg", alt: "", class: "img-fluid" }),
                                React.createElement("div", { class: "icon" },
                                    React.createElement("i", { class: "ion-ios-speedometer-outline" }))),
                            React.createElement("h2", { class: "title" },
                                React.createElement("a", { href: "#" }, "Our Mission")),
                            React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."))),
                    React.createElement("div", { class: "col-md-4 wow fadeInUp", "data-wow-delay": "0.1s" },
                        React.createElement("div", { class: "about-col" },
                            React.createElement("div", { class: "img" },
                                React.createElement("img", { src: "img/about-plan.jpg", alt: "", class: "img-fluid" }),
                                React.createElement("div", { class: "icon" },
                                    React.createElement("i", { class: "ion-ios-list-outline" }))),
                            React.createElement("h2", { class: "title" },
                                React.createElement("a", { href: "#" }, "Our Plan")),
                            React.createElement("p", null, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."))),
                    React.createElement("div", { class: "col-md-4 wow fadeInUp", "data-wow-delay": "0.2s" },
                        React.createElement("div", { class: "about-col" },
                            React.createElement("div", { class: "img" },
                                React.createElement("img", { src: "img/about-vision.jpg", alt: "", class: "img-fluid" }),
                                React.createElement("div", { class: "icon" },
                                    React.createElement("i", { class: "ion-ios-eye-outline" }))),
                            React.createElement("h2", { class: "title" },
                                React.createElement("a", { href: "#" }, "Our Vision")),
                            React.createElement("p", null, "Nemo enim ipsam voluptatem quia voluptas sit aut odit aut fugit, sed quia magni dolores eos qui ratione voluptatem sequi nesciunt Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.")))))));
    };
    return SectionAboutUs;
}(React.Component));
exports.SectionAboutUs = SectionAboutUs;
//# sourceMappingURL=SectionAboutUs.js.map
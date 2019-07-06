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
var Intro = /** @class */ (function (_super) {
    __extends(Intro, _super);
    function Intro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Intro.prototype.render = function () {
        return (React.createElement("section", { id: "intro" },
            React.createElement("div", { className: "intro-container" },
                React.createElement("div", { id: "introCarousel", className: "carousel  slide carousel-fade", "data-ride": "carousel" },
                    React.createElement("ol", { className: "carousel-indicators" }),
                    React.createElement("div", { className: "carousel-inner", role: "listbox" },
                        React.createElement("div", { className: "carousel-item active" },
                            React.createElement("div", { className: "carousel-background" },
                                React.createElement("img", { src: "img/intro-carousel/1.jpg", alt: "" })),
                            React.createElement("div", { className: "carousel-container" },
                                React.createElement("div", { className: "carousel-content" },
                                    React.createElement("h2", null, "We are professional"),
                                    React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
                                    React.createElement("a", { href: "#featured-services", className: "btn-get-started scrollto" }, "Get Started")))),
                        React.createElement("div", { className: "carousel-item" },
                            React.createElement("div", { className: "carousel-background" },
                                React.createElement("img", { src: "img/intro-carousel/2.jpg", alt: "" })),
                            React.createElement("div", { className: "carousel-container" },
                                React.createElement("div", { className: "carousel-content" },
                                    React.createElement("h2", null, "At vero eos et accusamus"),
                                    React.createElement("p", null, "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut."),
                                    React.createElement("a", { href: "#featured-services", className: "btn-get-started scrollto" }, "Get Started")))),
                        React.createElement("div", { className: "carousel-item" },
                            React.createElement("div", { className: "carousel-background" },
                                React.createElement("img", { src: "img/intro-carousel/3.jpg", alt: "" })),
                            React.createElement("div", { className: "carousel-container" },
                                React.createElement("div", { className: "carousel-content" },
                                    React.createElement("h2", null, "Temporibus autem quibusdam"),
                                    React.createElement("p", null, "Beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt omnis iste natus error sit voluptatem accusantium."),
                                    React.createElement("a", { href: "#featured-services", className: "btn-get-started scrollto" }, "Get Started")))),
                        React.createElement("div", { className: "carousel-item" },
                            React.createElement("div", { className: "carousel-background" },
                                React.createElement("img", { src: "img/intro-carousel/4.jpg", alt: "" })),
                            React.createElement("div", { className: "carousel-container" },
                                React.createElement("div", { className: "carousel-content" },
                                    React.createElement("h2", null, "Nam libero tempore"),
                                    React.createElement("p", null, "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum."),
                                    React.createElement("a", { href: "#featured-services", className: "btn-get-started scrollto" }, "Get Started")))),
                        React.createElement("div", { className: "carousel-item" },
                            React.createElement("div", { className: "carousel-background" },
                                React.createElement("img", { src: "img/intro-carousel/5.jpg", alt: "" })),
                            React.createElement("div", { className: "carousel-container" },
                                React.createElement("div", { className: "carousel-content" },
                                    React.createElement("h2", null, "Magnam aliquam quaerat"),
                                    React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
                                    React.createElement("a", { href: "#featured-services", className: "btn-get-started scrollto" }, "Get Started"))))),
                    React.createElement("a", { className: "carousel-control-prev", href: "#introCarousel", role: "button", "data-slide": "prev" },
                        React.createElement("span", { className: "carousel-control-prev-icon ion-chevron-left", "aria-hidden": "true" }),
                        React.createElement("span", { className: "sr-only" }, "Previous")),
                    React.createElement("a", { className: "carousel-control-next", href: "#introCarousel", role: "button", "data-slide": "next" },
                        React.createElement("span", { className: "carousel-control-next-icon ion-chevron-right", "aria-hidden": "true" }),
                        React.createElement("span", { className: "sr-only" }, "Next"))))));
    };
    return Intro;
}(React.Component));
exports.Intro = Intro;
//# sourceMappingURL=Intro.js.map
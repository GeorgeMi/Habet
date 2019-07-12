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
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        return (React.createElement("header", { id: "header" },
            React.createElement("div", { className: "container-fluid" },
                React.createElement("div", { id: "logo", className: "pull-left" },
                    React.createElement("h1", null,
                        React.createElement("a", { href: "#intro", className: "scrollto" }, "GabrielHabet")),
                    React.createElement("a", { href: "#intro" },
                        React.createElement("img", { src: "img/logo.png", alt: "", title: "" }))),
                React.createElement("nav", { id: "nav-menu-container" },
                    React.createElement("ul", { className: "nav-menu" },
                        React.createElement("li", { className: "menu-active" },
                            React.createElement("a", { href: "/#/" }, "Home")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#about" }, "About Us")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#services" }, "Services")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#portfolio" }, "Portfolio")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#team" }, "Team")),
                        React.createElement("li", { className: "menu-has-children" },
                            React.createElement("a", { href: "" }, "Drop Down"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Drop Down 1")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Drop Down 3")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Drop Down 4")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Drop Down 5")))),
                        React.createElement("li", null,
                            React.createElement("a", { href: "/#/contact" }, "Contact")))))));
    };
    return Header;
}(React.Component));
exports.Header = Header;
//# sourceMappingURL=Header.js.map
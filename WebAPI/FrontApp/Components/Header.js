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
var Dictionary_1 = require("./Dictionary");
var react_router_hash_link_1 = require("react-router-hash-link");
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        var _this = _super.call(this, props) || this;
        var dictionary = new Dictionary_1.KeyedCollection();
        dictionary.Add(props.Active, 'menu-active');
        _this.state = { headerDictionary: dictionary };
        return _this;
    }
    Header.prototype.render = function () {
        var headerDictionary = this.state.headerDictionary;
        return (React.createElement("div", null,
            React.createElement("nav", { className: "navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light", id: "ftco-navbar" },
                React.createElement("div", { className: "container" },
                    React.createElement("a", { className: "navbar-brand", href: "index.html" }, "GabrielHabet"),
                    React.createElement("button", { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#ftco-nav", "aria-controls": "ftco-nav", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                        React.createElement("span", { className: "oi oi-menu" }),
                        " Menu"),
                    React.createElement("div", { className: "collapse navbar-collapse", id: "ftco-nav" },
                        React.createElement("ul", { className: "navbar-nav ml-auto" },
                            React.createElement("li", { className: "nav-item " + headerDictionary.Item('Home') },
                                React.createElement("a", { href: "/", className: "nav-link" }, "Home")),
                            React.createElement("li", { className: "nav-item dropdown" },
                                React.createElement(react_router_hash_link_1.HashLink, { className: "nav-link dropdown-toggle " + headerDictionary.Item('Women'), to: "#Women-section", id: "dropdown04", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, "Women"),
                                React.createElement("div", { className: "dropdown-menu", "aria-labelledby": "dropdown04" },
                                    React.createElement(react_router_hash_link_1.HashLink, { className: "dropdown-item", to: "#Women-Bags-section" }, "Bags"),
                                    React.createElement(react_router_hash_link_1.HashLink, { className: "dropdown-item", to: "#Women-Belts-section" }, "Belts"))),
                            React.createElement("li", { className: "nav-item dropdown" },
                                React.createElement(react_router_hash_link_1.HashLink, { className: "nav-link dropdown-toggle " + headerDictionary.Item('Men'), to: "#Men-section", id: "dropdown04", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, "Men"),
                                React.createElement("div", { className: "dropdown-menu", "aria-labelledby": "dropdown04" },
                                    React.createElement(react_router_hash_link_1.HashLink, { className: "dropdown-item", to: "#Men-Bags-section" }, "Bags"),
                                    React.createElement(react_router_hash_link_1.HashLink, { className: "dropdown-item", to: "#Men-Belts-section" }, "Belts"))),
                            React.createElement("li", { className: "nav-item " + headerDictionary.Item('Contact') },
                                React.createElement("a", { href: "/#/contact", className: "nav-link" }, "Contact")),
                            React.createElement("li", { className: "nav-item cta cta-colored" },
                                React.createElement("a", { href: "cart.html", className: "nav-link" },
                                    React.createElement("span", { className: "icon-shopping_cart" }),
                                    "[0]"))))))));
    };
    return Header;
}(React.Component));
exports.Header = Header;
//# sourceMappingURL=Header.js.map
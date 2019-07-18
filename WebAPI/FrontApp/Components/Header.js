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
        return (React.createElement("header", { id: "header" },
            React.createElement("div", { className: "container-fluid" },
                React.createElement("div", { id: "logo", className: "pull-left" },
                    React.createElement("h1", null,
                        React.createElement("a", { href: "/#/", className: "scrollto" }, "GabrielHabet")),
                    React.createElement("a", { href: "/#/" },
                        React.createElement("img", { src: "img/logo.png", alt: "", title: "" }))),
                React.createElement("nav", { id: "nav-menu-container" },
                    React.createElement("ul", { className: "nav-menu" },
                        React.createElement("li", { className: headerDictionary.Item('Home') },
                            React.createElement("a", { href: "#" }, "Home")),
                        React.createElement("li", { className: headerDictionary.Item('Women') },
                            React.createElement(react_router_hash_link_1.HashLink, { to: "#Women-section" }, "Women"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement(react_router_hash_link_1.HashLink, { to: "#Women-Bags-section" }, "Bags")),
                                React.createElement("li", null,
                                    React.createElement(react_router_hash_link_1.HashLink, { to: "#Women-Belts-section" }, "Belts")))),
                        React.createElement("li", { className: headerDictionary.Item('Men') },
                            React.createElement(react_router_hash_link_1.HashLink, { to: "#Men-section" }, "Men"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement(react_router_hash_link_1.HashLink, { to: "#Men-Bags-section" }, "Bags")),
                                React.createElement("li", null,
                                    React.createElement(react_router_hash_link_1.HashLink, { to: "#Men-Belts-section" }, "Belts")))),
                        React.createElement("li", { className: headerDictionary.Item('Contact') },
                            React.createElement("a", { href: "/#/contact" }, "Contact")))))));
    };
    return Header;
}(React.Component));
exports.Header = Header;
//# sourceMappingURL=Header.js.map
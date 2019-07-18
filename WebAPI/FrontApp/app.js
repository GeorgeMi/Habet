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
var ReactDOM = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var react_router_1 = require("react-router");
var PageHome_1 = require("./Components/PageHome");
var PageContact_1 = require("./Components/PageContact");
var Footer_1 = require("./Components/Footer");
var PageNotFound_1 = require("./Components/PageNotFound");
var PageProduct_1 = require("./Components/PageProduct");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement(react_router_dom_1.HashRouter, null,
            React.createElement("div", null,
                React.createElement(react_router_1.Switch, null,
                    React.createElement(react_router_1.Route, { exact: true, path: "/", component: PageHome_1.Home }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/item/:id", component: PageProduct_1.Product }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/contact", component: PageContact_1.Contact }),
                    React.createElement(react_router_1.Route, { component: PageNotFound_1.NotFound })),
                React.createElement(Footer_1.Footer, null))));
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=app.js.map
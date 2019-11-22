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
var PageCheckout_1 = require("./Components/PageCheckout");
var PageSearch_1 = require("./Components/PageSearch");
var PageCart_1 = require("./Components/PageCart");
var PageRegister_1 = require("./Components/PageRegister");
var PageVerify_1 = require("./Components/PageVerify");
var PageRecoverPassword_1 = require("./Components/PageRecoverPassword");
var PageResetPassword_1 = require("./Components/PageResetPassword");
var PageChangePassword_1 = require("./Components/PageChangePassword");
var PageAddProduct_1 = require("./Components/PageAddProduct");
var PageUpdateUserDetails_1 = require("./Components/PageUpdateUserDetails");
var PageCookiePolicy_1 = require("./Components/PageCookiePolicy");
var PageOrderHistory_1 = require("./Components/PageOrderHistory");
var PageOrder_1 = require("./Components/PageOrder");
var PageCreditCardPayment_1 = require("./Components/PageCreditCardPayment");
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
                    React.createElement(react_router_1.Route, { exact: true, path: "/checkout", component: PageCheckout_1.Checkout }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/search", component: PageSearch_1.Search }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/cart", component: PageCart_1.Cart }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/register", component: PageRegister_1.Register }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/cookie_policy", component: PageCookiePolicy_1.CookiePolicy }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/verify/:id", component: PageVerify_1.Verify }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/recover_password", component: PageRecoverPassword_1.RecoverPassword }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/reset_password/:id", component: PageResetPassword_1.ResetPassword }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/change_password", component: PageChangePassword_1.ChangePassword }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/user_details", component: PageUpdateUserDetails_1.UpdateUserDetails }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/add_product", component: PageAddProduct_1.AddProduct }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/add_product", component: PageAddProduct_1.AddProduct }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/orders", component: PageOrderHistory_1.OrderHistory }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/order/:id", component: PageOrder_1.Order }),
                    React.createElement(react_router_1.Route, { exact: true, path: "/card_payment", component: PageCreditCardPayment_1.CreditCardPayment }),
                    React.createElement(react_router_1.Route, { component: PageNotFound_1.NotFound })),
                React.createElement(Footer_1.Footer, null))));
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=app.js.map
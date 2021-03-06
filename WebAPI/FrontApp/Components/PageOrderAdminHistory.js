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
var Header_1 = require("./Header");
var sfcookies_1 = require("sfcookies");
var react_notifications_1 = require("react-notifications");
require("react-notifications/lib/notifications.css");
var react_router_dom_1 = require("react-router-dom");
var react_router_hash_link_1 = require("react-router-hash-link");
var Translate = require("react-translate-component");
var en_1 = require("./languages/en");
var it_1 = require("./languages/it");
var ro_1 = require("./languages/ro");
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var counterpart = require('counterpart');
counterpart.registerTranslations('en', en_1.default);
counterpart.registerTranslations('ro', ro_1.default);
counterpart.registerTranslations('it', it_1.default);
var OrderAdminHistory = /** @class */ (function (_super) {
    __extends(OrderAdminHistory, _super);
    function OrderAdminHistory(props) {
        var _this = _super.call(this, props) || this;
        counterpart.setLocale(sfcookies_1.read_cookie('lang'));
        _this.state = {
            isLoaded: false,
            items: null,
            error: null,
            waitingResponse: false,
            language: sfcookies_1.read_cookie('lang'),
            currency: sfcookies_1.read_cookie('currency'),
            deliveredFilter: false
        };
        _this.reloadPage = _this.reloadPage.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    OrderAdminHistory.prototype.componentWillMount = function () {
        var _this = this;
        if (sfcookies_1.read_cookie('token') != null && sfcookies_1.read_cookie('token').length !== 0) {
            axios.get(API_Path + '/Orders', {
                headers: {
                    token: sfcookies_1.read_cookie('token') //the token is a variable which holds the token
                },
                params: {
                    deliveredFilter: this.state.deliveredFilter
                }
            })
                .then(function (response) {
                _this.setState({ isLoaded: true, items: response.data.data });
            })
                .catch(function (error) {
                _this.setState({ isLoaded: true, error: error });
            })
                .then();
        }
    };
    OrderAdminHistory.prototype.handleChange = function (event) {
        var _a;
        var _this = this;
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
        if (sfcookies_1.read_cookie('token') != null && sfcookies_1.read_cookie('token').length !== 0) {
            axios.get(API_Path + '/Orders', {
                headers: {
                    token: sfcookies_1.read_cookie('token') //the token is a variable which holds the token
                },
                params: {
                    deliveredFilter: event.target.value
                }
            })
                .then(function (response) {
                _this.setState({ isLoaded: true, items: response.data.data });
            })
                .catch(function (error) {
                _this.setState({ isLoaded: true, error: error });
            })
                .then();
        }
    };
    OrderAdminHistory.prototype.reloadPage = function () {
        //do nothing
    };
    OrderAdminHistory.prototype.updateOrder = function (orderId) {
        var _this = this;
        if (sfcookies_1.read_cookie('token') != null && sfcookies_1.read_cookie('token').length !== 0) {
            axios.post(API_Path + '/EditOrders', {
                orderId: orderId,
                sent: true,
            }, {
                headers: {
                    token: sfcookies_1.read_cookie('token') //the token is a variable which holds the token
                }
            })
                .then(function (response) {
                react_notifications_1.NotificationManager.success(response.data.message);
                window.location.reload();
            })
                .catch(function (error) {
                _this.setState({ isLoaded: true, error: error });
                react_notifications_1.NotificationManager.error("Request failed. Please, try again later.");
            })
                .then(function () {
                _this.setState({ waitingResponse: false });
            });
        }
    };
    OrderAdminHistory.prototype.render = function () {
        var _this = this;
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, waitingResponse = _a.waitingResponse, items = _a.items, currency = _a.currency, deliveredFilter = _a.deliveredFilter;
        var currencyBeforeSign = '€';
        var currencyAfterSign = '';
        if (currency == 'RON') {
            currencyBeforeSign = '';
            currencyAfterSign = 'RON';
        }
        else if (currency == 'GBP') {
            currencyBeforeSign = '₤';
            currencyAfterSign = '';
        }
        if (error) {
            console.log(error);
            return React.createElement("div", null,
                "Error: ",
                error.message);
        }
        else if (sfcookies_1.read_cookie('token') == null || sfcookies_1.read_cookie('token').length == 0) {
            return React.createElement(react_router_dom_1.Redirect, { to: '/#/' });
        }
        else if (!isLoaded) {
            return (React.createElement("main", { id: "main" },
                waitingResponse ? React.createElement("div", { className: "loading" }, "Loading\u2026") : React.createElement("div", null),
                React.createElement("div", null,
                    React.createElement(Header_1.Header, { reloadPage: this.reloadPage }),
                    React.createElement("div", { className: "hero-wrap page-title", style: { backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" } },
                        React.createElement("div", { className: "row justify-content-center mb-3 pb-3" },
                            React.createElement("div", { className: "col-md-12 heading-section text-center" },
                                React.createElement("h1", { className: "mb-4" },
                                    React.createElement(Translate, { content: 'order.OrderHistory' }))))),
                    React.createElement("div", { className: "loading" }, "Loading\u2026"),
                    ";")));
        }
        else {
            if (sfcookies_1.read_cookie('token') == null || sfcookies_1.read_cookie('token').length == 0) {
                return React.createElement(react_router_dom_1.Redirect, { to: '/#/' });
            }
            return (React.createElement("main", { id: "main" },
                React.createElement("div", null,
                    React.createElement(Header_1.Header, { reloadPage: this.reloadPage }),
                    React.createElement("div", { className: "hero-wrap page-title", style: { backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" } },
                        React.createElement("div", { className: "row justify-content-center" },
                            React.createElement("div", { className: "col-md-12 heading-section text-center" },
                                React.createElement("h1", { className: "mb-4" },
                                    React.createElement(Translate, { content: 'order.OrderHistory' }))))),
                    React.createElement("section", { className: "ftco-section" },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "justify-content-center" },
                                React.createElement("div", { className: "col-md-6" },
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", { htmlFor: "deliveredFilter" },
                                            React.createElement(Translate, { content: 'order.ShowOrders' })),
                                        React.createElement("div", { className: "select-wrap" },
                                            React.createElement("select", { className: "form-control", value: this.state.deliveredFilter, onChange: this.handleChange, name: "deliveredFilter", id: "deliveredFilter", required: true },
                                                React.createElement(Translate, { component: "option", value: "true", content: 'order.Delivered' }),
                                                React.createElement(Translate, { component: "option", value: "false", content: 'order.NotDelivered' }))))),
                                items.map(function (item, i) { return (React.createElement("div", { key: i },
                                    React.createElement("div", { className: "card" },
                                        React.createElement("div", { className: "card-header" },
                                            React.createElement(Translate, { content: 'order.OrderNo' }),
                                            " ",
                                            item.OrderId),
                                        React.createElement("div", { className: "card-body" },
                                            React.createElement("p", { className: "card-text" },
                                                React.createElement(Translate, { content: 'order.PlacedOn' }),
                                                ":  ",
                                                item.Date,
                                                " | ",
                                                React.createElement(Translate, { content: 'order.Total' }),
                                                ": ",
                                                item.Total),
                                            React.createElement("div", { className: "btn-group btn-group-justified" },
                                                React.createElement("div", { className: "btn btn-default", title: "View" },
                                                    React.createElement(react_router_hash_link_1.HashLink, { to: "/order/" + item.OrderId },
                                                        React.createElement(Translate, { content: 'order.OrderDetails' })))),
                                            (deliveredFilter == false || deliveredFilter == 'false') &&
                                                React.createElement("div", { className: "btn-group btn-group-justified" },
                                                    React.createElement("div", { className: "btn btn-default", title: "View" },
                                                        React.createElement("a", { href: "javascript:void(0)", className: "add-to-cart text-center py-2 mr-1", onClick: function () { return _this.updateOrder(item.OrderId); } },
                                                            React.createElement("span", null,
                                                                React.createElement(Translate, { content: 'order.OrderIsDelivered' }))))))))); })))))));
        }
    };
    return OrderAdminHistory;
}(React.Component));
exports.OrderAdminHistory = OrderAdminHistory;
//# sourceMappingURL=PageOrderAdminHistory.js.map
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
var Dictionary_1 = require("./Dictionary");
var sfcookies_1 = require("sfcookies");
var react_notifications_1 = require("react-notifications");
require("react-notifications/lib/notifications.css");
var react_js_pagination_1 = require("react-js-pagination");
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
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search(props) {
        var _this = _super.call(this, props) || this;
        counterpart.setLocale(sfcookies_1.read_cookie('lang'));
        _this.state = {
            gender: "Women",
            type: "Bags",
            priceInterval: "3",
            items: null,
            isLoaded: false,
            error: null,
            waitingResponse: false,
            isChanged: false,
            language: sfcookies_1.read_cookie('lang'),
            activePage: 1,
            totalItemsCount: 50,
            itemsPerPage: 1
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.langaugeChanged = _this.langaugeChanged.bind(_this);
        _this.handlePageChange = _this.handlePageChange.bind(_this);
        _this.searchProducts = _this.searchProducts.bind(_this);
        return _this;
    }
    Search.prototype.componentWillMount = function () {
        var _this = this;
        axios.get(API_Path + '/Products', {
            params: {
                top: this.state.itemsPerPage,
                from: 0,
                gender: "none",
                type: "intro",
                lang: this.state.language
            }
        })
            .then(function (response) {
            _this.setState({ isLoaded: true, items: response.data.data });
        })
            .catch(function (error) {
            _this.setState({ isLoaded: true, error: error });
        })
            .then();
    };
    Search.prototype.readCartFromCookie = function (cookie) {
        var cartProducts = new Dictionary_1.KeyedCollection();
        for (var prop in cookie.items) {
            cartProducts.Add(parseInt(prop, 10), cookie.items[prop]);
        }
        return cartProducts;
    };
    Search.prototype.handlePageChange = function (pageNumber) {
        this.setState({ activePage: pageNumber });
        this.searchProducts(pageNumber);
    };
    Search.prototype.handleChange = function (event) {
        var _a;
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
        this.setState({ isChanged: true });
    };
    Search.prototype.searchProducts = function (activePage) {
        var _this = this;
        var priceFrom = 0;
        var priceTo = 10000;
        if (this.state.waitingResponse == false) {
            this.setState({ waitingResponse: true });
        }
        if (this.state.priceInterval == "1") {
            priceTo = 49;
        }
        else if (this.state.priceInterval == "2") {
            priceFrom = 50;
            priceTo = 99;
        }
        else if (this.state.priceInterval == "3") {
            priceFrom = 100;
            priceTo = 199;
        }
        else if (this.state.priceInterval == "4") {
            priceFrom = 200;
            priceTo = 499;
        }
        else if (this.state.priceInterval == "5") {
            priceFrom = 500;
        }
        axios.post(API_Path + '/SearchProducts', {
            top: this.state.itemsPerPage,
            from: (activePage - 1) * this.state.itemsPerPage + 1,
            gender: this.state.gender,
            type: this.state.type,
            priceFrom: priceFrom,
            priceTo: priceTo,
            lang: this.state.language
        })
            .then(function (response) {
            _this.setState({ isLoaded: true, items: response.data.Products, totalItemsCount: response.data.TotalItemsCount });
        }).catch(function (error) {
            react_notifications_1.NotificationManager.error("Request failed. Please, try again later.");
        })
            .then(function () {
            _this.setState({ waitingResponse: false });
        });
    };
    Search.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.searchProducts(1);
    };
    Search.prototype.addProductToCart = function (productId, no) {
        var cookie = sfcookies_1.read_cookie('cartProducts');
        if (cookie.length == 0) {
            var cartProducts = new Dictionary_1.KeyedCollection();
        }
        else {
            var cartProducts = this.readCartFromCookie(cookie);
            if (cartProducts.ContainsKey(productId)) {
                no = no + cartProducts.Item(productId);
                cartProducts.Remove(productId);
            }
        }
        cartProducts.Add(productId, no);
        sfcookies_1.delete_cookie('cartProducts');
        sfcookies_1.bake_cookie('cartProducts', cartProducts);
    };
    Search.prototype.langaugeChanged = function () {
        window.location.reload(false);
    };
    Search.prototype.render = function () {
        var _this = this;
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, items = _a.items;
        if (error) {
            console.log(error);
            return React.createElement("div", null,
                "Error: ",
                error.message);
        }
        else if (!isLoaded) {
            return React.createElement("div", { className: "loading" }, "Loading\u2026");
        }
        else {
            return (React.createElement("main", { id: "main" },
                React.createElement("div", null,
                    React.createElement(Header_1.Header, { Active: 'Search', langaugeChanged: this.langaugeChanged }),
                    React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                        React.createElement("div", { className: "row justify-content-center mb-3 pb-3" },
                            React.createElement("div", { className: "col-md-12 heading-section text-center" },
                                React.createElement("h1", { className: "mb-4" },
                                    React.createElement(Translate, { content: 'search.SearchProducts' }))))),
                    React.createElement("section", { className: "ftco-section bg-light" },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-md-8 col-lg-10 order-md-last" },
                                    React.createElement("div", { className: "row" }, items.map(function (item, i) { return (React.createElement("div", { key: i, className: "col-lg-4 col-md-6 product-item filter-app wow fadeInUp" },
                                        React.createElement("div", { className: "product d-flex flex-column" },
                                            React.createElement("a", { href: "/#/item/" + item.ProductId, className: "img-prod" },
                                                React.createElement("img", { className: "img-fluid", src: item.Image, alt: "" }),
                                                React.createElement("div", { className: "overlay" })),
                                            React.createElement("div", { className: "text py-3 pb-4 px-3" },
                                                React.createElement("h3", null,
                                                    React.createElement("a", { href: "/#/item/" + item.ProductId }, item.Name)),
                                                React.createElement("div", { className: "pricing" },
                                                    React.createElement("p", { className: "price" },
                                                        React.createElement("span", null,
                                                            "$",
                                                            item.Price))),
                                                React.createElement("p", { className: "bottom-area d-flex px-3" },
                                                    React.createElement("a", { href: "#", className: "add-to-cart text-center py-2 mr-1", onClick: function () { return _this.addProductToCart(item.ProductId, 1); } },
                                                        React.createElement("span", null,
                                                            React.createElement(Translate, { content: 'search.AddToCart' }),
                                                            " ",
                                                            React.createElement("i", { className: "ion-ios-add ml-1" }))),
                                                    React.createElement("a", { href: "#", className: "buy-now text-center py-2" },
                                                        React.createElement(Translate, { content: 'search.BuyNow' }),
                                                        React.createElement("span", null,
                                                            React.createElement("i", { className: "ion-ios-cart ml-1" })))))))); })),
                                    React.createElement("div", { className: "row mt-5" },
                                        React.createElement("div", { className: "col text-center" },
                                            React.createElement("div", { className: "block-27" },
                                                React.createElement(react_js_pagination_1.default, { hideDisabled: true, activePage: this.state.activePage, itemsCountPerPage: this.state.itemsPerPage, totalItemsCount: this.state.totalItemsCount, pageRangeDisplayed: 5, onChange: this.handlePageChange }))))),
                                React.createElement("div", { className: "col-md-4 col-lg-2" },
                                    React.createElement("div", { className: "sidebar" },
                                        React.createElement("div", { className: "sidebar-box-2" },
                                            React.createElement("h2", { className: "heading" },
                                                React.createElement(Translate, { content: 'search.Categories' })),
                                            React.createElement("div", { className: "fancy-collapse-panel" },
                                                React.createElement("form", { action: "", className: "billing-form", onSubmit: this.handleSubmit },
                                                    React.createElement("div", { className: "panel-group", id: "accordion", role: "tablist", "aria-multiselectable": "true" },
                                                        React.createElement("div", { className: "panel panel-default" },
                                                            React.createElement("div", { className: "panel-heading", role: "tab", id: "headingOne" },
                                                                React.createElement("h4", { className: "panel-title" },
                                                                    React.createElement("a", { "data-toggle": "collapse", "data-parent": "#accordion", href: "#collapseOne", "aria-expanded": "true", "aria-controls": "collapseOne" },
                                                                        React.createElement(Translate, { content: 'search.Gender' })))),
                                                            React.createElement("div", { id: "collapseOne", className: "panel-collapse collapse", role: "tabpanel", "aria-labelledby": "headingOne" },
                                                                React.createElement("div", { className: "panel-body" },
                                                                    React.createElement("ul", null,
                                                                        React.createElement("li", null,
                                                                            React.createElement("input", { type: "radio", className: "form-check-input", name: "gender", value: "Men", checked: this.state.gender === "Men", onChange: this.handleChange, id: "gender-men" }),
                                                                            React.createElement("label", { className: "form-check-label", htmlFor: "gender-men" },
                                                                                React.createElement(Translate, { content: 'search.Men' }))),
                                                                        React.createElement("li", null,
                                                                            React.createElement("input", { type: "radio", className: "form-check-input", name: "gender", value: "Women", checked: this.state.gender === "Women", onChange: this.handleChange, id: "gender-women" }),
                                                                            React.createElement("label", { className: "form-check-label", htmlFor: "gender-women" },
                                                                                React.createElement(Translate, { content: 'search.Women' }))))))),
                                                        React.createElement("div", { className: "panel panel-default" },
                                                            React.createElement("div", { className: "panel-heading", role: "tab", id: "headingTwo" },
                                                                React.createElement("h4", { className: "panel-title" },
                                                                    React.createElement("a", { className: "collapsed", "data-toggle": "collapse", "data-parent": "#accordion", href: "#collapseTwo", "aria-expanded": "false", "aria-controls": "collapseTwo" },
                                                                        React.createElement(Translate, { content: 'search.Products' })))),
                                                            React.createElement("div", { id: "collapseTwo", className: "panel-collapse collapse", role: "tabpanel", "aria-labelledby": "headingTwo" },
                                                                React.createElement("div", { className: "panel-body" },
                                                                    React.createElement("ul", null,
                                                                        React.createElement("li", null,
                                                                            React.createElement("input", { type: "radio", className: "form-check-input", name: "type", value: "Bags", checked: this.state.type === "Bags", id: "type-bags", onChange: this.handleChange }),
                                                                            React.createElement("label", { className: "form-check-label", htmlFor: "type-bags" },
                                                                                React.createElement(Translate, { content: 'search.Bags' }))),
                                                                        React.createElement("li", null,
                                                                            React.createElement("input", { type: "radio", className: "form-check-input", name: "type", value: "Belts", checked: this.state.type === "Belts", id: "type-belts", onChange: this.handleChange }),
                                                                            React.createElement("label", { className: "form-check-label", htmlFor: "type-belts" },
                                                                                React.createElement(Translate, { content: 'search.Belts' }))))))),
                                                        React.createElement("div", { className: "panel panel-default" },
                                                            React.createElement("div", { className: "panel-heading", role: "tab", id: "headingThree" },
                                                                React.createElement("h4", { className: "panel-title" },
                                                                    React.createElement("a", { className: "collapsed", "data-toggle": "collapse", "data-parent": "#accordion", href: "#collapseThree", "aria-expanded": "false", "aria-controls": "headingThree" },
                                                                        React.createElement(Translate, { content: 'search.PriceRange' })))),
                                                            React.createElement("div", { id: "collapseThree", className: "panel-collapse collapse", role: "tabpanel", "aria-labelledby": "headingThree" },
                                                                React.createElement("div", { className: "panel-body" },
                                                                    React.createElement("ul", null,
                                                                        React.createElement("li", null,
                                                                            React.createElement("input", { type: "radio", className: "form-check-input", name: "priceInterval", value: "1", checked: this.state.priceInterval === "1", id: "range1", onChange: this.handleChange }),
                                                                            React.createElement("label", { className: "form-check-label", htmlFor: "range1" }, "Under $50")),
                                                                        React.createElement("li", null,
                                                                            React.createElement("input", { type: "radio", className: "form-check-input", name: "priceInterval", value: "2", checked: this.state.priceInterval === "2", id: "range2", onChange: this.handleChange }),
                                                                            React.createElement("label", { className: "form-check-label", htmlFor: "range2" }, " $50 to $100")),
                                                                        React.createElement("li", null,
                                                                            React.createElement("input", { type: "radio", className: "form-check-input", name: "priceInterval", value: "3", checked: this.state.priceInterval === "3", id: "range3", onChange: this.handleChange }),
                                                                            React.createElement("label", { className: "form-check-label", htmlFor: "range3" }, "$100 to $200")),
                                                                        React.createElement("li", null,
                                                                            React.createElement("input", { type: "radio", className: "form-check-input", name: "priceInterval", value: "4", checked: this.state.priceInterval === "4", id: "range4", onChange: this.handleChange }),
                                                                            React.createElement("label", { className: "form-check-label", htmlFor: "range4" }, "$200 to $500")),
                                                                        React.createElement("li", null,
                                                                            React.createElement("input", { type: "radio", className: "form-check-input", name: "priceInterval", value: "5", checked: this.state.priceInterval === "5", id: "range5", onChange: this.handleChange }),
                                                                            React.createElement("label", { className: "form-check-label", htmlFor: "range5" }, "$500 & Above")))))),
                                                        React.createElement("div", { className: "col-md-4" },
                                                            React.createElement("div", { className: "form-group" },
                                                                React.createElement(Translate, { component: "input", attributes: { value: 'search.Filter', }, type: "submit", className: "btn btn-primary py-3 px-5" })))))))))))))));
        }
    };
    return Search;
}(React.Component));
exports.Search = Search;
//# sourceMappingURL=PageSearch.js.map
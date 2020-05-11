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
var sfcookies_1 = require("sfcookies");
var react_notifications_1 = require("react-notifications");
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
var SectionProducts = /** @class */ (function (_super) {
    __extends(SectionProducts, _super);
    function SectionProducts(props) {
        var _this = _super.call(this, props) || this;
        counterpart.setLocale(sfcookies_1.read_cookie('lang'));
        _this.state = { isLoaded: false, items: null, error: null, gender: props.Gender, type: props.Type, language: sfcookies_1.read_cookie('lang'), currency: sfcookies_1.read_cookie('currency') };
        _this.addProductToCart = _this.addProductToCart.bind(_this);
        _this.buyProduct = _this.buyProduct.bind(_this);
        return _this;
    }
    SectionProducts.prototype.componentWillMount = function () {
        var _this = this;
        axios.get(API_Path + '/Products', {
            params: {
                top: 20,
                from: 0,
                gender: this.state.gender,
                type: this.state.type,
                lang: this.state.language,
                currency: this.state.currency
            }
        })
            .then(function (response) {
            _this.setState({ isLoaded: true, items: response.data.data });
            if (null != _this.props.setLoadedComponentsArray) {
                _this.props.setLoadedComponentsArray("SectionProducts" + _this.state.gender + _this.state.type, "true");
            }
        })
            .catch(function (error) {
            _this.setState({ isLoaded: true, error: error });
        })
            .then();
    };
    SectionProducts.prototype.readCartFromCookie = function (cookie) {
        var cartProducts = new Dictionary_1.KeyedCollection();
        for (var prop in cookie.items) {
            cartProducts.Add(parseInt(prop, 10), cookie.items[prop]);
        }
        return cartProducts;
    };
    SectionProducts.prototype.addProductToCart = function (productId, no, reloadPage) {
        if (sfcookies_1.read_cookie('token') == null || sfcookies_1.read_cookie('token').length == 0) {
            react_notifications_1.NotificationManager.info("Please login in order to add products to cart.");
        }
        else {
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
            this.setState({ state: this.state });
            if (reloadPage) {
                this.props.reloadPage();
            }
        }
    };
    SectionProducts.prototype.buyProduct = function (productId) {
        if (sfcookies_1.read_cookie('token') == null || sfcookies_1.read_cookie('token').length == 0) {
            react_notifications_1.NotificationManager.info("Please login in order to add products to cart.");
        }
        else {
            this.addProductToCart(productId, 1, false);
            document.location.href = "/#/cart";
        }
    };
    SectionProducts.prototype.render = function () {
        var _this = this;
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, items = _a.items, gender = _a.gender, type = _a.type, currency = _a.currency;
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
        else if (!isLoaded) {
            return React.createElement("div", null);
        }
        else {
            return (React.createElement("div", null,
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "jumbotron", style: { backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .5)), url('images/banner_" + gender + "_" + type + ".jpg')" } },
                        React.createElement("div", { className: "col-md-12 heading-section text-center", style: { fontFamily: 'Brush Script St', opacity: 1 } },
                            type == 'Bags' ? React.createElement("h2", { className: "mb-4", id: gender + "-section" },
                                React.createElement(Translate, { content: 'products.' + gender })) : React.createElement("h2", { className: "mb-4", id: gender + "-section", style: { opacity: 0 } },
                                React.createElement(Translate, { content: 'products.' + gender })),
                            React.createElement("h2", null,
                                React.createElement(Translate, { content: 'products.' + type })))),
                    React.createElement("div", { className: "row", id: gender + "-" + type + "-section" }, items.map(function (item, i) { return (React.createElement("div", { key: i, className: "col-lg-4 col-md-6 product-item filter-app wow fadeInUp" },
                        React.createElement("div", { className: "product d-flex flex-column" },
                            React.createElement("a", { href: "/#/item/" + item.ProductId, className: "img-prod" },
                                React.createElement("img", { className: "img-fluid", src: item.Image, alt: "", style: { width: '350px', height: '466px' } }),
                                React.createElement("div", { className: "overlay" })),
                            React.createElement("div", { className: "text py-3 pb-4 px-3" },
                                React.createElement("h3", null,
                                    React.createElement("a", { href: "/#/item/" + item.ProductId }, item.Name)),
                                React.createElement("div", { className: "pricing" },
                                    React.createElement("p", { className: "price" },
                                        React.createElement("span", null, currencyBeforeSign + " " + item.Price + " " + currencyAfterSign))),
                                React.createElement("p", { className: "bottom-area d-flex px-3" },
                                    React.createElement("a", { href: "javascript:void(0)", className: "add-to-cart text-center py-2 mr-1", onClick: function () { return _this.addProductToCart(item.ProductId, 1, true); } },
                                        React.createElement("span", null,
                                            React.createElement(Translate, { content: "products.AddToCart" }),
                                            React.createElement("i", { className: "ion-ios-add ml-1" }))),
                                    React.createElement("a", { href: "javascript:void(0)", onClick: function () { return _this.buyProduct(item.ProductId); }, className: "buy-now text-center py-2" },
                                        React.createElement(Translate, { content: "products.BuyNow" }),
                                        React.createElement("span", null,
                                            React.createElement("i", { className: "ion-ios-cart ml-1" })))))))); })))));
        }
    };
    return SectionProducts;
}(React.Component));
exports.SectionProducts = SectionProducts;
//# sourceMappingURL=SectionProducts.js.map
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
var Header_1 = require("./Header");
var sfcookies_1 = require("sfcookies");
var react_notifications_1 = require("react-notifications");
var Translate = require("react-translate-component");
var en_1 = require("./languages/en");
var it_1 = require("./languages/it");
var ro_1 = require("./languages/ro");
var react_image_gallery_1 = require("react-image-gallery");
require("react-image-gallery/styles/css/image-gallery.css");
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var counterpart = require('counterpart');
counterpart.registerTranslations('en', en_1.default);
counterpart.registerTranslations('ro', ro_1.default);
counterpart.registerTranslations('it', it_1.default);
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product(props) {
        var _this = _super.call(this, props) || this;
        _this.increaseQuantity = function () {
            _this.setState({ quantity: _this.state.quantity + 1 });
        };
        _this.decreaseQuantity = function () {
            if (_this.state.quantity == 1) {
                _this.setState({ quantity: 1 });
            }
            else {
                _this.setState({ quantity: _this.state.quantity - 1 });
            }
        };
        var dictionary = new Dictionary_1.KeyedCollection();
        counterpart.setLocale(sfcookies_1.read_cookie('lang'));
        _this.state = { isLoaded: false, item: null, error: null, imageDictionary: dictionary, productId: props.match.params.id, quantity: 1, language: sfcookies_1.read_cookie('lang'), currency: sfcookies_1.read_cookie('currency') };
        _this.getImageForProduct = _this.getImageForProduct.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.reloadPage = _this.reloadPage.bind(_this);
        _this.addProductToCart = _this.addProductToCart.bind(_this);
        _this.buyProduct = _this.buyProduct.bind(_this);
        return _this;
    }
    Product.prototype.componentWillMount = function () {
        var _this = this;
        axios.get(API_Path + '/Products/', {
            params: {
                productId: this.state.productId,
                lang: this.state.language,
                currency: this.state.currency
            }
        })
            .then(function (response) {
            var dictionary = _this.state.imageDictionary;
            _this.setState({ isLoaded: true, item: response.data, imageDictionary: dictionary });
        })
            .catch(function (error) {
            _this.setState({ isLoaded: true, error: error });
        })
            .then();
    };
    Product.prototype.handleChange = function (event) {
        var _a;
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
        this.setState({ isChanged: true });
    };
    Product.prototype.getImageForProduct = function (productId) {
        var _this = this;
        axios.get(API_Path + '/ProductsImages/' + productId)
            .then(function (response) {
            var dictionary = _this.state.imageDictionary;
            dictionary.Add(productId, response.data);
            _this.setState({ imageDictionary: dictionary });
        }).catch(function (err) {
            console.log(productId + " .... " + _this.state.imageDictionary);
            //console.log(err);        
        });
    };
    Product.prototype.readCartFromCookie = function (cookie) {
        var cartProducts = new Dictionary_1.KeyedCollection();
        for (var prop in cookie.items) {
            cartProducts.Add(parseInt(prop, 10), cookie.items[prop]);
        }
        return cartProducts;
    };
    Product.prototype.addProductToCart = function (productId, no) {
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
        }
    };
    Product.prototype.buyProduct = function (productId) {
        if (sfcookies_1.read_cookie('token') == null || sfcookies_1.read_cookie('token').length == 0) {
            react_notifications_1.NotificationManager.info("Please login in order to add products to cart.");
        }
        else {
            this.addProductToCart(productId, 1);
            document.location.href = "/#/cart";
        }
    };
    Product.prototype.reloadPage = function () {
        window.location.reload(false);
    };
    Product.prototype.render = function () {
        var _this = this;
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, item = _a.item, quantity = _a.quantity, currency = _a.currency;
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
            return (React.createElement("div", null,
                React.createElement(Header_1.Header, { reloadPage: this.reloadPage }),
                React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                    React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                        React.createElement("div", { className: "col-md-9 text-center" },
                            React.createElement("h1", { className: "mb-0 bread" }, "ARE YOU HAPPY NOW?"),
                            React.createElement("h5", null, "Just kidding! Our bad. 404 NOT FOUND"))))));
        }
        else if (!isLoaded) {
            return React.createElement("div", { className: "loading" }, "Loading\u2026");
        }
        else {
            var images_1 = [];
            item.Image.map(function (img, i) { return (images_1.push({ original: img, thumbnail: img })); });
            return (React.createElement("div", null,
                React.createElement(Header_1.Header, { reloadPage: this.reloadPage }),
                React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                    React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                        React.createElement("div", { className: "col-md-9 text-center" },
                            React.createElement("h1", { className: "mb-0 bread" },
                                React.createElement(Translate, { content: 'product.ProductDetails' }))))),
                React.createElement("section", { className: "ftco-section" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-lg-6 mb-5" },
                                React.createElement(react_image_gallery_1.default, { items: images_1, showPlayButton: false, showFullscreenButton: false, showNav: false, autoPlay: true })),
                            React.createElement("div", { className: "col-lg-6 product-details pl-md-5" },
                                React.createElement("h3", null, item.Name),
                                React.createElement("p", { className: "price" },
                                    React.createElement("span", null, currencyBeforeSign + " " + item.Price + " " + currencyAfterSign)),
                                React.createElement("p", null, item.Description),
                                React.createElement("div", { className: "row mt-4" },
                                    React.createElement("div", { className: "w-100" }),
                                    React.createElement("div", { className: "input-group col-md-6 d-flex mb-3" },
                                        React.createElement("span", { className: "input-group-btn mr-2" },
                                            React.createElement("button", { type: "button", className: "quantity-left-minus btn", "data-type": "minus", "data-field": "", onClick: this.decreaseQuantity }, "-")),
                                        React.createElement("input", { type: "text", id: "quantity", name: "quantity", className: "quantity form-control input-number", min: "1", max: "100", value: quantity, onChange: this.handleChange }),
                                        React.createElement("span", { className: "input-group-btn ml-2" },
                                            React.createElement("button", { type: "button", className: "quantity-right-plus btn", "data-type": "plus", "data-field": "", onClick: this.increaseQuantity }, "+"))),
                                    React.createElement("div", { className: "w-100" }),
                                    React.createElement("div", { className: "col-md-12" },
                                        React.createElement("p", { onClick: function () { return _this.addProductToCart(item.ProductId, quantity); } },
                                            React.createElement("a", { className: "btn btn-black py-3 px-5 mr-2" },
                                                React.createElement(Translate, { content: 'product.AddToCart' })),
                                            React.createElement("a", { href: "javascript:void(0)", onClick: function () { return _this.buyProduct(item.ProductId); }, className: "btn btn-primary py-3 px-5" },
                                                React.createElement(Translate, { content: 'product.BuyNow' })))))))))));
        }
    };
    return Product;
}(React.Component));
exports.Product = Product;
//# sourceMappingURL=PageProduct.js.map
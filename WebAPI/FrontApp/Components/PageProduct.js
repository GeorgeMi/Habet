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
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product(props) {
        var _this = _super.call(this, props) || this;
        var dictionary = new Dictionary_1.KeyedCollection();
        _this.state = { isLoaded: false, item: null, error: null, imageDictionary: dictionary, productId: props.match.params.id };
        _this.getImageForProduct = _this.getImageForProduct.bind(_this);
        return _this;
    }
    Product.prototype.componentWillMount = function () {
        var _this = this;
        axios.get(API_Path + '/Products/' + this.state.productId)
            .then(function (response) {
            var dictionary = _this.state.imageDictionary;
            _this.setState({ isLoaded: true, item: response.data, imageDictionary: dictionary });
            //     this.getImageForProduct(response.data.productId);
        })
            .catch(function (error) {
            _this.setState({ isLoaded: true, error: error });
        })
            .then();
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
    Product.prototype.render = function () {
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, item = _a.item, imageDictionary = _a.imageDictionary;
        if (error) {
            return (React.createElement("div", null,
                React.createElement(Header_1.Header, null),
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
            return (React.createElement("div", null,
                React.createElement(Header_1.Header, null),
                React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                    React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                        React.createElement("div", { className: "col-md-9 text-center" },
                            React.createElement("h1", { className: "mb-0 bread" }, "Product details")))),
                React.createElement("section", { className: "ftco-section" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-lg-6 mb-5" },
                                React.createElement("a", { href: item.Image, className: "image-popup prod-img-bg" },
                                    React.createElement("img", { src: item.Image, className: "img-fluid", alt: "..." }))),
                            React.createElement("div", { className: "col-lg-6 product-details pl-md-5" },
                                React.createElement("h3", null, item.Name),
                                React.createElement("p", { className: "price" },
                                    React.createElement("span", null,
                                        "$",
                                        item.Price)),
                                React.createElement("p", null, item.Description),
                                React.createElement("div", { className: "row mt-4" },
                                    React.createElement("div", { className: "w-100" }),
                                    React.createElement("div", { className: "input-group col-md-6 d-flex mb-3" },
                                        React.createElement("span", { className: "input-group-btn mr-2" },
                                            React.createElement("button", { type: "button", className: "quantity-left-minus btn", "data-type": "minus", "data-field": "" },
                                                React.createElement("i", { className: "ion-ios-remove" }))),
                                        React.createElement("input", { type: "text", id: "quantity", name: "quantity", className: "quantity form-control input-number", min: "1", max: "100" }),
                                        React.createElement("span", { className: "input-group-btn ml-2" },
                                            React.createElement("button", { type: "button", className: "quantity-right-plus btn", "data-type": "plus", "data-field": "" },
                                                React.createElement("i", { className: "ion-ios-add" })))),
                                    React.createElement("div", { className: "w-100" }),
                                    React.createElement("div", { className: "col-md-12" },
                                        React.createElement("p", null,
                                            React.createElement("a", { href: "cart.html", className: "btn btn-black py-3 px-5 mr-2" }, "Add to Cart"),
                                            React.createElement("a", { href: "cart.html", className: "btn btn-primary py-3 px-5" }, "Buy now"))))))))));
        }
    };
    return Product;
}(React.Component));
exports.Product = Product;
//# sourceMappingURL=PageProduct.js.map
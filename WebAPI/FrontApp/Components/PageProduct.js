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
        _this.state = { isLoaded: false, item: null, error: null, imageDictionary: dictionary };
        _this.getImageForProduct = _this.getImageForProduct.bind(_this);
        return _this;
    }
    Product.prototype.componentWillMount = function () {
        var _this = this;
        axios.get(API_Path + '/Products/1')
            .then(function (response) {
            var dictionary = _this.state.imageDictionary;
            _this.setState({ isLoaded: true, item: response.data, imageDictionary: dictionary });
            _this.getImageForProduct(response.data.productId);
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
            console.log(error);
            return React.createElement("div", null,
                "Error: ",
                error.message);
        }
        else if (!isLoaded) {
            return React.createElement("div", null, "Loading...");
        }
        else {
            return (React.createElement("div", null,
                React.createElement(Header_1.Header, null),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("section", { id: "portfolio", className: "section-bg" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row portfolio-container" },
                            React.createElement("div", { className: "col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp" },
                                React.createElement("div", { className: "portfolio-wrap" },
                                    React.createElement("figure", null,
                                        React.createElement("img", { src: imageDictionary.Item(item.productId), className: "img-fluid", alt: "" }),
                                        React.createElement("a", { href: imageDictionary.Item(item.productId), "data-lightbox": "portfolio", "data-title": item.name, className: "link-preview", title: "Preview" },
                                            React.createElement("i", { className: "ion ion-eye" })),
                                        React.createElement("a", { href: "#", className: "link-details", title: "More Details" },
                                            React.createElement("i", { className: "ion ion-android-open" }))))),
                            React.createElement("div", { className: "col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp" },
                                React.createElement("h4", null,
                                    React.createElement("a", { href: "#" }, item.name)),
                                React.createElement("p", null, item.description)))))));
        }
    };
    return Product;
}(React.Component));
exports.Product = Product;
//# sourceMappingURL=PageProduct.js.map
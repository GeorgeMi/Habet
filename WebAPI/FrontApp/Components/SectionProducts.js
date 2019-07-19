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
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var SectionProducts = /** @class */ (function (_super) {
    __extends(SectionProducts, _super);
    function SectionProducts(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { isLoaded: false, items: null, error: null, gender: props.Gender, type: props.Type };
        return _this;
    }
    SectionProducts.prototype.componentWillMount = function () {
        var _this = this;
        axios.get(API_Path + '/Products', {
            params: {
                top: 20,
                from: 0
            }
        })
            .then(function (response) {
            _this.setState({ isLoaded: true, items: response.data });
        })
            .catch(function (error) {
            _this.setState({ isLoaded: true, error: error });
        })
            .then();
    };
    SectionProducts.prototype.render = function () {
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, items = _a.items, type = _a.type;
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
            return (React.createElement("div", { className: "row" }, items.map(function (item, i) { return (React.createElement("div", { key: i, className: "col-lg-4 col-md-6 product-item filter-app wow fadeInUp" },
                React.createElement("div", { className: "product d-flex flex-column" },
                    React.createElement("a", { href: "/#/item/" + item.productId, className: "img-prod" },
                        React.createElement("img", { className: "img-fluid", src: item.image, alt: "" }),
                        React.createElement("div", { className: "overlay" })),
                    React.createElement("div", { className: "text py-3 pb-4 px-3" },
                        React.createElement("div", { className: "d-flex" },
                            React.createElement("div", { className: "cat" },
                                React.createElement("span", null, type)),
                            React.createElement("div", { className: "rating" },
                                React.createElement("p", { className: "text-right mb-0" },
                                    React.createElement("a", { href: "#" },
                                        React.createElement("span", { className: "ion-ios-star-outline" })),
                                    React.createElement("a", { href: "#" },
                                        React.createElement("span", { className: "ion-ios-star-outline" })),
                                    React.createElement("a", { href: "#" },
                                        React.createElement("span", { className: "ion-ios-star-outline" })),
                                    React.createElement("a", { href: "#" },
                                        React.createElement("span", { className: "ion-ios-star-outline" })),
                                    React.createElement("a", { href: "#" },
                                        React.createElement("span", { className: "ion-ios-star-outline" }))))),
                        React.createElement("h3", null,
                            React.createElement("a", { href: "/#/item/" + item.productId }, item.name)),
                        React.createElement("div", { className: "pricing" },
                            React.createElement("p", { className: "price" },
                                React.createElement("span", null,
                                    "$",
                                    item.price))),
                        React.createElement("p", { className: "bottom-area d-flex px-3" },
                            React.createElement("a", { href: "#", className: "add-to-cart text-center py-2 mr-1" },
                                React.createElement("span", null,
                                    "Add to cart ",
                                    React.createElement("i", { className: "ion-ios-add ml-1" }))),
                            React.createElement("a", { href: "#", className: "buy-now text-center py-2" },
                                "Buy now",
                                React.createElement("span", null,
                                    React.createElement("i", { className: "ion-ios-cart ml-1" })))))))); })));
        }
    };
    return SectionProducts;
}(React.Component));
exports.SectionProducts = SectionProducts;
//# sourceMappingURL=SectionProducts.js.map
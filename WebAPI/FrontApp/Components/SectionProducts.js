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
            _this.setState({ isLoaded: true, items: response.data.data });
            _this.props.setLoadedComponentsArray("SectionProducts" + _this.state.gender + _this.state.type, "true");
        })
            .catch(function (error) {
            _this.setState({ isLoaded: true, error: error });
        })
            .then();
    };
    SectionProducts.prototype.render = function () {
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, items = _a.items, gender = _a.gender, type = _a.type;
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
                    React.createElement("div", { className: "row justify-content-center mb-3 pb-3" },
                        React.createElement("div", { className: "col-md-12 heading-section text-center" },
                            type == 'Bags' ? React.createElement("h2", { className: "mb-4", id: gender + "-section" }, gender) : React.createElement("div", null),
                            React.createElement("p", { id: gender + "-" + type + "-section" }, type)))),
                React.createElement("div", { className: "container" },
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
                                    React.createElement("a", { href: "#", className: "add-to-cart text-center py-2 mr-1" },
                                        React.createElement("span", null,
                                            "Add to cart ",
                                            React.createElement("i", { className: "ion-ios-add ml-1" }))),
                                    React.createElement("a", { href: "#", className: "buy-now text-center py-2" },
                                        "Buy now",
                                        React.createElement("span", null,
                                            React.createElement("i", { className: "ion-ios-cart ml-1" })))))))); })))));
        }
    };
    return SectionProducts;
}(React.Component));
exports.SectionProducts = SectionProducts;
//# sourceMappingURL=SectionProducts.js.map
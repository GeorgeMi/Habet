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
var Chart = /** @class */ (function (_super) {
    __extends(Chart, _super);
    function Chart(props) {
        return _super.call(this, props) || this;
    }
    Chart.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Header_1.Header, null),
            React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                        React.createElement("div", { className: "col-md-9 text-center" },
                            React.createElement("p", { className: "breadcrumbs" },
                                React.createElement("span", { className: "mr-2" },
                                    React.createElement("a", { href: "index.html" }, "Home")),
                                " ",
                                React.createElement("span", null, "Cart")),
                            React.createElement("h1", { className: "mb-0 bread" }, "My Wishlist"))))),
            React.createElement("section", { className: "ftco-section ftco-cart" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-12" },
                            React.createElement("div", { className: "cart-list" },
                                React.createElement("table", { className: "table" },
                                    React.createElement("thead", { className: "thead-primary" },
                                        React.createElement("tr", { className: "text-center" },
                                            React.createElement("th", null, "\u00A0"),
                                            React.createElement("th", null, "\u00A0"),
                                            React.createElement("th", null, "Product"),
                                            React.createElement("th", null, "Price"),
                                            React.createElement("th", null, "Quantity"),
                                            React.createElement("th", null, "Total"))),
                                    React.createElement("tbody", null,
                                        React.createElement("tr", { className: "text-center" },
                                            React.createElement("td", { className: "product-remove" },
                                                React.createElement("a", { href: "#" },
                                                    React.createElement("span", { className: "ion-ios-close" }))),
                                            React.createElement("td", { className: "image-prod" },
                                                React.createElement("div", { className: "img", style: { backgroundImage: "url('images/product.png')" } })),
                                            React.createElement("td", { className: "product-name" },
                                                React.createElement("h3", null, "Nike Free RN 2019 iD"),
                                                React.createElement("p", null, "Far far away, behind the word mountains, far from the countries")),
                                            React.createElement("td", { className: "price" }, "$4.90"),
                                            React.createElement("td", { className: "quantity" },
                                                React.createElement("div", { className: "input-group mb-3" },
                                                    React.createElement("input", { type: "text", name: "quantity", className: "quantity form-control input-number", value: "1", min: "1", max: "100" }))),
                                            React.createElement("td", { className: "total" }, "$4.90")),
                                        React.createElement("tr", { className: "text-center" },
                                            React.createElement("td", { className: "product-remove" },
                                                React.createElement("a", { href: "#" },
                                                    React.createElement("span", { className: "ion-ios-close" }))),
                                            React.createElement("td", { className: "image-prod" },
                                                React.createElement("div", { className: "img", style: { backgroundImage: "url('images/product.png')" } })),
                                            React.createElement("td", { className: "product-name" },
                                                React.createElement("h3", null, "Nike Free RN 2019 iD"),
                                                React.createElement("p", null, "Far far away, behind the word mountains, far from the countries")),
                                            React.createElement("td", { className: "price" }, "$15.70"),
                                            React.createElement("td", { className: "quantity" },
                                                React.createElement("div", { className: "input-group mb-3" },
                                                    React.createElement("input", { type: "text", name: "quantity", className: "quantity form-control input-number", value: "1", min: "1", max: "100" }))),
                                            React.createElement("td", { className: "total" }, "$15.70"))))))),
                    React.createElement("div", { className: "row justify-content-start" },
                        React.createElement("div", { className: "col col-lg-5 col-md-6 mt-5 cart-wrap" },
                            React.createElement("div", { className: "cart-total mb-3" },
                                React.createElement("h3", null, "Cart Totals"),
                                React.createElement("p", { className: "d-flex" },
                                    React.createElement("span", null, "Subtotal"),
                                    React.createElement("span", null, "$20.60")),
                                React.createElement("p", { className: "d-flex" },
                                    React.createElement("span", null, "Delivery"),
                                    React.createElement("span", null, "$0.00")),
                                React.createElement("p", { className: "d-flex" },
                                    React.createElement("span", null, "Discount"),
                                    React.createElement("span", null, "$3.00")),
                                React.createElement("hr", null),
                                React.createElement("p", { className: "d-flex total-price" },
                                    React.createElement("span", null, "Total"),
                                    React.createElement("span", null, "$17.60"))),
                            React.createElement("p", { className: "text-center" },
                                React.createElement("a", { href: "checkout.html", className: "btn btn-primary py-3 px-4" }, "Proceed to Checkout"))))))));
    };
    return Chart;
}(React.Component));
exports.Chart = Chart;
//# sourceMappingURL=PageChart.js.map
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
        _this.state = { isLoaded: false, items: null, error: null };
        return _this;
    }
    SectionProducts.prototype.componentWillMount = function () {
        var _this = this;
        axios.get(API_Path + '/Products', {
            params: {
                ID: 1
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
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, items = _a.items;
        console.log(items);
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
            return (React.createElement("section", { id: "portfolio", className: "section-bg" },
                React.createElement("div", { className: "container" },
                    React.createElement("header", { className: "section-header" },
                        React.createElement("h3", { className: "section-title" }, "Our Portfolio")),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-lg-12" },
                            React.createElement("ul", { id: "portfolio-flters" },
                                React.createElement("li", { "data-filter": "*", className: "filter-active" }, "All"),
                                React.createElement("li", { "data-filter": ".filter-app" }, "App"),
                                React.createElement("li", { "data-filter": ".filter-card" }, "Card"),
                                React.createElement("li", { "data-filter": ".filter-web" }, "Web")))),
                    React.createElement("div", { className: "row portfolio-container" }, items.map(function (item, i) { return (React.createElement("div", { key: i, className: "col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp" },
                        React.createElement("div", { className: "portfolio-wrap" },
                            React.createElement("figure", null,
                                React.createElement("img", { src: "{item.image}", className: "img-fluid", alt: "" }),
                                React.createElement("a", { href: "{item.image}", "data-lightbox": "portfolio", "data-title": "App 1", className: "link-preview", title: "Preview" },
                                    React.createElement("i", { className: "ion ion-eye" })),
                                React.createElement("a", { href: "#", className: "link-details", title: "More Details" },
                                    React.createElement("i", { className: "ion ion-android-open" }))),
                            React.createElement("div", { className: "portfolio-info" },
                                React.createElement("h4", null,
                                    React.createElement("a", { href: "#" }, item.name)),
                                React.createElement("p", null, item.description))))); })))));
        }
    };
    return SectionProducts;
}(React.Component));
exports.SectionProducts = SectionProducts;
//# sourceMappingURL=SectionProducts.js.map
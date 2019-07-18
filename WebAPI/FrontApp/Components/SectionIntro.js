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
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var SectionIntro = /** @class */ (function (_super) {
    __extends(SectionIntro, _super);
    function SectionIntro(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { isLoaded: false, items: null, error: null };
        return _this;
    }
    SectionIntro.prototype.componentWillMount = function () {
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
    SectionIntro.prototype.render = function () {
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, items = _a.items;
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
            var activeDictionary = new Dictionary_1.KeyedCollection();
            items.map(function (item, i) { return (activeDictionary.Add(i, "")); });
            activeDictionary.Add(0, "active");
            return (React.createElement("section", { id: "intro" },
                React.createElement("div", { className: "intro-container" },
                    React.createElement("div", { id: "introCarousel", className: "carousel  slide carousel-fade", "data-ride": "carousel" },
                        React.createElement("ol", { className: "carousel-indicators" }),
                        React.createElement("div", { className: "carousel-inner", role: "listbox" }, items.map(function (item, i) { return (React.createElement("div", { key: i, className: activeDictionary.Item(i) + " carousel-item" },
                            React.createElement("div", { className: "carousel-background" },
                                React.createElement("img", { src: item.image, alt: "" })),
                            React.createElement("div", { className: "carousel-container" },
                                React.createElement("div", { className: "carousel-content" },
                                    React.createElement("h2", null, item.name),
                                    React.createElement("p", null,
                                        "$ ",
                                        item.price),
                                    React.createElement("a", { href: "/#/item/" + item.productId, className: "btn-get-started scrollto" }, "Details"))))); })),
                        React.createElement("a", { className: "carousel-control-prev", href: "#introCarousel", role: "button", "data-slide": "prev" },
                            React.createElement("span", { className: "carousel-control-prev-icon ion-chevron-left", "aria-hidden": "true" }),
                            React.createElement("span", { className: "sr-only" }, "Previous")),
                        React.createElement("a", { className: "carousel-control-next", href: "#introCarousel", role: "button", "data-slide": "next" },
                            React.createElement("span", { className: "carousel-control-next-icon ion-chevron-right", "aria-hidden": "true" }),
                            React.createElement("span", { className: "sr-only" }, "Next"))))));
        }
    };
    return SectionIntro;
}(React.Component));
exports.SectionIntro = SectionIntro;
//# sourceMappingURL=SectionIntro.js.map
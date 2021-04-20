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
var sfcookies_1 = require("sfcookies");
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
var SectionIntro = /** @class */ (function (_super) {
    __extends(SectionIntro, _super);
    function SectionIntro(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { isLoaded: false, items: null, error: null, language: sfcookies_1.read_cookie('lang'), currency: sfcookies_1.read_cookie('currency') };
        _this.setActiveClassName = _this.setActiveClassName.bind(_this);
        return _this;
    }
    SectionIntro.prototype.componentWillMount = function () {
        var _this = this;
        axios.get(API_Path + '/Products', {
            params: {
                top: 5,
                from: 0,
                gender: "none",
                type: "intro",
                lang: this.state.language,
                currency: this.state.currency
            }
        })
            .then(function (response) {
            _this.setState({ isLoaded: true, items: response.data.data });
            if (null != _this.props.setLoadedComponentsArray) {
                _this.props.setLoadedComponentsArray("Intro", "true");
            }
        })
            .catch(function (error) {
            _this.setState({ isLoaded: true, error: error });
        })
            .then();
    };
    SectionIntro.prototype.setActiveClassName = function (id) {
        if (id == 0) {
            return "active";
        }
        else
            return "";
    };
    SectionIntro.prototype.render = function () {
        var _this = this;
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, items = _a.items, currency = _a.currency;
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
            return (React.createElement("section", { className: "ftco-section ftco-deal", style: { backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" } },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { id: "carouselExampleControls", className: "carousel slide", "data-ride": "carousel" },
                        React.createElement("div", { className: "carousel-inner" },
                            items.map(function (item, i) { return (React.createElement("div", { key: i, className: _this.setActiveClassName(i) + " carousel-item" },
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "col-md-6" },
                                        React.createElement("img", { src: item.Image, className: "img-fluid", alt: "" })),
                                    React.createElement("div", { className: "carrousel-description col-md-6" },
                                        React.createElement("div", { className: "text-deal" },
                                            React.createElement("h2", null,
                                                React.createElement("a", { href: "#" }, item.Name)),
                                            React.createElement("p", { className: "price", style: { fontWeight: 100 } },
                                                React.createElement("span", null, currencyBeforeSign + " " + item.Price + " " + currencyAfterSign)),
                                            React.createElement("p", null,
                                                React.createElement("a", { href: "/#/item/" + item.ProductId, className: "btn btn-primary py-3 px-5" },
                                                    React.createElement(Translate, { content: 'product.Details' })))))))); }),
                            React.createElement("a", { className: "carousel-control-prev", href: "#carouselExampleControls", role: "button", "data-slide": "prev" },
                                React.createElement("span", { className: "carousel-control-prev-icon", "aria-hidden": "true" }),
                                React.createElement("span", { className: "sr-only" }, "Previous")),
                            React.createElement("a", { className: "carousel-control-next", href: "#carouselExampleControls", role: "button", "data-slide": "next" },
                                React.createElement("span", { className: "carousel-control-next-icon", "aria-hidden": "true" }),
                                React.createElement("span", { className: "sr-only" }, "Next")))))));
        }
    };
    return SectionIntro;
}(React.Component));
exports.SectionIntro = SectionIntro;
//# sourceMappingURL=SectionIntro.js.map
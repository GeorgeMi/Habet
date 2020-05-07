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
var SectionProducts = React.lazy(function () { return Promise.resolve().then(function () { return require("./SectionProducts"); }).then(function (m) { return ({ default: m.SectionProducts }); }); });
var SectionIntro_1 = require("./SectionIntro");
var Header_1 = require("./Header");
var Dictionary_1 = require("./Dictionary");
var Translate = require("react-translate-component");
var en_1 = require("./languages/en");
var it_1 = require("./languages/it");
var ro_1 = require("./languages/ro");
var counterpart = require('counterpart');
counterpart.registerTranslations('en', en_1.default);
counterpart.registerTranslations('ro', ro_1.default);
counterpart.registerTranslations('it', it_1.default);
var Home2 = /** @class */ (function (_super) {
    __extends(Home2, _super);
    function Home2(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { loadedComponentsDictionary: null };
        _this.setLoadedComponentsArray = _this.setLoadedComponentsArray.bind(_this);
        _this.reloadPage = _this.reloadPage.bind(_this);
        _this.minimizeDescription = _this.minimizeDescription.bind(_this);
        _this.maximizeDescription = _this.maximizeDescription.bind(_this);
        return _this;
    }
    Home2.prototype.setLoadedComponentsArray = function (component, loaded) {
        var dictionary = this.state.loadedComponentsDictionary;
        if (null == dictionary) {
            dictionary = new Dictionary_1.KeyedCollection();
        }
        dictionary.Add(component, loaded);
        this.setState({ loadedComponentsDictionary: dictionary });
    };
    Home2.prototype.reloadPage = function () {
        window.location.reload(false);
    };
    Home2.prototype.minimizeDescription = function () {
        document.getElementById('intro-short-description').className = "text-deal short-description";
        document.getElementById('intro-full-description').className = "text-deal hide-description";
    };
    Home2.prototype.maximizeDescription = function () {
        document.getElementById('intro-short-description').className = "text-deal short-description hide-description";
        document.getElementById('intro-full-description').className = "text-deal";
    };
    Home2.prototype.render = function () {
        var hideLoader = true;
        if (this.state.loadedComponentsDictionary != null && this.state.loadedComponentsDictionary.Count() == 1) {
            hideLoader = true;
        }
        return (React.createElement("main", { id: "main" },
            hideLoader ? React.createElement("div", null) : React.createElement("div", { className: "loading" }, "Loading\u2026"),
            React.createElement("div", null,
                React.createElement(Header_1.Header, { Active: 'Home', reloadPage: this.reloadPage }),
                React.createElement(SectionIntro_1.SectionIntro, null),
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-lg-6 col-md-10 product-item filter-app wow fadeInUp" },
                            React.createElement("div", { className: "product d-flex flex-column" },
                                React.createElement("a", { href: "/#/item/", className: "img-prod" },
                                    React.createElement("img", { className: "img-fluid", src: "images/home2_women_accesories.jpg", alt: "" }),
                                    React.createElement("div", { className: "overlay" })),
                                React.createElement("div", { className: "text py-3 pb-4 px-3" },
                                    React.createElement("p", { className: "bottom-area d-flex px-3" },
                                        React.createElement("a", { href: "javascript:void(0)", onClick: function () { return 1; }, className: "buy-now text-center py-2" },
                                            React.createElement(Translate, { content: "products.WomenAccessories" })))))),
                        React.createElement("div", { className: "col-lg-6 col-md-10 product-item filter-app wow fadeInUp" },
                            React.createElement("div", { className: "product d-flex flex-column" },
                                React.createElement("a", { href: "/#/item/", className: "img-prod" },
                                    React.createElement("img", { className: "img-fluid", src: "images/home2_women_bags.jpg", alt: "" }),
                                    React.createElement("div", { className: "overlay" })),
                                React.createElement("div", { className: "text py-3 pb-4 px-3" },
                                    React.createElement("p", { className: "bottom-area d-flex px-3" },
                                        React.createElement("a", { href: "javascript:void(0)", onClick: function () { return 1; }, className: "buy-now text-center py-2" },
                                            React.createElement(Translate, { content: "products.WomenBags" })))))),
                        React.createElement("div", { className: "col-lg-6 col-md-10 product-item filter-app wow fadeInUp" },
                            React.createElement("div", { className: "product d-flex flex-column" },
                                React.createElement("a", { href: "/#/item/", className: "img-prod" },
                                    React.createElement("img", { className: "img-fluid", src: "images/home2_men_bags.jpg", alt: "" }),
                                    React.createElement("div", { className: "overlay" })),
                                React.createElement("div", { className: "text py-3 pb-4 px-3" },
                                    React.createElement("p", { className: "bottom-area d-flex px-3" },
                                        React.createElement("a", { href: "javascript:void(0)", onClick: function () { return 1; }, className: "buy-now text-center py-2" },
                                            React.createElement(Translate, { content: "products.MenBags" })))))),
                        React.createElement("div", { className: "col-lg-6 col-md-10 product-item filter-app wow fadeInUp" },
                            React.createElement("div", { className: "product d-flex flex-column" },
                                React.createElement("a", { href: "/#/item/", className: "img-prod" },
                                    React.createElement("img", { className: "img-fluid", src: "images/home2_men_accesories.jpg", alt: "" }),
                                    React.createElement("div", { className: "overlay" })),
                                React.createElement("div", { className: "text py-3 pb-4 px-3" },
                                    React.createElement("p", { className: "bottom-area d-flex px-3" },
                                        React.createElement("a", { href: "javascript:void(0)", onClick: function () { return 1; }, className: "buy-now text-center py-2" },
                                            React.createElement(Translate, { content: "products.MenAccessories" })))))))),
                React.createElement("section", { className: "ftco-section-2 bg-light" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "offset-1 col-md-10" },
                                React.createElement("div", { className: "text-deal short-description", id: "intro-short-description", style: { opacity: 1, fontStyle: 'italic', textAlign: 'justify' } },
                                    React.createElement(Translate, { onClick: this.maximizeDescription, component: "h5", content: 'intro.MP1' })),
                                React.createElement("div", { className: "text-deal hide-description", id: "intro-full-description", style: { opacity: 1, fontStyle: 'italic', textAlign: 'justify' }, onClick: this.minimizeDescription },
                                    React.createElement(Translate, { component: "h5", content: 'intro.P1' }),
                                    React.createElement(Translate, { component: "h5", content: 'intro.P2' }),
                                    React.createElement(Translate, { component: "h5", content: 'intro.P3' })))))))));
    };
    return Home2;
}(React.Component));
exports.Home2 = Home2;
//# sourceMappingURL=PageHome2.js.map
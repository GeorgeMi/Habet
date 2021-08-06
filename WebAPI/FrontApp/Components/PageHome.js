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
var react_1 = require("react");
var SectionProducts = React.lazy(function () { return Promise.resolve().then(function () { return require("./SectionProducts"); }).then(function (m) { return ({ default: m.SectionProducts }); }); });
var Header_1 = require("./Header");
var Dictionary_1 = require("./Dictionary");
var en_1 = require("./languages/en");
var it_1 = require("./languages/it");
var ro_1 = require("./languages/ro");
var counterpart = require('counterpart');
counterpart.registerTranslations('en', en_1.default);
counterpart.registerTranslations('ro', ro_1.default);
counterpart.registerTranslations('it', it_1.default);
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { loadedComponentsDictionary: null };
        _this.setLoadedComponentsArray = _this.setLoadedComponentsArray.bind(_this);
        _this.reloadPage = _this.reloadPage.bind(_this);
        _this.minimizeDescription = _this.minimizeDescription.bind(_this);
        _this.maximizeDescription = _this.maximizeDescription.bind(_this);
        console.log(_this.props.match.params.section);
        return _this;
    }
    Home.prototype.setLoadedComponentsArray = function (component, loaded) {
        var dictionary = this.state.loadedComponentsDictionary;
        if (null == dictionary) {
            dictionary = new Dictionary_1.KeyedCollection();
        }
        dictionary.Add(component, loaded);
        this.setState({ loadedComponentsDictionary: dictionary });
    };
    Home.prototype.reloadPage = function () {
        window.location.reload(false);
    };
    Home.prototype.minimizeDescription = function () {
        document.getElementById('intro-short-description').className = "text-deal short-description";
        document.getElementById('intro-full-description').className = "text-deal hide-description";
    };
    Home.prototype.maximizeDescription = function () {
        document.getElementById('intro-short-description').className = "text-deal short-description hide-description";
        document.getElementById('intro-full-description').className = "text-deal";
    };
    Home.prototype.render = function () {
        var hideLoader = false;
        if (this.state.loadedComponentsDictionary != null && this.state.loadedComponentsDictionary.Count() == 4) {
            hideLoader = true;
            if (this.props.match.params.section != null) {
                var element = document.getElementById(this.props.match.params.section);
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        return (React.createElement("main", { id: "main" },
            hideLoader ? React.createElement("div", null) : React.createElement("div", { className: "loading" }, "Loading\u2026"),
            React.createElement("div", null,
                React.createElement(Header_1.Header, { Active: 'Home', reloadPage: this.reloadPage }),
                React.createElement("section", { className: "ftco-section ftco-deal", style: { backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" } },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { id: "carouselExampleSlidesOnly", className: "carousel slide", "data-ride": "carousel" },
                            React.createElement("div", { className: "carousel-inner" },
                                React.createElement("div", { className: "carousel-item active" },
                                    React.createElement("img", { className: "d-block w-100", src: "images/landing_page_1.jpeg" })),
                                React.createElement("div", { className: "carousel-item" },
                                    React.createElement("img", { className: "d-block w-100", src: "images/landing_page_2.jpeg" })),
                                React.createElement("div", { className: "carousel-item" },
                                    React.createElement("img", { className: "d-block w-100", src: " images/landing_page_3.jpeg" })),
                                React.createElement("div", { className: "carousel-item" },
                                    React.createElement("img", { className: "d-block w-100", src: " images/landing_page_4.jpeg" })))))),
                React.createElement("section", { className: "ftco-section bg-light" },
                    React.createElement(react_1.Suspense, { fallback: React.createElement("div", null, "Loading...") },
                        React.createElement("div", { id: "women" },
                            React.createElement("div", { id: "women-bags" },
                                React.createElement(SectionProducts, { Gender: 'Women', Type: 'Bags', reloadPage: this.reloadPage, setLoadedComponentsArray: this.setLoadedComponentsArray })),
                            React.createElement("div", { id: "women-accessories" },
                                React.createElement(SectionProducts, { Gender: 'Women', Type: 'Accessories', reloadPage: this.reloadPage, setLoadedComponentsArray: this.setLoadedComponentsArray }))),
                        React.createElement("div", { id: "men" },
                            React.createElement("div", { id: "men-bags" },
                                React.createElement(SectionProducts, { Gender: 'Men', Type: 'Bags', reloadPage: this.reloadPage, setLoadedComponentsArray: this.setLoadedComponentsArray })),
                            React.createElement("div", { id: "men-accessories" },
                                React.createElement(SectionProducts, { Gender: 'Men', Type: 'Accessories', reloadPage: this.reloadPage, setLoadedComponentsArray: this.setLoadedComponentsArray }))))))));
    };
    return Home;
}(React.Component));
exports.Home = Home;
//# sourceMappingURL=PageHome.js.map
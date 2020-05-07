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
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { loadedComponentsDictionary: null };
        _this.setLoadedComponentsArray = _this.setLoadedComponentsArray.bind(_this);
        _this.reloadPage = _this.reloadPage.bind(_this);
        _this.minimizeDescription = _this.minimizeDescription.bind(_this);
        _this.maximizeDescription = _this.maximizeDescription.bind(_this);
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
        if (this.state.loadedComponentsDictionary != null && this.state.loadedComponentsDictionary.Count() == 1) {
            hideLoader = true;
        }
        return (React.createElement("main", { id: "main" },
            hideLoader ? React.createElement("div", null) : React.createElement("div", { className: "loading" }, "Loading\u2026"),
            React.createElement("div", null,
                React.createElement(Header_1.Header, { Active: 'Home', reloadPage: this.reloadPage }),
                React.createElement(SectionIntro_1.SectionIntro, null),
                React.createElement("section", { className: "ftco-section-2 bg-light" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "offset-1 col-md-10" },
                                React.createElement("div", { className: "text-deal short-description", id: "intro-short-description", style: { opacity: 1, fontStyle: 'italic', textAlign: 'justify' } },
                                    React.createElement(Translate, { onClick: this.maximizeDescription, component: "h5", content: 'intro.MP1' })),
                                React.createElement("div", { className: "text-deal hide-description", id: "intro-full-description", style: { opacity: 1, fontStyle: 'italic', textAlign: 'justify' }, onClick: this.minimizeDescription },
                                    React.createElement(Translate, { component: "h5", content: 'intro.P1' }),
                                    React.createElement(Translate, { component: "h5", content: 'intro.P2' }),
                                    React.createElement(Translate, { component: "h5", content: 'intro.P3' })))))),
                React.createElement("section", { className: "ftco-section bg-light" },
                    React.createElement(react_1.Suspense, { fallback: React.createElement("div", null, "Loading...") },
                        React.createElement(SectionProducts, { Gender: 'Women', Type: 'Bags', reloadPage: this.reloadPage, setLoadedComponentsArray: this.setLoadedComponentsArray }),
                        React.createElement(SectionProducts, { Gender: 'Women', Type: 'Accessories', reloadPage: this.reloadPage }),
                        React.createElement(SectionProducts, { Gender: 'Men', Type: 'Bags', reloadPage: this.reloadPage }),
                        React.createElement(SectionProducts, { Gender: 'Men', Type: 'Accessories', reloadPage: this.reloadPage }))))));
    };
    return Home;
}(React.Component));
exports.Home = Home;
//# sourceMappingURL=PageHome.js.map
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
var SectionProducts_1 = require("./SectionProducts");
var SectionIntro_1 = require("./SectionIntro");
var Header_1 = require("./Header");
var Dictionary_1 = require("./Dictionary");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { loadedComponentsDictionary: null };
        _this.setLoadedComponentsArray = _this.setLoadedComponentsArray.bind(_this);
        _this.langaugeChanged = _this.langaugeChanged.bind(_this);
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
    Home.prototype.langaugeChanged = function () {
        window.location.reload(false);
    };
    Home.prototype.render = function () {
        var hideLoader = false;
        if (this.state.loadedComponentsDictionary != null && this.state.loadedComponentsDictionary.Count() == 4) {
            hideLoader = true;
        }
        return (React.createElement("main", { id: "main" },
            hideLoader ? React.createElement("div", null) : React.createElement("div", { className: "loading" }, "Loading\u2026"),
            React.createElement("div", null,
                React.createElement(Header_1.Header, { Active: 'Home', langaugeChanged: this.langaugeChanged }),
                React.createElement(SectionIntro_1.SectionIntro, null),
                React.createElement("section", { className: "ftco-section bg-light" },
                    React.createElement(SectionProducts_1.SectionProducts, { Gender: 'Women', Type: 'Bags', setLoadedComponentsArray: this.setLoadedComponentsArray }),
                    React.createElement(SectionProducts_1.SectionProducts, { Gender: 'Women', Type: 'Belts', setLoadedComponentsArray: this.setLoadedComponentsArray }),
                    React.createElement(SectionProducts_1.SectionProducts, { Gender: 'Men', Type: 'Bags', setLoadedComponentsArray: this.setLoadedComponentsArray }),
                    React.createElement(SectionProducts_1.SectionProducts, { Gender: 'Men', Type: 'Belts', setLoadedComponentsArray: this.setLoadedComponentsArray })))));
    };
    return Home;
}(React.Component));
exports.Home = Home;
//# sourceMappingURL=PageHome.js.map
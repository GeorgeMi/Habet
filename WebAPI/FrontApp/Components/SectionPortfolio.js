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
var React = require('react');
var config = require('config');
var API_Path = config.API_Path;
var SectionPortfolio = /** @class */ (function (_super) {
    __extends(SectionPortfolio, _super);
    function SectionPortfolio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SectionPortfolio.prototype.componentDidMount = function () {
        this.ItemList();
    };
    //ItemList() {
    //    $.getJSON(API_Path +'/Products')
    //        .then(({ results }) => this.setState({ item: results }));
    //}
    SectionPortfolio.prototype.render = function () {
        //console.log(API_Path + '/api/');
        //const persons = this.state.item.map((prod, i) => (
        //    <div>
        //        <h1>{prod.name.first}</h1>
        //        <span>{prod.price}, {prod.description}</span>
        //    </div>
        //));
        return (React.createElement("section", { id: "portfolio", class: "section-bg" },
            React.createElement("div", { class: "container" },
                React.createElement("header", { class: "section-header" },
                    React.createElement("h3", { class: "section-title" }, "Our Portfolio")),
                React.createElement("div", { class: "row" },
                    React.createElement("div", { class: "col-lg-12" },
                        React.createElement("ul", { id: "portfolio-flters" },
                            React.createElement("li", { "data-filter": "*", class: "filter-active" }, "All"),
                            React.createElement("li", { "data-filter": ".filter-app" }, "App"),
                            React.createElement("li", { "data-filter": ".filter-card" }, "Card"),
                            React.createElement("li", { "data-filter": ".filter-web" }, "Web")))),
                React.createElement("div", { class: "row portfolio-container" },
                    React.createElement("div", { class: "col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp" },
                        React.createElement("div", { class: "portfolio-wrap" },
                            React.createElement("figure", null,
                                React.createElement("img", { src: "img/portfolio/app1.jpg", class: "img-fluid", alt: "" }),
                                React.createElement("a", { href: "img/portfolio/app1.jpg", "data-lightbox": "portfolio", "data-title": "App 1", class: "link-preview", title: "Preview" },
                                    React.createElement("i", { class: "ion ion-eye" })),
                                React.createElement("a", { href: "#", class: "link-details", title: "More Details" },
                                    React.createElement("i", { class: "ion ion-android-open" }))),
                            React.createElement("div", { class: "portfolio-info" },
                                React.createElement("h4", null,
                                    React.createElement("a", { href: "#" }, "App 1")),
                                React.createElement("p", null, "App")))),
                    React.createElement("div", { class: "col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp", "data-wow-delay": "0.1s" },
                        React.createElement("div", { class: "portfolio-wrap" },
                            React.createElement("figure", null,
                                React.createElement("img", { src: "img/portfolio/web3.jpg", class: "img-fluid", alt: "" }),
                                React.createElement("a", { href: "img/portfolio/web3.jpg", class: "link-preview", "data-lightbox": "portfolio", "data-title": "Web 3", title: "Preview" },
                                    React.createElement("i", { class: "ion ion-eye" })),
                                React.createElement("a", { href: "#", class: "link-details", title: "More Details" },
                                    React.createElement("i", { class: "ion ion-android-open" }))),
                            React.createElement("div", { class: "portfolio-info" },
                                React.createElement("h4", null,
                                    React.createElement("a", { href: "#" }, "Web 3")),
                                React.createElement("p", null, "Web")))),
                    React.createElement("div", { class: "col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp", "data-wow-delay": "0.2s" },
                        React.createElement("div", { class: "portfolio-wrap" },
                            React.createElement("figure", null,
                                React.createElement("img", { src: "img/portfolio/app2.jpg", class: "img-fluid", alt: "" }),
                                React.createElement("a", { href: "img/portfolio/app2.jpg", class: "link-preview", "data-lightbox": "portfolio", "data-title": "App 2", title: "Preview" },
                                    React.createElement("i", { class: "ion ion-eye" })),
                                React.createElement("a", { href: "#", class: "link-details", title: "More Details" },
                                    React.createElement("i", { class: "ion ion-android-open" }))),
                            React.createElement("div", { class: "portfolio-info" },
                                React.createElement("h4", null,
                                    React.createElement("a", { href: "#" }, "App 2")),
                                React.createElement("p", null, "App")))),
                    React.createElement("div", { class: "col-lg-4 col-md-6 portfolio-item filter-card wow fadeInUp" },
                        React.createElement("div", { class: "portfolio-wrap" },
                            React.createElement("figure", null,
                                React.createElement("img", { src: "img/portfolio/card2.jpg", class: "img-fluid", alt: "" }),
                                React.createElement("a", { href: "img/portfolio/card2.jpg", class: "link-preview", "data-lightbox": "portfolio", "data-title": "Card 2", title: "Preview" },
                                    React.createElement("i", { class: "ion ion-eye" })),
                                React.createElement("a", { href: "#", class: "link-details", title: "More Details" },
                                    React.createElement("i", { class: "ion ion-android-open" }))),
                            React.createElement("div", { class: "portfolio-info" },
                                React.createElement("h4", null,
                                    React.createElement("a", { href: "#" }, "Card 2")),
                                React.createElement("p", null, "Card")))),
                    React.createElement("div", { class: "col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp", "data-wow-delay": "0.1s" },
                        React.createElement("div", { class: "portfolio-wrap" },
                            React.createElement("figure", null,
                                React.createElement("img", { src: "img/portfolio/web2.jpg", class: "img-fluid", alt: "" }),
                                React.createElement("a", { href: "img/portfolio/web2.jpg", class: "link-preview", "data-lightbox": "portfolio", "data-title": "Web 2", title: "Preview" },
                                    React.createElement("i", { class: "ion ion-eye" })),
                                React.createElement("a", { href: "#", class: "link-details", title: "More Details" },
                                    React.createElement("i", { class: "ion ion-android-open" }))),
                            React.createElement("div", { class: "portfolio-info" },
                                React.createElement("h4", null,
                                    React.createElement("a", { href: "#" }, "Web 2")),
                                React.createElement("p", null, "Web")))),
                    React.createElement("div", { class: "col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp", "data-wow-delay": "0.2s" },
                        React.createElement("div", { class: "portfolio-wrap" },
                            React.createElement("figure", null,
                                React.createElement("img", { src: "img/portfolio/app3.jpg", class: "img-fluid", alt: "" }),
                                React.createElement("a", { href: "img/portfolio/app3.jpg", class: "link-preview", "data-lightbox": "portfolio", "data-title": "App 3", title: "Preview" },
                                    React.createElement("i", { class: "ion ion-eye" })),
                                React.createElement("a", { href: "#", class: "link-details", title: "More Details" },
                                    React.createElement("i", { class: "ion ion-android-open" }))),
                            React.createElement("div", { class: "portfolio-info" },
                                React.createElement("h4", null,
                                    React.createElement("a", { href: "#" }, "App 3")),
                                React.createElement("p", null, "App")))),
                    React.createElement("div", { class: "col-lg-4 col-md-6 portfolio-item filter-card wow fadeInUp" },
                        React.createElement("div", { class: "portfolio-wrap" },
                            React.createElement("figure", null,
                                React.createElement("img", { src: "img/portfolio/card1.jpg", class: "img-fluid", alt: "" }),
                                React.createElement("a", { href: "img/portfolio/card1.jpg", class: "link-preview", "data-lightbox": "portfolio", "data-title": "Card 1", title: "Preview" },
                                    React.createElement("i", { class: "ion ion-eye" })),
                                React.createElement("a", { href: "#", class: "link-details", title: "More Details" },
                                    React.createElement("i", { class: "ion ion-android-open" }))),
                            React.createElement("div", { class: "portfolio-info" },
                                React.createElement("h4", null,
                                    React.createElement("a", { href: "#" }, "Card 1")),
                                React.createElement("p", null, "Card")))),
                    React.createElement("div", { class: "col-lg-4 col-md-6 portfolio-item filter-card wow fadeInUp", "data-wow-delay": "0.1s" },
                        React.createElement("div", { class: "portfolio-wrap" },
                            React.createElement("figure", null,
                                React.createElement("img", { src: "img/portfolio/card3.jpg", class: "img-fluid", alt: "" }),
                                React.createElement("a", { href: "img/portfolio/card3.jpg", class: "link-preview", "data-lightbox": "portfolio", "data-title": "Card 3", title: "Preview" },
                                    React.createElement("i", { class: "ion ion-eye" })),
                                React.createElement("a", { href: "#", class: "link-details", title: "More Details" },
                                    React.createElement("i", { class: "ion ion-android-open" }))),
                            React.createElement("div", { class: "portfolio-info" },
                                React.createElement("h4", null,
                                    React.createElement("a", { href: "#" }, "Card 3")),
                                React.createElement("p", null, "Card")))),
                    React.createElement("div", { class: "col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp", "data-wow-delay": "0.2s" },
                        React.createElement("div", { class: "portfolio-wrap" },
                            React.createElement("figure", null,
                                React.createElement("img", { src: "img/portfolio/web1.jpg", class: "img-fluid", alt: "" }),
                                React.createElement("a", { href: "img/portfolio/web1.jpg", class: "link-preview", "data-lightbox": "portfolio", "data-title": "Web 1", title: "Preview" },
                                    React.createElement("i", { class: "ion ion-eye" })),
                                React.createElement("a", { href: "#", class: "link-details", title: "More Details" },
                                    React.createElement("i", { class: "ion ion-android-open" }))),
                            React.createElement("div", { class: "portfolio-info" },
                                React.createElement("h4", null,
                                    React.createElement("a", { href: "#" }, "Web 1")),
                                React.createElement("p", null, "Web"))))))));
    };
    return SectionPortfolio;
}(React.Component));
exports.SectionPortfolio = SectionPortfolio;
//# sourceMappingURL=SectionPortfolio.js.map
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
var axios = require('axios');
var SectionPortfolio = /** @class */ (function (_super) {
    __extends(SectionPortfolio, _super);
    function SectionPortfolio(props) {
        return _super.call(this, props) || this;
    }
    SectionPortfolio.prototype.componentDidMount = function () {
        var _this = this;
        var self = this;
        axios.get(API_Path + '/Products', {
            params: {
                ID: 1
            }
        })
            .then(function (response) {
            console.log(response);
            _this.setState({ isLoaded: true, items: response });
        })
            .catch(function (error) {
            console.log(error);
            _this.setState({ isLoaded: true, error: error });
        })
            .then();
        console.log(self.state.items);
    };
    SectionPortfolio.prototype.render = function () {
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, items = _a.items;
        if (error) {
            return React.createElement("div", null,
                "Error: ",
                error.message);
        }
        else if (!isLoaded) {
            return React.createElement("div", null, "Loading...");
        }
        else {
            return (React.createElement("ul", null, items.map(function (item) { return (React.createElement("li", { key: item.name.first },
                item.name,
                " ",
                item.description)); })));
        }
        //    const responseList = this.state.data.map((item, i) => (
        //        <div>
        //            <h1>{item.name.first}</h1>
        //            <span>{item.price}, {item.description}</span>
        //        </div>
        //    ));
        // return (
        //        <section id="portfolio" className="section-bg">
        //            <div className="container">
        //                <header className="section-header">
        //                    <h3 className="section-title">Our Portfolio</h3>
        //                </header>
        //                <div className="row">
        //                    <div className="col-lg-12">
        //                        <ul id="portfolio-flters">
        //                            <li data-filter="*" className="filter-active">All</li>
        //                            <li data-filter=".filter-app">App</li>
        //                            <li data-filter=".filter-card">Card</li>
        //                            <li data-filter=".filter-web">Web</li>
        //                        </ul>
        //                    </div>
        //                </div>
        //                <div className="row portfolio-container">
        //                    <div className="col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp">
        //                        <div className="portfolio-wrap">
        //                            <figure>
        //                                <img src="img/portfolio/app1.jpg" className="img-fluid" alt="" />
        //                                <a href="img/portfolio/app1.jpg" data-lightbox="portfolio" data-title="App 1" className="link-preview" title="Preview"><i className="ion ion-eye"></i></a>
        //                                <a href="#" className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>
        //                            </figure>
        //                            <div className="portfolio-info">
        //                                <h4><a href="#">App 1</a></h4>
        //                                <p>App</p>
        //                            </div>
        //                        </div>
        //                    </div>
        //                    <div className="col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp" data-wow-delay="0.1s">
        //                        <div className="portfolio-wrap">
        //                            <figure>
        //                                <img src="img/portfolio/web3.jpg" className="img-fluid" alt="" />
        //                                <a href="img/portfolio/web3.jpg" className="link-preview" data-lightbox="portfolio" data-title="Web 3" title="Preview"><i className="ion ion-eye"></i></a>
        //                                <a href="#" className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>
        //                            </figure>
        //                            <div className="portfolio-info">
        //                                <h4><a href="#">Web 3</a></h4>
        //                                <p>Web</p>
        //                            </div>
        //                        </div>
        //                    </div>
        //                    <div className="col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp" data-wow-delay="0.2s">
        //                        <div className="portfolio-wrap">
        //                            <figure>
        //                                <img src="img/portfolio/app2.jpg" className="img-fluid" alt="" />
        //                                <a href="img/portfolio/app2.jpg" className="link-preview" data-lightbox="portfolio" data-title="App 2" title="Preview"><i className="ion ion-eye"></i></a>
        //                                <a href="#" className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>
        //                            </figure>
        //                            <div className="portfolio-info">
        //                                <h4><a href="#">App 2</a></h4>
        //                                <p>App</p>
        //                            </div>
        //                        </div>
        //                    </div>
        //                    <div className="col-lg-4 col-md-6 portfolio-item filter-card wow fadeInUp">
        //                        <div className="portfolio-wrap">
        //                            <figure>
        //                                <img src="img/portfolio/card2.jpg" className="img-fluid" alt="" />
        //                                <a href="img/portfolio/card2.jpg" className="link-preview" data-lightbox="portfolio" data-title="Card 2" title="Preview"><i className="ion ion-eye"></i></a>
        //                                <a href="#" className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>
        //                            </figure>
        //                            <div className="portfolio-info">
        //                                <h4><a href="#">Card 2</a></h4>
        //                                <p>Card</p>
        //                            </div>
        //                        </div>
        //                    </div>
        //                    <div className="col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp" data-wow-delay="0.1s">
        //                        <div className="portfolio-wrap">
        //                            <figure>
        //                                <img src="img/portfolio/web2.jpg" className="img-fluid" alt="" />
        //                                <a href="img/portfolio/web2.jpg" className="link-preview" data-lightbox="portfolio" data-title="Web 2" title="Preview"><i className="ion ion-eye"></i></a>
        //                                <a href="#" className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>
        //                            </figure>
        //                            <div className="portfolio-info">
        //                                <h4><a href="#">Web 2</a></h4>
        //                                <p>Web</p>
        //                            </div>
        //                        </div>
        //                    </div>
        //                    <div className="col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp" data-wow-delay="0.2s">
        //                        <div className="portfolio-wrap">
        //                            <figure>
        //                                <img src="img/portfolio/app3.jpg" className="img-fluid" alt="" />
        //                                <a href="img/portfolio/app3.jpg" className="link-preview" data-lightbox="portfolio" data-title="App 3" title="Preview"><i className="ion ion-eye"></i></a>
        //                                <a href="#" className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>
        //                            </figure>
        //                            <div className="portfolio-info">
        //                                <h4><a href="#">App 3</a></h4>
        //                                <p>App</p>
        //                            </div>
        //                        </div>
        //                    </div>
        //                    <div className="col-lg-4 col-md-6 portfolio-item filter-card wow fadeInUp">
        //                        <div className="portfolio-wrap">
        //                            <figure>
        //                                <img src="img/portfolio/card1.jpg" className="img-fluid" alt="" />
        //                                <a href="img/portfolio/card1.jpg" className="link-preview" data-lightbox="portfolio" data-title="Card 1" title="Preview"><i className="ion ion-eye"></i></a>
        //                                <a href="#" className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>
        //                            </figure>
        //                            <div className="portfolio-info">
        //                                <h4><a href="#">Card 1</a></h4>
        //                                <p>Card</p>
        //                            </div>
        //                        </div>
        //                    </div>
        //                    <div className="col-lg-4 col-md-6 portfolio-item filter-card wow fadeInUp" data-wow-delay="0.1s">
        //                        <div className="portfolio-wrap">
        //                            <figure>
        //                                <img src="img/portfolio/card3.jpg" className="img-fluid" alt="" />
        //                                <a href="img/portfolio/card3.jpg" className="link-preview" data-lightbox="portfolio" data-title="Card 3" title="Preview"><i className="ion ion-eye"></i></a>
        //                                <a href="#" className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>
        //                            </figure>
        //                            <div className="portfolio-info">
        //                                <h4><a href="#">Card 3</a></h4>
        //                                <p>Card</p>
        //                            </div>
        //                        </div>
        //                    </div>
        //                    <div className="col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp" data-wow-delay="0.2s">
        //                        <div className="portfolio-wrap">
        //                            <figure>
        //                                <img src="img/portfolio/web1.jpg" className="img-fluid" alt="" />
        //                                <a href="img/portfolio/web1.jpg" className="link-preview" data-lightbox="portfolio" data-title="Web 1" title="Preview"><i className="ion ion-eye"></i></a>
        //                                <a href="#" className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>
        //                            </figure>
        //                            <div className="portfolio-info">
        //                                <h4><a href="#">Web 1</a></h4>
        //                                <p>Web</p>
        //                            </div>
        //                        </div>
        //                    </div>
        //                </div>
        //            </div>
        //        </section>
        //    );
    };
    return SectionPortfolio;
}(React.Component));
exports.SectionPortfolio = SectionPortfolio;
//# sourceMappingURL=SectionPortfolio.js.map
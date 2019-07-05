declare var require: any

var React = require('react');
var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');

export class SectionPortfolio extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            id: this.props.id
        };
    }

    componentDidMount() {
        var self = this;

        axios.get(API_Path + '/Products', {
            params: {
                ID: 1
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ isLoaded: true, items: response });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ isLoaded: true, error });
            })
            .then();

        console.log(self.state.items);
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.name.first}>
                            {item.name} {item.description}
                        </li>
                    ))}
                </ul>
            );
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
    }
}
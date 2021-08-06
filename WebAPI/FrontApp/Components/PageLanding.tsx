import * as React from 'react';
import { Suspense } from 'react';
const SectionProducts = React.lazy(() => import("./SectionProducts").then(m => ({ default: m.SectionProducts })));
import { Player, ControlBar } from 'video-react';
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import * as Translate from 'react-translate-component';
import { HashLink  as Link } from 'react-router-hash-link';
import en from './languages/en';
import it from './languages/it';
import ro from './languages/ro';

var counterpart = require('counterpart');

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('ro', ro);
counterpart.registerTranslations('it', it);

export class Landing extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            loadedComponentsDictionary: null,
            source: 'video/video.mp4',
        };
        

        this.setLoadedComponentsArray = this.setLoadedComponentsArray.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
        this.minimizeDescription = this.minimizeDescription.bind(this);
        this.maximizeDescription = this.maximizeDescription.bind(this);
    }

   public setLoadedComponentsArray(component: string, loaded: string) {

        var dictionary = this.state.loadedComponentsDictionary;
        if (null == dictionary) {
            dictionary = new KeyedCollection<string>();
        }
        dictionary.Add(component, loaded);
        this.setState({loadedComponentsDictionary: dictionary});
    }

    public reloadPage() {
        window.location.reload(false);
    }

    minimizeDescription() {
        document.getElementById('intro-short-description').className = "text-deal short-description";
        document.getElementById('intro-full-description').className = "text-deal hide-description";
    }

    maximizeDescription() {
        document.getElementById('intro-short-description').className = "text-deal short-description hide-description";
        document.getElementById('intro-full-description').className = "text-deal";
    }
   
    render() {
        var hideLoader = true;

        return (
            <main id="main">
                {hideLoader ? <div></div> : <div className="loading">Loading&#8230;</div>}

                <div>
                    <Header Active={'Home'} reloadPage={this.reloadPage} />

                    <section className="ftco-section ftco-deal" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" }}>
                        <div className="container">
                            <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img className="d-block w-100" src="images/landing_page_1.jpeg" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block w-100" src="images/landing_page_2.jpeg" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block w-100" src=" images/landing_page_3.jpeg" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block w-100" src=" images/landing_page_4.jpeg" />
                                    </div>
                                </div>
                            </div>
                        </div >
                    </section >

                    <div className="container">
                      
                        <div className="row">        
                            
                            <div className="col-lg-6 col-md-10 product-item filter-app wow fadeInUp">
                                <Link to="/home/women-accessories">
                                    <div className="product d-flex flex-column">
                                        <div  className="img-prod"><img className="img-fluid" src="images/home2_women_accesories_2.jpg" alt="" />
                                            <div className="overlay"></div>
                                        </div>
                                        <div className="text py-3 pb-4 px-3">  
                                            <p className="bottom-area d-flex px-3">
                                                <a href="javascript:void(0)" onClick={() => 1} className="buy-now text-center py-2"><Translate content="products.WomenAccessories" /></a>
                                            </p>
                                        </div>
                                    </div>

                                </Link>
                            </div>

                            <div className="col-lg-6 col-md-10 product-item filter-app wow fadeInUp">

                                <Link to="/home/women-bags">
                                    <div className="product d-flex flex-column">
                                        <div className="img-prod"><img className="img-fluid" src="images/home2_women_bags.jpg" alt="" />
                                            <div className="overlay"></div>
                                        </div>
                                        <div className="text py-3 pb-4 px-3">
                                            <p className="bottom-area d-flex px-3">
                                                <a href="javascript:void(0)" onClick={() => 1} className="buy-now text-center py-2"><Translate content="products.WomenBags" /></a>
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                            </div>

                            <div className="col-lg-6 col-md-10 product-item filter-app wow fadeInUp">

                                <Link to="/home/men-bags">
                                    <div className="product d-flex flex-column">
                                        <div className="img-prod"><img className="img-fluid" src="images/home2_men_bags.jpg" alt="" />
                                            <div className="overlay"></div>
                                        </div>
                                        <div className="text py-3 pb-4 px-3">
                                            <p className="bottom-area d-flex px-3">
                                                <a href="javascript:void(0)" onClick={() => 1} className="buy-now text-center py-2"><Translate content="products.MenBags" /></a>
                                            </p>
                                        </div>
                                        </div>
                                </Link>

                            </div>

                            <div className="col-lg-6 col-md-10 product-item filter-app wow fadeInUp">

                                <Link to="/home/men-accessories">
                                <div className="product d-flex flex-column">
                                    <div className="img-prod"><img className="img-fluid" src="images/home2_men_accesories.jpg" alt="" />
                                        <div className="overlay"></div>
                                    </div>
                                    <div className="text py-3 pb-4 px-3">
                                        <p className="bottom-area d-flex px-3">
                                            <a href="javascript:void(0)" onClick={() => 1} className="buy-now text-center py-2"><Translate content="products.MenAccessories" /></a>
                                        </p>
                                    </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-lg-12 col-md-20">
                                <Player
                                    src={this.state.source}
                                    fluid={true}
                                    muted={true}
                                    autoPlay={true}
                                >
                                    <ControlBar autoHide={false} disableDefaultControls={true} />
                                </Player>
                            </div>

                        </div>
                    </div>

                    <section className="ftco-section-2 bg-light">
                        <div className="container">
                            <div className="row">
                                <div className="offset-1 col-md-10">
                                    <div className="text-deal short-description" id="intro-short-description" style={{ opacity: 1, fontStyle: 'italic', textAlign: 'justify' }}>
                                        <Translate onClick={this.maximizeDescription} component="h5" content='intro.MP1' />
                                    </div>
                                    <div className="text-deal hide-description" id="intro-full-description" style={{ opacity: 1, fontStyle: 'italic', textAlign: 'justify' }} onClick={this.minimizeDescription}>
                                        <Translate component="h5" content='intro.P1' />
                                        <Translate component="h5" content='intro.P2' />
                                        <Translate component="h5" content='intro.P3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>);
    }
}
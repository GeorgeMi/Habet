import * as React from 'react';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import * as Translate from 'react-translate-component';
import en from './languages/en';
import it from './languages/it';
import ro from './languages/ro';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');
var counterpart = require('counterpart');

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('ro', ro);
counterpart.registerTranslations('it', it);

export class SectionIntro extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = { isLoaded: false, items: null, error: null, language: read_cookie('lang'), currency: read_cookie('currency') };
        this.setActiveClassName = this.setActiveClassName.bind(this);
    }

    componentWillMount() {
        axios.get(API_Path + '/Products',
            {
                params: {
                    top: 5,
                    from: 0,
                    gender: "none",
                    type: "intro",
                    lang: this.state.language,
                    currency: this.state.currency
                }
            })
            .then((response) => {
                this.setState({ isLoaded: true, items: response.data.data });
            })
            .catch((error) => {
                this.setState({ isLoaded: true, error });
            })
            .then();
    }

    setActiveClassName(id: number) {
        if (id == 0) {
            return "active";
        }
        else return ""
    }

    render() {
        const { error, isLoaded, items, currency } = this.state;
        var currencyBeforeSign = '€';
        var currencyAfterSign = '';
        if (currency == 'RON') { currencyBeforeSign = ''; currencyAfterSign = 'RON' }
        else if (currency == 'GBP') { currencyBeforeSign = '₤'; currencyAfterSign = '' }

        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;

        } else if (!isLoaded) {
            return <div></div>;

        } else {
            return (
                <section className="ftco-section ftco-deal" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .5)), url('images/background.jpg')"}}>                
                    <div className="container">
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                {
                                    items.map((item, i) => (
                                        <div key={i} className={this.setActiveClassName(i) + " carousel-item"}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <img src={item.Image} className="img-fluid" alt="" />
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="text-deal">
                                                        <h2><a href="#">{item.Name}</a></h2>
                                                        <p className="price"><span>{currencyBeforeSign + " " + item.Price + " " + currencyAfterSign}</span></p>
                                                        <p><a href={"/#/item/" + item.ProductId} className="btn btn-primary py-3 px-5">Details</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div >
                    </div >
                </section >
            );
        }
    }
}
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
                if (null != this.props.setLoadedComponentsArray) {
                    this.props.setLoadedComponentsArray("Intro", "true");
                }
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
            );
        }
    }
}
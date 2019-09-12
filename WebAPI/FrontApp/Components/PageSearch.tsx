import * as React from 'react';
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Pagination from 'react-js-pagination';
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

export class Search extends React.Component<any, any>
{
    constructor(props) {
        super(props);

        counterpart.setLocale(read_cookie('lang'));
        this.state = {
            gender: "Women",
            type: "Bags",
            priceInterval: "3",
            items: null,
            isLoaded: false,
            error: null,
            waitingResponse: false,
            isChanged: false,
            language: read_cookie('lang'),
            activePage: 1,
            totalItemsCount: 50,
            itemsPerPage: 1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.langaugeChanged = this.langaugeChanged.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.searchProducts = this.searchProducts.bind(this);
    }

    componentWillMount() {
        axios.get(API_Path + '/Products',
            {
                params: {
                    top: this.state.itemsPerPage,
                    from: 0,
                    gender: "none",
                    type: "intro",
                    lang: this.state.language
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

    readCartFromCookie(cookie) {
        var cartProducts = new KeyedCollection<number>();
        for (var prop in cookie.items) {
            cartProducts.Add(parseInt(prop, 10), cookie.items[prop]);
        }

        return cartProducts;
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
        this.searchProducts(pageNumber);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ isChanged: true });
    }

    searchProducts(activePage) {
        var priceFrom = 0;
        var priceTo = 10000;

        if (this.state.waitingResponse == false) {
            this.setState({ waitingResponse: true });
        }

        if (this.state.priceInterval == "1") { priceTo = 49; }
        else if (this.state.priceInterval == "2") { priceFrom = 50; priceTo = 99; }
        else if (this.state.priceInterval == "3") { priceFrom = 100; priceTo = 199; }
        else if (this.state.priceInterval == "4") { priceFrom = 200; priceTo = 499; }
        else if (this.state.priceInterval == "5") { priceFrom = 500; }

        axios.post(API_Path + '/SearchProducts',
            {
                top: this.state.itemsPerPage,
                from: (activePage - 1) * this.state.itemsPerPage + 1,
                gender: this.state.gender,
                type: this.state.type,
                priceFrom: priceFrom,
                priceTo: priceTo,
                lang: this.state.language
            })
            .then((response) => {
                this.setState({ isLoaded: true, items: response.data.Products, totalItemsCount: response.data.TotalItemsCount });
            }).catch((error) => {
                NotificationManager.error("Request failed. Please, try again later.");
            })
            .then(() => {
                this.setState({ waitingResponse: false });
            }
            );
    }


    handleSubmit(event) {
        event.preventDefault();
       
        this.searchProducts(1);
    }

    addProductToCart(productId: number, no: number) {
        var cookie = read_cookie('cartProducts');
        if (cookie.length == 0) {
            var cartProducts = new KeyedCollection<number>();
        }
        else {
            var cartProducts = this.readCartFromCookie(cookie);
            if (cartProducts.ContainsKey(productId)) {
                no = no + cartProducts.Item(productId);
                cartProducts.Remove(productId);
            }
        }

        cartProducts.Add(productId, no);
        delete_cookie('cartProducts');
        bake_cookie('cartProducts', cartProducts);
    } 

    public langaugeChanged() {
        window.location.reload(false);
    }

    render() {
        const { error, isLoaded, items } = this.state;

        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="loading">Loading&#8230;</div>;
        } else {
            return (
                <main id="main">
                    <div>
                        <Header Active={'Search'} langaugeChanged={this.langaugeChanged} />

                        <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                            <div className="row justify-content-center mb-3 pb-3">
                                <div className="col-md-12 heading-section text-center">
                                    <h1 className="mb-4"><Translate content={'search.SearchProducts'} /></h1>
                                </div>
                            </div>
                        </div>

                        <section className="ftco-section bg-light">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 col-lg-10 order-md-last">
                                        <div className="row">
                                            {
                                                items.map((item, i) => (

                                                    <div key={i} className="col-lg-4 col-md-6 product-item filter-app wow fadeInUp">
                                                        <div className="product d-flex flex-column">
                                                            <a href={"/#/item/" + item.ProductId} className="img-prod"><img className="img-fluid" src={item.Image} alt="" />
                                                                <div className="overlay"></div>
                                                            </a>
                                                            <div className="text py-3 pb-4 px-3">
                                                                <h3><a href={"/#/item/" + item.ProductId}>{item.Name}</a></h3>
                                                                <div className="pricing">
                                                                    <p className="price"><span>${item.Price}</span></p>
                                                                </div>
                                                                <p className="bottom-area d-flex px-3">
                                                                    <a href="#" className="add-to-cart text-center py-2 mr-1" onClick={() => this.addProductToCart(item.ProductId, 1)}><span><Translate content={'search.AddToCart'} /> <i className="ion-ios-add ml-1"></i></span></a>
                                                                    <a href="#" className="buy-now text-center py-2"><Translate content={'search.BuyNow'} /><span><i className="ion-ios-cart ml-1"></i></span></a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>

                                        <div className="offset-3 col-md-6">
                                            <div className="row mt-5">
                                                <div className="col text-center">
                                                    <div className="block-27">
                                                        <Pagination
                                                            hideDisabled
                                                            activePage={this.state.activePage}
                                                            itemsCountPerPage={this.state.itemsPerPage}
                                                            totalItemsCount={this.state.totalItemsCount}
                                                            pageRangeDisplayed={5}
                                                            onChange={this.handlePageChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4 col-lg-2">
                                        <div className="sidebar">
                                            <div className="sidebar-box-2">
                                                <h2 className="heading"><Translate content={'search.Categories'} /></h2>
                                                <div className="fancy-collapse-panel">
                                                    <form action="" className="billing-form" onSubmit={this.handleSubmit}>
                                                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                                            <div className="panel panel-default">
                                                                <div className="panel-heading" role="tab" id="headingOne">
                                                                    <h4 className="panel-title">
                                                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><Translate content={'search.Gender'} />
                                                                        </a>
                                                                    </h4>
                                                                </div>
                                                                <div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="panel-body">
                                                                        <ul>
                                                                            <li>
                                                                                <input type="radio" className="form-check-input" name="gender" value="Men"
                                                                                    checked={this.state.gender === "Men"} onChange={this.handleChange} id="gender-men" />
                                                                                <label className="form-check-label" htmlFor="gender-men"><Translate content={'search.Men'} /></label>
                                                                            </li>
                                                                            <li>
                                                                                <input type="radio" className="form-check-input" name="gender" value="Women"
                                                                                    checked={this.state.gender === "Women"} onChange={this.handleChange} id="gender-women" />
                                                                                <label className="form-check-label" htmlFor="gender-women"><Translate content={'search.Women'} /></label>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="panel panel-default">
                                                                <div className="panel-heading" role="tab" id="headingTwo">
                                                                    <h4 className="panel-title">
                                                                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><Translate content={'search.Products'} /></a>
                                                                    </h4>
                                                                </div>
                                                                <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                                                    <div className="panel-body">
                                                                        <ul>
                                                                            <li>
                                                                                <input type="radio" className="form-check-input" name="type" value="Bags"
                                                                                    checked={this.state.type === "Bags"} id="type-bags" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="type-bags"><Translate content={'search.Bags'} /></label>
                                                                            </li>
                                                                            <li>
                                                                                <input type="radio" className="form-check-input" name="type" value="Belts"
                                                                                    checked={this.state.type === "Belts"} id="type-belts" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="type-belts"><Translate content={'search.Belts'} /></label>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="panel panel-default">
                                                                <div className="panel-heading" role="tab" id="headingThree">
                                                                    <h4 className="panel-title">
                                                                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="headingThree"><Translate content={'search.PriceRange'} /></a>
                                                                    </h4>
                                                                </div>

                                                                <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                                                    <div className="panel-body">
                                                                        <ul>
                                                                            <li>
                                                                                <input type="radio" className="form-check-input" name="priceInterval" value="1"
                                                                                    checked={this.state.priceInterval === "1"} id="range1" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="range1">Under $50</label>
                                                                            </li>
                                                                            <li>
                                                                                <input type="radio" className="form-check-input" name="priceInterval" value="2"
                                                                                    checked={this.state.priceInterval === "2"} id="range2" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="range2"> $50 to $100</label>
                                                                            </li>
                                                                            <li>
                                                                                <input type="radio" className="form-check-input" name="priceInterval" value="3"
                                                                                    checked={this.state.priceInterval === "3"} id="range3" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="range3">$100 to $200</label>
                                                                            </li>
                                                                            <li>
                                                                                <input type="radio" className="form-check-input" name="priceInterval" value="4"
                                                                                    checked={this.state.priceInterval === "4"} id="range4" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="range4">$200 to $500</label>
                                                                            </li>
                                                                            <li>
                                                                                <input type="radio" className="form-check-input" name="priceInterval" value="5"
                                                                                    checked={this.state.priceInterval === "5"} id="range5" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="range5">$500 & Above</label>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <Translate component="input" attributes={{ value: 'search.Filter', }} type="submit" className="btn btn-primary py-3 px-5" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            );
        }

    }
}
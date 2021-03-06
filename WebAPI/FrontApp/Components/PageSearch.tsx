﻿import * as React from 'react';
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { NotificationManager } from 'react-notifications';
import SearchInput, { createFilter } from 'react-search-input'
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

const KEYS_TO_FILTERS = ['Name', 'Price', 'ProductId'];

export class Search extends React.Component<any, any>
{
    constructor(props) {
        super(props);

        counterpart.setLocale(read_cookie('lang'));
        this.state = {
            gender: "Women",
            type: "Bags",
            priceInterval: "0",
            items: null,
            isLoaded: false,
            error: null,
            waitingResponse: false,
            isChanged: false,
            language: read_cookie('lang'),
            activePage: 1,
            totalItemsCount: 0,
            itemsPerPage: 100,
            currency: read_cookie('currency'),
            searchTerm: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.searchProducts = this.searchProducts.bind(this);     
        this.addProductToCart = this.addProductToCart.bind(this);
        this.buyProduct = this.buyProduct.bind(this); 
        this.searchUpdated = this.searchUpdated.bind(this); 
    }

    componentWillMount() {
        axios.post(API_Path + '/SearchProducts',
            {
                top: this.state.itemsPerPage,
                from: 0,
                gender: this.state.gender,
                type: this.state.type,
                priceFrom: 0,
                priceTo: 5000,
                lang: this.state.language,
                currency: this.state.currency
            })
            .then((response) => {
                console.log(response);
                this.setState({ isLoaded: true, items: response.data.Products, totalItemsCount: response.data.TotalItemsCount });

            }).catch((error) => {
                NotificationManager.error("Request failed. Please, try again later.");
            })
            .then(() => {
                this.setState({ waitingResponse: false });
            }
            );
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

        if (this.state.priceInterval == "0") { priceTo = 5000; }
        else if (this.state.priceInterval == "1") { priceTo = 49; }
        else if (this.state.priceInterval == "2") { priceFrom = 50; priceTo = 99; }
        else if (this.state.priceInterval == "3") { priceFrom = 100; priceTo = 199; }
        else if (this.state.priceInterval == "4") { priceFrom = 200; priceTo = 499; }
        else if (this.state.priceInterval == "5") { priceFrom = 500; }

        axios.post(API_Path + '/SearchProducts',
            {
                top: this.state.itemsPerPage,
                from: (activePage - 1) * this.state.itemsPerPage,
                gender: this.state.gender,
                type: this.state.type,
                priceFrom: priceFrom,
                priceTo: priceTo,
                lang: this.state.language,
                currency: this.state.currency
            })
            .then((response) => {
                console.log(response);
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
        if (read_cookie('token') == null || read_cookie('token').length == 0) {
            NotificationManager.info("Please login in order to add products to cart.");
        }
        else {

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

            this.setState({ state: this.state });
        }
    }

    buyProduct(productId: number) {
        if (read_cookie('token') == null || read_cookie('token').length == 0) {
            NotificationManager.info("Please login in order to add products to cart.");
        }
        else {
            this.addProductToCart(productId, 1);

            document.location.href = "/#/cart";
        }
    }

    public reloadPage() {
        window.location.reload(false);
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    render() {
        const { error, isLoaded, items, currency } = this.state;
        var filteredItems = null;
        if (items != null)
        {
            filteredItems = items.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        }

        var currencyBeforeSign = '€';
        var currencyAfterSign = '';
        if (currency == 'RON') { currencyBeforeSign = ''; currencyAfterSign = 'RON' }
        else if (currency == 'GBP') { currencyBeforeSign = '₤'; currencyAfterSign = '' }

        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="loading">Loading&#8230;</div>;
        } else {
            return (
                <main id="main">
                    <div>
                        <Header Active={'Search'} reloadPage={this.reloadPage} />

                        <div className="hero-wrap page-title" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" }}>
                            <div className="row justify-content-center">
                                <div className="col-md-12 heading-section text-center">
                                    <h1 className="mb-4"><Translate content={'search.SearchProducts'} /></h1>
                                    <SearchInput className="search-input" onChange={this.searchUpdated} />
                                </div>
                            </div>
                        </div>

                        <section className="ftco-section">
                            <div className="container">
                                <div className="row">
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
                                                                                <input type="radio" className="form-check-input" name="type" value="Accessories"
                                                                                    checked={this.state.type === "Accessories"} id="type-accessories" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="type-accessories"><Translate content={'search.Accessories'} /></label>
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
                                                                            <input type="radio" className="form-check-input" name="priceInterval" value="0"
                                                                                checked={this.state.priceInterval === "0"} id="range1" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="range1">All</label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="priceInterval" value="1"
                                                                                checked={this.state.priceInterval === "1"} id="range1" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="range1">Under {currencyBeforeSign}50 {currencyAfterSign}</label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="priceInterval" value="2"
                                                                                checked={this.state.priceInterval === "2"} id="range2" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="range2"> {currencyBeforeSign}50 {currencyAfterSign} to {currencyBeforeSign}100 {currencyAfterSign}</label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="priceInterval" value="3"
                                                                                checked={this.state.priceInterval === "3"} id="range3" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="range3">{currencyBeforeSign}100 {currencyAfterSign} to {currencyBeforeSign}200 {currencyAfterSign}</label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="priceInterval" value="4"
                                                                                checked={this.state.priceInterval === "4"} id="range4" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="range4">{currencyBeforeSign}200 {currencyAfterSign} to {currencyBeforeSign}500 {currencyAfterSign}</label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="priceInterval" value="5"
                                                                                checked={this.state.priceInterval === "5"} id="range5" onChange={this.handleChange} />
                                                                                <label className="form-check-label" htmlFor="range5">{currencyBeforeSign}500 {currencyAfterSign} & Above</label>
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
                                    <div className="col-md-8 col-lg-10 order-md-last">
                                        <div className="row">
                                              {
                                                filteredItems.map((item, i) => (

                                                    <div key={i} className="col-lg-4 col-md-6 product-item filter-app wow fadeInUp">
                                                        <div className="product d-flex flex-column">
                                                            <a href={"/#/item/" + item.ProductId} className="img-prod"><img className="img-fluid" src={item.Image} alt="" />
                                                                <div className="overlay"></div>
                                                            </a>
                                                            <div className="text py-3 pb-4 px-3">
                                                                <h3 className="itemName"><a href={"/#/item/" + item.ProductId}>{item.Name}</a></h3>
                                                                <div className="pricing">
                                                                    <p className="price"><span>{currencyBeforeSign + " " + item.Price + " " + currencyAfterSign}</span></p>
                                                                </div>
                                                                <p className="bottom-area d-flex px-3">
                                                                    <a href="javascript:void(0)" className="add-to-cart text-center py-2 mr-1" onClick={() => this.addProductToCart(item.ProductId, 1)}><span><Translate content={'search.AddToCart'} /> <i className="ion-ios-add ml-1"></i></span></a>
                                                                    <a href="javascript:void(0)" onClick={() => this.buyProduct(item.ProductId)} className="buy-now text-center py-2"><Translate content={'search.BuyNow'} /><span><i className="ion-ios-cart ml-1"></i></span></a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>

                                        <div className="col-sm-3">
                                            <div className="block-27">
                                                        <Pagination
                                                            hideNavigation
                                                            activePage={this.state.activePage}
                                                            itemsCountPerPage={this.state.itemsPerPage}
                                                            totalItemsCount={this.state.totalItemsCount}
                                                            pageRangeDisplayed={3}
                                                            onChange={this.handlePageChange}
                                                        />
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
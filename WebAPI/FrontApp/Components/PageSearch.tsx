import * as React from 'react';
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Pagination from 'react-js-pagination';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');

export class Search extends React.Component<any, any>
{
    constructor(props) {
        super(props);

        this.state = {
            gender: props.Gender,
            type: props.Type,
            priceInterval: '',
            items: null,
            isLoaded: false,
            error: null,
            waitingResponse: false,
            isChanged: false,
            pageNumber: 1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        axios.get(API_Path + '/Products',
            {
                params: {
                    top: 5,
                    from: 0,
                    gender: "",
                    type: "intro"
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

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ isChanged: true });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.waitingResponse == false) {
            this.setState({ waitingResponse: true });
        }

        axios.get(API_Path + '/Products', {
            priceInterval: this.state.priceInterval,
            gender: this.state.gender,
            type: this.state.type,
            pageNumber: this.state.pageNumber
        })
            .catch((error) => {
                NotificationManager.error("Request failed. Please, try again later.");
            })
            .then(() => {
                this.setState({ waitingResponse: false });
            }
            );
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

    render() {
        const { error, isLoaded, items, gender, type } = this.state;

        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div></div>;
        } else {
            return (
                <main id="main">
                    <div>
                        <Header Active={'Search'} />

                        <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                            <div className="row no-gutters slider-text align-items-center justify-content-center">
                                <div className="col-md-9 text-center">
                                    <h1 className="mb-0 bread">Search products</h1>
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
                                                                    <a href="#" className="add-to-cart text-center py-2 mr-1" onClick={() => this.addProductToCart(item.ProductId, 1)}><span>Add to cart <i className="ion-ios-add ml-1"></i></span></a>
                                                                    <a href="#" className="buy-now text-center py-2">Buy now<span><i className="ion-ios-cart ml-1"></i></span></a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>

                                       
                                        <div className="row mt-5">
                                            <div className="col text-center">
                                                <div className="block-27">
                                                    <Pagination
                                                        hideDisabled
                                                        activePage={this.state.activePage}
                                                        itemsCountPerPage={1}
                                                        totalItemsCount={10}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row mt-5">
                                            <div className="col text-center">
                                                <div className="block-27">
                                                    <ul>
                                                        <li><a href="#">&lt;</a></li>
                                                        <li className="active"><span>1</span></li>
                                                        <li><a href="#">2</a></li>
                                                        <li><a href="#">3</a></li>
                                                        <li><a href="#">4</a></li>
                                                        <li><a href="#">5</a></li>
                                                        <li><a href="#">&gt;</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4 col-lg-2">
                                        <div className="sidebar">
                                            <div className="sidebar-box-2">
                                                <h2 className="heading">Categories</h2>
                                                <div className="fancy-collapse-panel">
                                                    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                                        <div className="panel panel-default">
                                                            <div className="panel-heading" role="tab" id="headingOne">
                                                                <h4 className="panel-title">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Gender
                                 </a>
                                                                </h4>
                                                            </div>
                                                            <div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                                                                <div className="panel-body">
                                                                    <ul>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="men" value={this.state.gender} id="gender-men" />
                                                                            <label className="form-check-label" htmlFor="gender-men">Men</label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="men" value={this.state.gender} id="gender-women" />
                                                                            <label className="form-check-label" htmlFor="gender-women">Women</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="panel panel-default">
                                                            <div className="panel-heading" role="tab" id="headingTwo">
                                                                <h4 className="panel-title">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Products</a>
                                                                </h4>
                                                            </div>
                                                            <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                                                <div className="panel-body">
                                                                    <ul>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="women" value={this.state.type} id="type-bags" />
                                                                            <label className="form-check-label" htmlFor="type-bags">Bags</label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="women" value={this.state.type} id="type-belts" />
                                                                            <label className="form-check-label" htmlFor="type-belts">Belts</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="panel panel-default">
                                                            <div className="panel-heading" role="tab" id="headingTwo">
                                                                <h4 className="panel-title">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Price Range</a>
                                                                </h4>
                                                            </div>

                                                            <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                                                <div className="panel-body">
                                                                    <ul>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="range" value={this.state.pageNumber} id="range1" />
                                                                            <label className="form-check-label" htmlFor="range1">Under $50</label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="range" value={this.state.pageNumber} id="range2" />
                                                                            <label className="form-check-label" htmlFor="range2"> $50 to $100</label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="range" value={this.state.pageNumber} id="range3" />
                                                                            <label className="form-check-label" htmlFor="range3">$100 to $200</label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="range" value={this.state.pageNumber} id="range4" />
                                                                            <label className="form-check-label" htmlFor="range4">$200 to $500</label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" className="form-check-input" name="range" value={this.state.pageNumber} id="range5" />
                                                                            <label className="form-check-label" htmlFor="range5">$500 & Above</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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
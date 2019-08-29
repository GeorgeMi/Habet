import * as React from 'react';
import { KeyedCollection } from './Dictionary';
import { Header } from './Header';
import { NotFound } from "./PageNotFound";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');

export class Product extends React.Component<any, any>
{
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        this.state = { isLoaded: false, item: null, error: null, imageDictionary: dictionary, productId: props.match.params.id, quantity: 1 };

        this.getImageForProduct = this.getImageForProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        axios.get(API_Path + '/Products/' + this.state.productId)
            .then((response) => {
                var dictionary = this.state.imageDictionary;
                this.setState({ isLoaded: true, item: response.data, imageDictionary: dictionary });

           //     this.getImageForProduct(response.data.productId);
            })
            .catch((error) => {
                this.setState({ isLoaded: true, error });
            })
            .then();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ isChanged: true });
    }

    getImageForProduct(productId) {
        axios.get(API_Path + '/ProductsImages/' + productId)
            .then((response) => {

                var dictionary = this.state.imageDictionary;
                dictionary.Add(productId, response.data);

                this.setState({ imageDictionary: dictionary });
            }).catch(err => {
                console.log(productId + " .... " + this.state.imageDictionary);
                //console.log(err);        
            })
    }

    addProductToCart(productId: number, no: number) {
        var cookie = read_cookie('cartProducts');
        console.log(cookie as KeyedCollection<number>);
        if (cookie.length == 0)
        {
            var cartProducts = new KeyedCollection<number>();
        }
        else
        {
            var cartProducts = cookie as KeyedCollection<number>;
            if (cartProducts.ContainsKey(productId))
            {
                no = no + cartProducts.Item(productId);
                cartProducts.Remove(productId);
            }
        }
        console.log(cartProducts);
        cartProducts.Add(productId, no);

        delete_cookie('cartProducts');
        bake_cookie('cartProducts', cartProducts);
    }
    
    increaseQuantity = () => {
        this.setState({ quantity: this.state.quantity + 1 });
    }

    decreaseQuantity = () => {
        if (this.state.quantity == 1)
        {
            this.setState({ quantity: 1 });
        }
        else
        {
            this.setState({ quantity: this.state.quantity - 1 });
        }
    }

    render() {
        const { error, isLoaded, item, quantity } = this.state;

        if (error) {
            return (
                <div>
                    <Header />
                    <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                        <div className="row no-gutters slider-text align-items-center justify-content-center">
                            <div className="col-md-9 text-center">
                                <h1 className="mb-0 bread">ARE YOU HAPPY NOW?</h1>
                                <h5>Just kidding! Our bad. 404 NOT FOUND</h5>
                            </div>
                        </div>
                    </div>
                </div>
            );

        } else if (!isLoaded) {
            return <div className="loading">Loading&#8230;</div>;

        } else {
            return (
                <div>
                    <Header />

                    <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                        <div className="row no-gutters slider-text align-items-center justify-content-center">
                            <div className="col-md-9 text-center">
                                <h1 className="mb-0 bread">Product details</h1>
                            </div>
                        </div>
                    </div>

                    <section className="ftco-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 mb-5">
                                    <a href={item.Image} className="image-popup prod-img-bg"><img src={item.Image} className="img-fluid" alt="..." /></a>
                                </div>
                                <div className="col-lg-6 product-details pl-md-5">
                                    <h3>{item.Name}</h3>
                                    <p className="price"><span>${item.Price}</span></p>
                                    <p>{item.Description}</p>
                                    <div className="row mt-4">
                                        <div className="w-100"></div>
                                        <div className="input-group col-md-6 d-flex mb-3">
                                            <span className="input-group-btn mr-2">
                                                <button type="button" className="quantity-left-minus btn" data-type="minus" data-field="" onClick={this.decreaseQuantity}>
                                                    <i className="ion-ios-remove"></i>
                                                </button>
                                            </span>
                                            <input type="text" id="quantity" name="quantity" className="quantity form-control input-number" min="1" max="100" value={quantity} onChange={this.handleChange} />
                                            <span className="input-group-btn ml-2">
                                                <button type="button" className="quantity-right-plus btn" data-type="plus" data-field="" onClick={this.increaseQuantity}>
                                                    <i className="ion-ios-add"></i>
                                                </button>
                                            </span>
                                        </div>
                                        <div className="w-100"></div>
                                        <div className="col-md-12">
                                            <p onClick={() => this.addProductToCart(item.ProductId, quantity)}><a className="btn btn-black py-3 px-5 mr-2">Add to Cart</a><a href="" className="btn btn-primary py-3 px-5">Buy now</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
    }
}
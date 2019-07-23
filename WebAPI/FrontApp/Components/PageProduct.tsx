import * as React from 'react';
import { KeyedCollection } from './Dictionary';
import { Header } from './Header';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');


export class Product extends React.Component<any, any>
{
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        this.state = { isLoaded: false, item: null, error: null, imageDictionary: dictionary };

       this.getImageForProduct = this.getImageForProduct.bind(this);
    }

    componentWillMount() {
        axios.get(API_Path + '/Products/1')
            .then((response) => {
                var dictionary = this.state.imageDictionary;
                this.setState({ isLoaded: true, item: response.data.data, imageDictionary: dictionary });

           //     this.getImageForProduct(response.data.productId);
            })
            .catch((error) => {
                this.setState({ isLoaded: true, error });
            })
            .then();
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

    render() {
        const { error, isLoaded, item, imageDictionary } = this.state;
        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;

        } else if (!isLoaded) {
            return <div>Loading...</div>;

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
                                    <a href="images/product.png" className="image-popup prod-img-bg"><img src="images/product.png" className="img-fluid" alt="..." /></a>
                                </div>
                                <div className="col-lg-6 product-details pl-md-5">
                                    <h3>Nike Free RN 2019 iD</h3>
                                    <p className="price"><span>$120.00</span></p>
                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                    <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.
						</p>
                                    <div className="row mt-4">
                                        <div className="w-100"></div>
                                        <div className="input-group col-md-6 d-flex mb-3">
                                            <span className="input-group-btn mr-2">
                                                <button type="button" className="quantity-left-minus btn" data-type="minus" data-field="">
                                                    <i className="ion-ios-remove"></i>
                                                </button>
                                            </span>
                                            <input type="text" id="quantity" name="quantity" className="quantity form-control input-number" min="1" max="100" />
                                            <span className="input-group-btn ml-2">
                                                <button type="button" className="quantity-right-plus btn" data-type="plus" data-field="">
                                                    <i className="ion-ios-add"></i>
                                                </button>
                                            </span>
                                        </div>
                                        <div className="w-100"></div>
                                        <div className="col-md-12">
                                            <p><a href="cart.html" className="btn btn-black py-3 px-5 mr-2">Add to Cart</a><a href="cart.html" className="btn btn-primary py-3 px-5">Buy now</a></p>
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
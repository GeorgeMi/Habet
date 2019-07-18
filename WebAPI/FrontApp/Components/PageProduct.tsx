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
                this.setState({ isLoaded: true, item: response.data, imageDictionary: dictionary });

                this.getImageForProduct(response.data.productId);
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
                    <br />
                    <br />
                <section id="product" className="section-bg">
                    <div className="container">
                        <div className="row product-container">
                                    <div className="col-lg-4 col-md-6 product-item filter-app wow fadeInUp">
                                        <div className="product-wrap">
                                            <figure>
                                                <img src={imageDictionary.Item(item.productId)} className="img-fluid" alt="" />
                                                <a href={imageDictionary.Item(item.productId)} data-lightbox="product" data-title={item.name} className="link-preview" title="Preview"><i className="ion ion-eye"></i></a>
                                                <a href="#" className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>
                                            </figure>
                                                                               
                                        </div>
                            </div>
                            <div className="col-lg-4 col-md-6 product-item filter-app wow fadeInUp">
                                <h4><a href="#">{item.name}</a></h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </div>
                    </section>
                </div>
            );
        }
    }
}
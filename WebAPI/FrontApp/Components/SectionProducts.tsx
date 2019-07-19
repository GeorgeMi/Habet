﻿import * as React from 'react';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');


export class SectionProducts extends React.Component<any, any>
{
    constructor(props) {
        super(props);

        this.state = { isLoaded: false, items: null, error: null, gender: props.Gender, type: props.Type };
    }

    componentWillMount() {
        axios.get(API_Path + '/Products',
            {
                params: {
                    top: 20,
                    from: 0
                }
            })
            .then((response) => {
                  this.setState({ isLoaded: true, items: response.data });
            })
            .catch((error) => {
                this.setState({ isLoaded: true, error });
            })
            .then();
    }


    render() {
        const { error, isLoaded, items, type } = this.state;
        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;

        } else if (!isLoaded) {
            return <div></div>;

        } else {
            return (
                <div className="row">
                    {
                        items.map((item, i) => (

                            <div key={i} className="col-lg-4 col-md-6 product-item filter-app wow fadeInUp">
                                <div className="product d-flex flex-column">
                                    <a href={"/#/item/" + item.productId} className="img-prod"><img className="img-fluid" src={item.image} alt="" />
                                        <div className="overlay"></div>
                                    </a>
                                    <div className="text py-3 pb-4 px-3">
                                        <div className="d-flex">
                                            <div className="cat">
                                                <span>{type}</span>
                                            </div>
                                            <div className="rating">
                                                <p className="text-right mb-0">
                                                    <a href="#"><span className="ion-ios-star-outline"></span></a>
                                                    <a href="#"><span className="ion-ios-star-outline"></span></a>
                                                    <a href="#"><span className="ion-ios-star-outline"></span></a>
                                                    <a href="#"><span className="ion-ios-star-outline"></span></a>
                                                    <a href="#"><span className="ion-ios-star-outline"></span></a>
                                                </p>
                                            </div>
                                        </div>
                                        <h3><a href={"/#/item/" + item.productId}>{item.name}</a></h3>
                                        <div className="pricing">
                                            <p className="price"><span>${item.price}</span></p>
                                        </div>
                                        <p className="bottom-area d-flex px-3">
                                            <a href="#" className="add-to-cart text-center py-2 mr-1"><span>Add to cart <i className="ion-ios-add ml-1"></i></span></a>
                                            <a href="#" className="buy-now text-center py-2">Buy now<span><i className="ion-ios-cart ml-1"></i></span></a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            );
        }
    }
}
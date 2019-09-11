﻿import * as React from 'react';
import { KeyedCollection } from './Dictionary';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');

export class SectionIntro extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = { isLoaded: false, items: null, error: null, language: read_cookie('lang') };
    }

    componentWillMount() {
        axios.get(API_Path + '/Products',
            {
                params: {
                    top: 5,
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
    render() {
        const { error, isLoaded, items} = this.state;
        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;

        } else if (!isLoaded) {
            return <div></div>;

        } else {
            var activeDictionary = new KeyedCollection<string>();           
            items.map((item, i) => (
                activeDictionary.Add(i, "")
            ));
            activeDictionary.Add(0, "active");

            return (
                <section className="ftco-section ftco-deal" style={{ backgroundImage: "url('images/background.jpg')", opacity: 0.5 }}>
                    <div className="container">
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                {
                                    items.map((item, i) => (
                                        <div key={i} className={activeDictionary.Item(i) + " carousel-item"}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <img src={item.Image} className="img-fluid" alt="" />
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="text-deal">
                                                        <h2><a href="#">{item.Name}</a></h2>
                                                        <p className="price"><span>${item.Price}</span></p>
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
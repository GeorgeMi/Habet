import * as React from 'react';
import { Header } from './Header';


export class Search extends React.Component {
    render() {
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
                                        <div className="col-sm-12 col-md-12 col-lg-4 d-flex">
                                            <div className="product d-flex flex-column">
                                                <a href="#" className="img-prod"><img className="img-fluid" src="images/product.png" alt="..." />
                                                    <div className="overlay"></div>
                                                </a>
                                                <div className="text py-3 pb-4 px-3">
                                                    <h3><a href="#">Nike Free RN 2019 iD</a></h3>
                                                    <div className="pricing">
                                                        <p className="price"><span>$120.00</span></p>
                                                    </div>
                                                    <p className="bottom-area d-flex px-3">
                                                        <a href="#" className="add-to-cart text-center py-2 mr-1"><span>Add to cart <i className="ion-ios-add ml-1"></i></span></a>
                                                        <a href="#" className="buy-now text-center py-2">Buy now<span><i className="ion-ios-cart ml-1"></i></span></a>
                                                    </p>
                                                </div>
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
                                                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Men's Shoes
                                 </a>
                                                            </h4>
                                                        </div>
                                                        <div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                                                            <div className="panel-body">
                                                                <ul>
                                                                    <li><a href="#">Sport</a></li>
                                                                    <li><a href="#">Casual</a></li>
                                                                    <li><a href="#">Running</a></li>
                                                                    <li><a href="#">Jordan</a></li>
                                                                    <li><a href="#">Soccer</a></li>
                                                                    <li><a href="#">Football</a></li>
                                                                    <li><a href="#">Lifestyle</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading" role="tab" id="headingTwo">
                                                            <h4 className="panel-title">
                                                                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Women's Shoes
                                 </a>
                                                            </h4>
                                                        </div>
                                                        <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                                            <div className="panel-body">
                                                                <ul>
                                                                    <li><a href="#">Sport</a></li>
                                                                    <li><a href="#">Casual</a></li>
                                                                    <li><a href="#">Running</a></li>
                                                                    <li><a href="#">Jordan</a></li>
                                                                    <li><a href="#">Soccer</a></li>
                                                                    <li><a href="#">Football</a></li>
                                                                    <li><a href="#">Lifestyle</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading" role="tab" id="headingThree">
                                                            <h4 className="panel-title">
                                                                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Accessories
                                 </a>
                                                            </h4>
                                                        </div>
                                                        <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                                            <div className="panel-body">
                                                                <ul>
                                                                    <li><a href="#">Jeans</a></li>
                                                                    <li><a href="#">T-Shirt</a></li>
                                                                    <li><a href="#">Jacket</a></li>
                                                                    <li><a href="#">Shoes</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading" role="tab" id="headingFour">
                                                            <h4 className="panel-title">
                                                                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseThree">Clothing
                                 </a>
                                                            </h4>
                                                        </div>
                                                        <div id="collapseFour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
                                                            <div className="panel-body">
                                                                <ul>
                                                                    <li><a href="#">Jeans</a></li>
                                                                    <li><a href="#">T-Shirt</a></li>
                                                                    <li><a href="#">Jacket</a></li>
                                                                    <li><a href="#">Shoes</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sidebar-box-2">
                                            <h2 className="heading">Price Range</h2>
                                            <form method="post" className="product-form-2">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="guests">Price from:</label>
                                                            <div className="form-field">
                                                                <i className="icon icon-arrow-down3"></i>
                                                                <select name="people" id="people" className="form-control">
                                                                    <option value="#">1</option>
                                                                    <option value="#">200</option>
                                                                    <option value="#">300</option>
                                                                    <option value="#">400</option>
                                                                    <option value="#">1000</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="guests">Price to:</label>
                                                            <div className="form-field">
                                                                <i className="icon icon-arrow-down3"></i>
                                                                <select name="people" id="people" className="form-control">
                                                                    <option value="#">2000</option>
                                                                    <option value="#">4000</option>
                                                                    <option value="#">6000</option>
                                                                    <option value="#">8000</option>
                                                                    <option value="#">10000</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
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
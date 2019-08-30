import * as React from 'react';
import { Header } from './Header';


export class Checkout extends React.Component<any, any> {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { isLoaded: false, error: null, subtotal: props.match.params.subtotal, total: props.match.params.total, delivery: props.match.params.delivery };
    }

    render() {
        return (
            <main id="main">
                <div>
                    <Header />

                    <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                        <div className="container">
                            <div className="row no-gutters slider-text align-items-center justify-content-center">
                                <div className="col-md-9 text-center">
                                    <h1 className="mb-0 bread">Checkout</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="ftco-section">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-10">
                                    <form action="#" className="billing-form">
                                        <h3 className="mb-4 billing-heading">Billing Details</h3>
                                        <div className="row align-items-end">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="firstname">Firt Name</label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastname">Last Name</label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="country">State / Country</label>
                                                    <div className="select-wrap">
                                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                        <select name="" id="" className="form-control">
                                                            <option value="GB">United Kingdom</option>
                                                            <option value="AL">Albania</option>
                                                            <option value="AD">Andorra</option>
                                                            <option value="AT">Austria</option>
                                                            <option value="BY">Belarus</option>
                                                            <option value="BE">Belgium</option>
                                                            <option value="BA">Bosnia and Herzegovina</option>
                                                            <option value="BG">Bulgaria</option>
                                                            <option value="HR">Croatia (Hrvatska)</option>
                                                            <option value="CY">Cyprus</option>
                                                            <option value="CZ">Czech Republic</option>
                                                            <option value="FR">France</option>
                                                            <option value="GI">Gibraltar</option>
                                                            <option value="DE">Germany</option>
                                                            <option value="GR">Greece</option>
                                                            <option value="VA">Holy See (Vatican City State)</option>
                                                            <option value="HU">Hungary</option>
                                                            <option value="IT">Italy</option>
                                                            <option value="LI">Liechtenstein</option>
                                                            <option value="LU">Luxembourg</option>
                                                            <option value="MK">Macedonia</option>
                                                            <option value="MT">Malta</option>
                                                            <option value="MD">Moldova</option>
                                                            <option value="MC">Monaco</option>
                                                            <option value="ME">Montenegro</option>
                                                            <option value="NL">Netherlands</option>
                                                            <option value="PL">Poland</option>
                                                            <option value="PT">Portugal</option>
                                                            <option value="RO">Romania</option>
                                                            <option value="SM">San Marino</option>
                                                            <option value="RS">Serbia</option>
                                                            <option value="SK">Slovakia</option>
                                                            <option value="SI">Slovenia</option>
                                                            <option value="ES">Spain</option>
                                                            <option value="UA">Ukraine</option>
                                                            <option value="DK">Denmark</option>
                                                            <option value="EE">Estonia</option>
                                                            <option value="FO">Faroe Islands</option>
                                                            <option value="FI">Finland</option>
                                                            <option value="GL">Greenland</option>
                                                            <option value="IS">Iceland</option>
                                                            <option value="IE">Ireland</option>
                                                            <option value="LV">Latvia</option>
                                                            <option value="LT">Lithuania</option>
                                                            <option value="NO">Norway</option>
                                                            <option value="SJ">Svalbard and Jan Mayen Islands</option>
                                                            <option value="SE">Sweden</option>
                                                            <option value="CH">Switzerland</option>
                                                            <option value="TR">Turkey</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="streetaddress">Street Address</label>
                                                    <input type="text" className="form-control" placeholder="House number and street name" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Appartment, suite, unit etc: (optional)" />
                                                </div>
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="towncity">Town / City</label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="postcodezip">Postcode / ZIP *</label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Phone</label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="emailaddress">Email Address</label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-12">
                                                <div className="form-group mt-4">
                                                    <div className="radio">
                                                        <label className="mr-3"><input type="radio" name="optradio" /> Create an Account? </label>
                                                        <label><input type="radio" name="optradio" /> Ship to different address</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>



                                    <div className="row mt-5 pt-3 d-flex">
                                        <div className="col-md-6 d-flex">
                                            <div className="cart-detail cart-total bg-light p-3 p-md-4">
                                                <h3 className="billing-heading mb-4">Cart Total</h3>
                                                <p className="d-flex">
                                                    <span>Subtotal</span>
                                                    <span>${this.state.subtotal}</span>
                                                </p>
                                                <p className="d-flex">
                                                    <span>Delivery</span>
                                                    <span>${this.state.delivery}</span>
                                                </p>
                                                <hr />
                                                <p className="d-flex total-price">
                                                    <span>Total</span>
                                                    <span>${this.state.total}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="cart-detail bg-light p-3 p-md-4">
                                                <h3 className="billing-heading mb-4">Payment Method</h3>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <div className="radio">
                                                            <label><input type="radio" name="optradio" className="mr-2" /> Direct Bank Tranfer</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <div className="radio">
                                                            <label><input type="radio" name="optradio" className="mr-2" /> Check Payment</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <div className="radio">
                                                            <label><input type="radio" name="optradio" className="mr-2" /> Paypal</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <div className="checkbox">
                                                            <label><input type="checkbox" value="" className="mr-2" /> I have read and accept the terms and conditions</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p><a href="#" className="btn btn-primary py-3 px-4">Place an order</a></p>
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
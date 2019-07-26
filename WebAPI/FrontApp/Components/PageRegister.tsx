import * as React from 'react';
import { Header } from './Header';


export class Register extends React.Component {
    render() {
        return (
            <main id="main">
                <div>
                    <Header />

                    <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                        <div className="container">
                            <div className="row no-gutters slider-text align-items-center justify-content-center">
                                <div className="col-md-9 text-center">
                                    <h1 className="mb-0 bread">Register</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="ftco-section">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-10">
                                    <form action="#" className="billing-form">
                                        <h3 className="mb-4 billing-heading">LogIn Details</h3>
                                        <div className="row align-items-end">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="firstname">Email</label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastname">Password</label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="mb-4 billing-heading">Personal Details</h3>
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
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="country">State / Country</label>
                                                    <div className="select-wrap">
                                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                        <select name="" id="" className="form-control">
                                                            <option value="">France</option>
                                                            <option value="">Italy</option>
                                                            <option value="">Philippines</option>
                                                            <option value="">South Korea</option>
                                                            <option value="">Hongkong</option>
                                                            <option value="">Japan</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="towncity">Town / City</label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="streetaddress">Street Address</label>
                                                    <input type="text" className="form-control" placeholder="Street Address" />
                                                </div>
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="postcodezip">Postcode / ZIP *</label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Phone</label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <input type="submit" value="Register" className="btn btn-primary py-3 px-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        );
    }
}
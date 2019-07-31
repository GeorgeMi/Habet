import * as React from 'react';
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');

export class Register extends React.Component<any, any> {
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        dictionary.Add(props.Active, 'cta cta-colored');

        this.state = { email: '', password: '', firstName: '', lastName: '', state: '', city: '', streetAddress: '', zipCode: '', phone: '', api_response: '', loggedIn: false, headerDictionary: dictionary, waitingResponse: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.waitingResponse == false) {
            this.setState({ waitingResponse: true });
        }

        axios.post(API_Path + '/Registration', {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            state: this.state.state,
            city: this.state.city,
            streetAddress: this.state.streetAddress,
            zipCode: this.state.zipCode,
            phone: this.state.phone
        })
            .then((response) => {
                this.setState({ email: '', password: '', firstName: '', lastName: '', state: '', city: '', streetAddress: '', zipCode: '', phone: '', api_response: response.data, loggedIn: true });
                NotificationManager.success(response.data.message);
            })
            .catch((error) => {
                this.setState({ error });
                NotificationManager.error("Registration failed! Please, try another email.");              
            })
            .then(
                this.setState({ waitingResponse: false })
            );
    }


    render() {
        const { waitingResponse } = this.state;
        return (
            <main id="main">
                {waitingResponse ? <div className="loading">Loading&#8230;</div> : <div></div>}

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
                                    <form action="" className="billing-form" onSubmit={this.handleSubmit}>
                                        <h3 className="mb-4 billing-heading">LogIn Details</h3>
                                        <div className="row align-items-end">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="firstname">Email</label>
                                                    <input type="email" className="form-control" placeholder="" value={this.state.email} onChange={this.handleChange} name="email" id="email" maxLength={32} required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastname">Password</label>
                                                    <input type="password" className="form-control" placeholder="" value={this.state.password} onChange={this.handleChange} name="password" id="password" maxLength={32}  required/>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="mb-4 billing-heading">Personal Details</h3>
                                        <div className="row align-items-end">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="firstname">First Name</label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.firstName} onChange={this.handleChange} name="firstName" id="firstName" maxLength={32} required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastname">Last Name</label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.lastName} onChange={this.handleChange} name="lastName" id="lastName" maxLength={32} required/>
                                                </div>
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="country">State / Country</label>
                                                    <div className="select-wrap">
                                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                        <select className="form-control" value={this.state.state} onChange={this.handleChange} name="state" id="state" required>
                                                            <option value="">Select</option>
                                                            <option value="France">France</option>
                                                            <option value="Italy">Italy</option>
                                                            <option value="Philippines">Philippines</option>
                                                            <option value="South Korea">South Korea</option>
                                                            <option value="Hongkong">Hongkong</option>
                                                            <option value="Japan">Japan</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="towncity">Town / City</label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.city} onChange={this.handleChange} name="city" id="city" maxLength={32} required/>
                                                </div>
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="streetaddress">Street Address</label>
                                                    <input type="text" className="form-control" placeholder="Street Address" value={this.state.streetAddress} onChange={this.handleChange} name="streetAddress" id="streetAddress" maxLength={50} required/>
                                                </div>
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="postcodezip">Postcode / ZIP *</label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.zipCode} onChange={this.handleChange} name="zipCode" id="zipCode" maxLength={10} required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Phone</label>
                                                    <input type="tel" className="form-control" placeholder="" value={this.state.phone} onChange={this.handleChange} name="phone" id="phone" maxLength={32} required/>
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
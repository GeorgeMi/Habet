import * as React from 'react';
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');

export class UpdateUserDetails extends React.Component<any, any> {
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        dictionary.Add(props.Active, 'cta cta-colored');

        this.state = { user_details: '', waitingResponse: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        if (read_cookie('token') != null && read_cookie('token').length !== 0) {
            axios.get(API_Path + '/Users',
                {
                    headers: {
                        token: read_cookie('token') //the token is a variable which holds the token
                    }
                })
                .then((response) => {
                    this.setState({ isLoaded: true, user_details: response.data.data });
                })
                .catch((error) => {
                    this.setState({ isLoaded: true, error });
                })
                .then();
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.waitingResponse == false) {
            this.setState({ waitingResponse: true });
        }

        axios.put(API_Path + '/Users', {
            firstName: this.state.user_details.firstName,
            lastName: this.state.user_details.lastName,
            state: this.state.user_details.state,
            city: this.state.user_details.city,
            streetAddress: this.state.user_details.streetAddress,
            zipCode: this.state.user_details.zipCode,
            phone: this.state.user_details.phone
        }, {
                headers: {
                    token: read_cookie('token') //the token is a variable which holds the token
                }
            })
            .then((response) => {
                NotificationManager.success(response.data.message);
            })
            .catch((error) => {
                NotificationManager.error("Request failed. Please, try again later.");
            })
            .then(() => {
                this.setState({ waitingResponse: false });
            }
            );
    }
     
    render() {
        const { error, isLoaded, waitingResponse } = this.state;

        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="loading">Loading&#8230;</div>;
        } else {

            return (
                <main id="main">
                    {waitingResponse ? <div className="loading">Loading&#8230;</div> : <div></div>}

                    <div>
                        <Header />

                        <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                            <div className="container">
                                <div className="row no-gutters slider-text align-items-center justify-content-center">
                                    <div className="col-md-9 text-center">
                                        <h1 className="mb-0 bread">Update personal details</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="ftco-section">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-xl-10">
                                        <form action="" className="billing-form" onSubmit={this.handleSubmit}>
                                            <h3 className="mb-4 billing-heading">Personal Details</h3>
                                            <div className="row align-items-end">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="firstname">First Name</label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.user_details.firstName} onChange={this.handleChange} name="firstName" id="firstName" maxLength={32} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="lastname">Last Name</label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.user_details.lastName} onChange={this.handleChange} name="lastName" id="lastName" maxLength={32} required />
                                                    </div>
                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="country">State / Country</label>
                                                        <div className="select-wrap">
                                                            <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                            <select className="form-control" value={this.state.user_details.state} onChange={this.handleChange} name="state" id="state" required>
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
                                                        <input type="text" className="form-control" placeholder="" value={this.state.user_details.city} onChange={this.handleChange} name="city" id="city" maxLength={32} required />
                                                    </div>
                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="streetaddress">Street Address</label>
                                                        <input type="text" className="form-control" placeholder="Street Address" value={this.state.user_details.streetAddress} onChange={this.handleChange} name="streetAddress" id="streetAddress" maxLength={50} required />
                                                    </div>
                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="postcodezip">Postcode / ZIP *</label>
                                                        <input type="text" className="form-control" placeholder="" value={this.state.user_details.zipCode} onChange={this.handleChange} name="zipCode" id="zipCode" maxLength={10} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="phone">Phone</label>
                                                        <input type="tel" className="form-control" placeholder="" value={this.state.user_details.phone} onChange={this.handleChange} name="phone" id="phone" maxLength={32} required />
                                                    </div>
                                                </div>
                                                <div className="w-100"></div>
                                                <div className="col-md-8">
                                                    <div className="form-group">
                                                        <input type="submit" value="Update details" className="btn btn-primary py-3 px-5" />
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
}
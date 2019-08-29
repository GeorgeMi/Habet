import * as React from 'react';
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');

export class AddProduct extends React.Component<any, any> {
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        dictionary.Add(props.Active, 'cta cta-colored');

        this.state = { name: '', price: '', file:null, description: '', gender:'', type:'', image: '', api_response: '', loggedIn: false, headerDictionary: dictionary, waitingResponse: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleFileChange(event) {
        this.setState({ file: event.target.files[0] });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        if (this.state.waitingResponse == false) {
            this.setState({ waitingResponse: true });
        }

        let formData = new FormData();
        formData.append('Image', this.state.file);
        formData.append('data', JSON.stringify({ name: this.state.name, price: this.state.price, description: this.state.description, gender: this.state.gender, type: this.state.type}));

        axios.post(API_Path + '/Products', formData)
            .then((response) => {
                this.setState({ name: '', price: '', description: '', file: null, api_response: response.data, loggedIn: true });
                NotificationManager.success(response.data.message);
            })
            .catch((error) => {
                this.setState({ error });
                NotificationManager.error("Operation failed! Please, try again.");
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
                                    <h1 className="mb-0 bread">Add Product</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="ftco-section">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-10">
                                    <form action="" className="billing-form" onSubmit={this.handleSubmit}>
                                        <h3 className="mb-4 billing-heading">Product Details</h3>
                                        <div className="row align-items-end">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.name} onChange={this.handleChange} name="name" id="name" maxLength={32} required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="price">Price</label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.price} onChange={this.handleChange} name="price" id="price" maxLength={32} required />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="description">Description</label>
                                                    <textarea className="form-control" value={this.state.description} onChange={this.handleChange} name="description" id="description" required></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input type="file" onChange={this.handleFileChange} accept="image/*" required />
                                                </div>
                                            </div> 
                                            <div className="w-100"></div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="gender">Gender</label>
                                                    <div className="select-wrap">
                                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                        <select className="form-control" value={this.state.gender} onChange={this.handleChange} name="gender" id="state" required>
                                                            <option value="">Select</option>
                                                            <option value="Women">Women</option>
                                                            <option value="Men">Men</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="type">Type</label>
                                                    <div className="select-wrap">
                                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                        <select className="form-control" value={this.state.type} onChange={this.handleChange} name="type" id="type" required>
                                                            <option value="">Select</option>
                                                            <option value="Belts">Belt</option>
                                                            <option value="Bags">Bag</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <input type="submit" value="Add product" className="btn btn-primary py-3 px-5" />
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
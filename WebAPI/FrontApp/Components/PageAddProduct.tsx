import * as React from 'react';
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import * as Translate from 'react-translate-component';
import en from './languages/en';
import it from './languages/it';
import ro from './languages/ro';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');
var counterpart = require('counterpart');

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('ro', ro);
counterpart.registerTranslations('it', it);

export class AddProduct extends React.Component<any, any> {
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        dictionary.Add(props.Active, 'cta cta-colored');

        counterpart.setLocale(read_cookie('lang'));
        this.state = { name: '', price: '', file: null, description: '', gender: '', type: '', image: '', api_response: '', loggedIn: false, headerDictionary: dictionary, waitingResponse: false, language: read_cookie('lang') };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.langaugeChanged = this.langaugeChanged.bind(this);
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
        formData.append('data', JSON.stringify({ name: this.state.name, price: this.state.price, description: this.state.description, gender: this.state.gender, type: this.state.type }));

        const config = {
             headers: { token: read_cookie('token') } 
        }

        axios.post(API_Path + '/Products', formData, config)
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

    public langaugeChanged() {
        //do nothing
    }

    render() {
        const { waitingResponse } = this.state;
        return (
            <main id="main">
                {waitingResponse ? <div className="loading">Loading&#8230;</div> : <div></div>}

                <div>
                    <Header langaugeChanged={this.langaugeChanged} />

                    <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                        <div className="row justify-content-center mb-3 pb-3">
                            <div className="col-md-12 heading-section text-center">
                                <h1 className="mb-4"><Translate content='product.AddProduct' /></h1>
                            </div>
                        </div>
                    </div>

                    <section className="ftco-section">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-10">
                                    <form action="" className="billing-form" onSubmit={this.handleSubmit}>
                                        <h3 className="mb-4 billing-heading"><Translate content='product.ProductDetails' /></h3>
                                        <div className="row align-items-end">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="name"><Translate content='product.Name' /></label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.name} onChange={this.handleChange} name="name" id="name" maxLength={32} required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="price"><Translate content='product.Price' /></label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.price} onChange={this.handleChange} name="price" id="price" maxLength={32} required />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="description"><Translate content='product.Description' /></label>
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
                                                    <label htmlFor="gender"><Translate content='product.Gender' /></label>
                                                    <div className="select-wrap">
                                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                        <select className="form-control" value={this.state.gender} onChange={this.handleChange} name="gender" id="state" required>
                                                            <option value=""><Translate content='product.Select' /></option>
                                                            <option value="Women"><Translate content='product.Women' /></option>
                                                            <option value="Men"><Translate content='product.Men' /></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="type"><Translate content='product.Type' /></label>
                                                    <div className="select-wrap">
                                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                        <select className="form-control" value={this.state.type} onChange={this.handleChange} name="type" id="type" required>
                                                            <option value=""><Translate content='product.Select' /></option>
                                                            <option value="Belts"><Translate content='product.Belt' /></option>
                                                            <option value="Bags"><Translate content='product.Bag' /></option>
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
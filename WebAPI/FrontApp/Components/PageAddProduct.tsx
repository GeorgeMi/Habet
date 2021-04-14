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
        this.state = {
            name_ro: '', name_it: '', name_en: '', price_RON: '', price_EUR: '', price_GBP: '', file1: null, file2: null, file3: null, description_ro: '', description_it: '', description_en: '', gender: '', type: '', image: '', styleCode: '', leatherType: '', colour: '', api_response: '', loggedIn: false, headerDictionary: dictionary, waitingResponse: false, language: read_cookie('lang')
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange1 = this.handleFileChange1.bind(this);
        this.handleFileChange2 = this.handleFileChange2.bind(this);
        this.handleFileChange3 = this.handleFileChange3.bind(this);
        this.escapeHTML = this.escapeHTML.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
        this.changePrice = this.changePrice.bind(this);
    }

    changePrice(e) {
        if (e.target.validity.valid) {
            var newNum1 = +(e.target.value)
            this.setState({
                price_RON: newNum1,
                price_EUR: Math.round(newNum1 * 0.2),
                price_GBP: Math.round(newNum1 * 0.18)
            });
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleFileChange1(event) {
        this.setState({ file1: event.target.files[0] });
    }

    handleFileChange2(event) {
        this.setState({ file2: event.target.files[0] });
    }

    handleFileChange3(event) {
        this.setState({ file3: event.target.files[0] });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.waitingResponse == false) {
            this.setState({ waitingResponse: true });
        }

        let formData = new FormData();
        formData.append('Image1', this.state.file1);
        formData.append('Image2', this.state.file2);
        formData.append('Image3', this.state.file3);
        formData.append('data', JSON.stringify({
            name_ro: this.state.name_ro,
            name_it: this.state.name_it,
            name_en: this.state.name_en,
            price_RON: this.state.price_RON,
            price_EUR: this.state.price_EUR,
            price_GBP: this.state.price_GBP,
            description_ro: this.escapeHTML(this.state.description_ro),
            description_it: this.escapeHTML(this.state.description_it),
            description_en: this.escapeHTML(this.state.description_en),
            gender: this.state.gender,
            type: this.state.type,
            styleCode: this.state.styleCode,
            leatherType: this.state.leatherType,
            colour: this.state.colour
        }));

        const config = {
            headers: { token: read_cookie('token') }
        }

        axios.post(API_Path + '/Products', formData, config)
            .then((response) => {
                this.setState({ name_ro: '', name_it: '', name_en: '', price_RON: '', price_EUR: '', price_GBP: '', description_ro: '', description_it: '', description_en: '', file: null, api_response: response.data, loggedIn: true });
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

    escapeHTML(unsafe) {
        return unsafe.replace(/[&<"']/g, function (m) {
            switch (m) {
                case '&':
                    return '&amp;';
                case '<':
                    return '&lt;';
                case '"':
                    return '&quot;';
                default:
                    return '&apos;';
            }
        });
    };

    public reloadPage() {
        //do nothing
    }

    render() {
        const { waitingResponse } = this.state;
        return (
            <main id="main">
                {waitingResponse ? <div className="loading">Loading&#8230;</div> : <div></div>}

                <div>
                    <Header reloadPage={this.reloadPage} />

                    <div className="hero-wrap page-title" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" }}>
                        <div className="row justify-content-center">
                            <div className="col-md-12 heading-section text-center">
                                <h1 className="mb-4"><Translate content={'product.AddProduct'} /></h1>
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
                                                    <label htmlFor="name_ro"><Translate content='product.Name' /> (RO)</label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.name_ro} onChange={this.handleChange} name="name_ro" id="name_ro" maxLength={32} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="name_it"><Translate content='product.Name' /> (IT)</label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.name_it} onChange={this.handleChange} name="name_it" id="name_it" maxLength={32} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="name_en"><Translate content='product.Name' /> (EN)</label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.name_en} onChange={this.handleChange} name="name_en" id="name_en" maxLength={32} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="styleCode"><Translate content='product.StyleCode' /></label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.styleCode} onChange={this.handleChange} name="styleCode" id="styleCode" maxLength={32} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="leatherType"><Translate content='product.Leather' /></label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.leatherType} onChange={this.handleChange} name="leatherType" id="leatherType" maxLength={32} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="colour"><Translate content='product.Colour' /></label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.colour} onChange={this.handleChange} name="colour" id="colour" maxLength={32} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="price_RON"><Translate content='product.Price' /> RON</label>
                                                    <input type="number" className="form-control" placeholder="" value={this.state.price_RON} onChange={this.changePrice} name="price_RON" id="price_RON" maxLength={32} required />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="price_EUR"><Translate content='product.Price' /> EUR</label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.price_EUR} onChange={this.handleChange} name="price_EUR" id="price_EUR" maxLength={32} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="price_GBP"><Translate content='product.Price' /> GBP</label>
                                                    <input type="text" className="form-control" placeholder="" value={this.state.price_GBP} onChange={this.handleChange} name="price_GBP" id="price_GBP" maxLength={32} required />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="description_ro"><Translate content='product.Description' /> (RO)</label>
                                                    <textarea className="form-control" value={this.state.description_ro} onChange={this.handleChange} name="description_ro" id="description_ro" rows={10} style={{ resize: 'vertical' }} required></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="description_it"><Translate content='product.Description' /> (IT)</label>
                                                    <textarea className="form-control" value={this.state.description_it} onChange={this.handleChange} name="description_it" id="description_it" rows={10} style={{ resize: 'vertical' }} required></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="description_en"><Translate content='product.Description' /> (EN)</label>
                                                    <textarea className="form-control" value={this.state.description_en} onChange={this.handleChange} name="description_en" id="description_en" rows={10} style={{ resize: 'vertical' }} required></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input type="file" onChange={this.handleFileChange1} accept="image/*" required />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input type="file" onChange={this.handleFileChange2} accept="image/*" required />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input type="file" onChange={this.handleFileChange3} accept="image/*" required />
                                                </div>
                                            </div>

                                            <div className="w-100"></div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="gender"><Translate content='product.Gender' /></label>
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
                                                    <label htmlFor="type"><Translate content='product.Type' /></label>
                                                    <div className="select-wrap">
                                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                        <select className="form-control" value={this.state.type} onChange={this.handleChange} name="type" id="type" required>
                                                            <option value="">Select</option>
                                                            <option value="Accessories">Accessories</option>
                                                            <option value="Bags">Bag</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <Translate component="input" attributes={{ value: 'product.AddProduct', }} type="submit" className="btn btn-primary py-3 px-5" />
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
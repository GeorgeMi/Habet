import * as React from 'react';
import { Header } from './Header';
import * as Translate from 'react-translate-component';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
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

export class Contact extends React.Component<any, any>{

    constructor(props) {
        super(props);

        counterpart.setLocale(read_cookie('lang'));
        this.state = { name: '', email: '', subject: '', message: '', api_response: '', request_sent: false, language: read_cookie('lang') };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.langaugeChanged = this.langaugeChanged.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        var x = this.state
        console.log(x);
        event.preventDefault();

        axios.post(API_Path + '/Contact', {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message
        })
            .then((response) => {
                this.setState({ name: '', email: '', subject: '', message: '', api_response: response.data.data, request_sent: true });
            })
            .catch((error) => {
                this.setState({ isLoaded: true, error, request_sent: true });
            })
            .then();
    }

    public langaugeChanged() {
        //do nothing
    }

    render() {
        const { error, isLoaded, request_sent } = this.state;
        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;

        } else if (!isLoaded && request_sent) {
            return <div className="loading">Loading&#8230;</div>;

        } else {
            return (
                <div>
                    <Header Active={'Contact'} langaugeChanged={this.langaugeChanged}/>

                    <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                        <div className="row justify-content-center mb-3 pb-3">
                            <div className="col-md-12 heading-section text-center">
                                <h2 className="mb-4"><Translate content='contact.Title' /></h2>
                                <p><Translate content='contact.Subtitle' /></p>
                            </div>
                        </div>
                    </div>

                    <section className="ftco-section contact-section bg-light">
                        <div className="container">
                            <div className="row d-flex mb-5 contact-info">
                                <div className="w-100"></div>
                                <div className="col-md-4 d-flex">
                                    <div className="info bg-white p-4">
                                        <p><span><Translate content='contact.Address' />:</span> 73 Somerfield Rd, Manchester M9 8AQ, UK</p>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex">
                                    <div className="info bg-white p-4">
                                        <p><span><Translate content='contact.Phone' />:</span> <a href="tel:+441612582629">+44 161 258 2629</a></p>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex">
                                    <div className="info bg-white p-4">
                                        <p><span><Translate content='contact.Email' />:</span> <a href="mailto:habetgabriel@gmail.com">habetgabriel@gmail.com</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="row block-9">
                                <div className="col-md-12 order-md-last d-flex">
                                    <form action="" className="bg-white p-5 contact-form" onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Your Name" value={this.state.name} onChange={this.handleChange} name="name" id="name" pattern=".{3,}" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Your Email" value={this.state.email} onChange={this.handleChange} name="email" id="email" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Subject" value={this.state.subject} onChange={this.handleChange} name="subject" id="subject" required pattern=".{3,}" />
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control" placeholder="Message" value={this.state.message} onChange={this.handleChange} name="message" id="message" required></textarea>
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="Send Message" className="btn btn-primary py-3 px-5" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
    }
}
import * as React from 'react';
import { Header } from './Header';
import * as Translate from 'react-translate-component';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { NotificationManager } from 'react-notifications';
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
        this.state = { name: '', email: '', subject: '', message: '', api_response: '', waitingResponse: false, language: read_cookie('lang') };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.waitingResponse == false) {
            this.setState({ waitingResponse: true });
        }

        axios.post(API_Path + '/Contact', {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message
        })
            .then((response) => {
                this.setState({ name: '', email: '', subject: '', message: ''});
                NotificationManager.success(response.data.message);
            })
            .catch((error) => {
                this.setState({ isLoaded: true, error });
                NotificationManager.error("Request failed. Please, try again later.");
            })
            .then(
                this.setState({ waitingResponse: false })
            );
    }

    public reloadPage() {
        //do nothing
    }

    render() {
        const { waitingResponse } = this.state;

        return (
            <main id="main">
                {waitingResponse ? <div className="loading">Loading&#8230;</div> : <div></div>}

                <div>
                    <Header Active={'Contact'} reloadPage={this.reloadPage} />

                    <div className="hero-wrap">
                        <div className="row justify-content-center mb-3 pb-3">
                            <div className="col-md-12 heading-section text-center">
                                <h2 className="mb-4"><Translate content='contact.Title' /></h2>
                                <p><Translate content='contact.Subtitle' /></p>
                            </div>
                        </div>
                    </div>

                    <section className="ftco-section contact-section bg-light">
                        <div className="container">
                            <div className="row d-flex mb-5 contact-info" style={{ textAlign: 'center'}}>
                                <div className="w-100"></div>
                                <div className="col-md-4 d-flex">
                                    <div className="info bg-white p-4">
                                        <p><span><Translate content='contact.Address' />:</span> <Translate content='contact.AddressValue' /></p>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex">
                                    <div className="info bg-white p-4">
                                        <p><span><Translate content='contact.Phone' />:</span> <a href="tel:+40753696163"><Translate content='contact.PhoneValue' /></a></p>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex">
                                    <div className="info bg-white p-4">
                                        <p><span><Translate content='contact.Email' />:</span> <a href="mailto:contact@gabrielhabet.com">contact@gabrielhabet.com</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="row block-9">
                                <div className="col-md-12 order-md-last d-flex">
                                    <form action="" className="bg-white p-5 contact-form" onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name"><Translate content='user.FirstName' /></label>
                                            <input type="text" className="form-control" placeholder="" value={this.state.name} onChange={this.handleChange} name="name" id="name" pattern=".{3,}" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email"><Translate content='user.Email' /></label>
                                            <input type="text" className="form-control" placeholder="" value={this.state.email} onChange={this.handleChange} name="email" id="email" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="subject"><Translate content='contact.Subject' /></label>
                                            <input type="text" className="form-control" placeholder="" value={this.state.subject} onChange={this.handleChange} name="subject" id="subject" required pattern=".{3,}" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message"><Translate content='contact.Message' /></label>
                                            <textarea className="form-control" placeholder="" value={this.state.message} onChange={this.handleChange} name="message" id="message" rows={10} required></textarea>
                                        </div>
                                        <div className="form-group">                                       
                                            <Translate component="input" attributes={{ value: 'contact.SendMessage' }} type="submit" className="btn btn-primary py-3 px-5"/>
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
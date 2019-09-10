import * as React from 'react';
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
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

export class ChangePassword extends React.Component<any, any> {
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        dictionary.Add(props.Active, 'cta cta-colored');

        counterpart.setLocale(read_cookie('lang'));
        this.state = { password: '', confirm_password: '', waitingResponse: false, language: read_cookie('lang') };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.password == this.state.confirm_password && read_cookie('token') != null && read_cookie('token').length !== 0) {
            if (this.state.waitingResponse == false) {
                this.setState({ waitingResponse: true });
            }

            axios.post(API_Path + '/ChangePassword', {
                password: this.state.password
            }, {
                    headers: {
                        token: read_cookie('token') //the token is a variable which holds the token
                    }
                })
                .then((response) => {
                    NotificationManager.success(response.data.message);
                    this.setState({ password: '', confirm_password: '' });
                })
                .catch((error) => {
                    this.setState({ error, confirm_password: '' });
                    NotificationManager.error("Request failed. Please, try again later.");
                })
                .then(() => {
                    this.setState({ waitingResponse: false });
                }
                );
        }
        else {
            NotificationManager.error("Passwords don't match!");
        }
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
                                    <h1 className="mb-0 bread"><Translate content='user.ChangePassword' /></h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="ftco-section">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-10">
                                    <form action="" className="billing-form" onSubmit={this.handleSubmit}>
                                        <h3 className="mb-4 billing-heading"><Translate content='user.LogInDetails' /></h3>
                                        <div className="row align-items-end">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastname"><Translate content='user.NewPassword' /></label>
                                                    <input type="password" className="form-control" placeholder="" value={this.state.password} onChange={this.handleChange} name="password" id="password" maxLength={32} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastname"><Translate content='user.ConfirmPassword' /></label>
                                                    <input type="password" className="form-control" placeholder="" value={this.state.confirm_password} onChange={this.handleChange} name="confirm_password" id="confirm_password" maxLength={32} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="submit" value="Change password" className="btn btn-primary py-3 px-5" />
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
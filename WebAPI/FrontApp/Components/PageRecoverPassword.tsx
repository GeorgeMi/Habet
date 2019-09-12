import * as React from 'react';
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
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

export class RecoverPassword extends React.Component<any, any> {
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        dictionary.Add(props.Active, 'cta cta-colored');

        counterpart.setLocale(read_cookie('lang'));
        this.state = { email: '', api_response: '', waitingResponse: false, language: read_cookie('lang') };

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

        axios.post(API_Path + '/Recover', {
            email: this.state.email
        })
            .then((response) => {
            })
            .catch((error) => {
            })
            .then(() => {
                this.setState({ waitingResponse: false });
                NotificationManager.info("If you supplied a correct email address then an email should have been sent to you. It contains easy instructions to confirm and complete this password change.");
                this.setState({ email: '' });
            }
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
                    <Header reloadPage={this.reloadPage}/>

                    <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                        <div className="row justify-content-center mb-3 pb-3">
                            <div className="col-md-12 heading-section text-center">
                                <h1 className="mb-4"><Translate content='user.RecoverPassword' /></h1>
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
                                                    <label htmlFor="firstname"><Translate content='user.Email' /></label>
                                                    <input type="email" className="form-control" placeholder="" value={this.state.email} onChange={this.handleChange} name="email" id="email" maxLength={32} required/>
                                                </div>
                                            </div> 
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="submit" value="Recover" className="btn btn-primary py-3 px-5" />
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
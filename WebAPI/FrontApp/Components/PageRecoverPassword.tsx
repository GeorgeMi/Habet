﻿import * as React from 'react';
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');

export class RecoverPassword extends React.Component<any, any> {
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        dictionary.Add(props.Active, 'cta cta-colored');

        this.state = { email: '', api_response: '', waitingResponse: false };

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
                                    <h1 className="mb-0 bread">Recover password</h1>
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
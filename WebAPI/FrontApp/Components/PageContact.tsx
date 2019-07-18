import * as React from 'react';
import { Header } from './Header';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');

export class Contact extends React.Component<any, any>{

    constructor(props) {
        super(props);

        this.state = { name: '', email: '', subject: '', message: '', api_response: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                this.setState({ name: '', email: '', subject: '', message: '', api_response: response.data });
            })
            .catch((error) => {
                this.setState({ isLoaded: true, error });
            })
            .then();
    }

    render() {
        return (
            <div>
            <Header Active={'Contact'}/>
                <br />
                <br />
            <section id="contact" className="section-bg wow fadeInUp">
                <div className="container">

                    <div className="section-header">
                            <h3>Contact our Support and Sales team</h3>
                            <p>Our team is happy to answer your questions. Fill out the form and we’ll be in touch as soon as possible.</p>
                    </div>

                    <div className="row contact-info">

                        <div className="col-md-4">
                            <div className="contact-address">
                                <i className="ion-ios-location-outline"></i>
                                <h3>Address</h3>
                                <address>73 Somerfield Rd, Manchester M9 8AQ, UK</address>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="contact-phone">
                                <i className="ion-ios-telephone-outline"></i>
                                <h3>Phone Number</h3>
                                <p><a href="tel:+441612582629">+44 161 258 2629</a></p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="contact-email">
                                <i className="ion-ios-email-outline"></i>
                                <h3>Email</h3>
                                <p><a href="mailto:habetgabriel@gmail.com">habetgabriel@gmail.com</a></p>
                            </div>
                        </div>

                    </div>

                    <div className="form">
                        <div id="sendmessage">Your message has been sent. Thank you!</div>
                        <div id="errormessage"></div>
                            <form action="" method="post" role="form" className="contactForm" onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" id="name" placeholder="Your Name" pattern=".{3,}" required />
                                    <div className="validation"></div>
                                </div>
                                <div className="form-group col-md-6">
                                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} id="email" placeholder="Your Email" required/>
                                    <div className="validation"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                    <input type="text" className="form-control" name="subject" value={this.state.subject} onChange={this.handleChange} id="subject" placeholder="Subject" pattern=".{3,}" required/>
                                <div className="validation"></div>
                            </div>
                            <div className="form-group">
                                    <textarea className="form-control" name="message" value={this.state.message} onChange={this.handleChange} data-msg="Please write something for us" placeholder="Message" required> </textarea>
                            <div className="validation"></div>
                            </div>
                            <div className="text-center"><button type="submit">Send Message</button></div>
                        </form>
                    </div>

                    </div>
                </section>
            </div>
        );
    }
}
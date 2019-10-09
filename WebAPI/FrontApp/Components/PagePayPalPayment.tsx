import * as React from 'react';
import { Header } from './Header';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { Redirect } from 'react-router-dom'
import * as Translate from 'react-translate-component';
import en from './languages/en';
import it from './languages/it';
import ro from './languages/ro';

import PaypalExpressBtn from 'react-paypal-express-checkout';


var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');
var counterpart = require('counterpart');

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('ro', ro);
counterpart.registerTranslations('it', it);



export class PayPalPayment extends React.Component<any, any> {
    constructor(props) {
        super(props);

        counterpart.setLocale(read_cookie('lang'));
        this.state = {
            error: null,
            waitingResponse: false,
            isChanged: false,
            language: read_cookie('lang'),
            currency: read_cookie('currency'),
            cvc: '',
            expiry: '',
            focused: '',
            name: '',
            number: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
    }

    componentWillMount() {

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ isChanged: true });
    }

   

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.waitingResponse == false) {
            this.setState({ waitingResponse: true });
        }

        axios.post(API_Path + '/Orders', {
            userDetails: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                state: this.state.state,
                city: this.state.city,
                streetAddress: this.state.streetAddress,
                zipCode: this.state.zipCode,
                phone: this.state.phone
            },
            cartProducts: this.state.cartProducts,
            paymentMethod: this.state.paymentMethod,
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


    public reloadPage() {
        //do nothing
    }


    render() {
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            console.log("The payment was succeeded!", payment);
            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }

        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

        const client = {
            sandbox: 'YOUR-SANDBOX-APP-ID',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        return (
            <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        );
    }
}


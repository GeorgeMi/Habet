import * as React from 'react';
import { Header } from './Header';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
import 'react-notifications/lib/notifications.css';
import { Redirect } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link';
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

export class OrderHistory extends React.Component<any, any> {
    constructor(props) {
        super(props);

        counterpart.setLocale(read_cookie('lang'));
        this.state = {
            isLoaded: false,
            items: null,
            error: null,  
            waitingResponse: false,          
            language: read_cookie('lang'),
            currency: read_cookie('currency')
        };

        this.reloadPage = this.reloadPage.bind(this);
    }

    componentWillMount() {
        if (read_cookie('token') != null && read_cookie('token').length !== 0) {
            axios.get(API_Path + '/Orders',
                {
                    headers: {
                        token: read_cookie('token') //the token is a variable which holds the token
                    }
                })
                .then((response) => {
                    this.setState({ isLoaded: true, items: response.data.data });
                })
                .catch((error) => {
                    this.setState({ isLoaded: true, error });
                })
                .then();
        }
    }

    public reloadPage() {
        //do nothing
    }

    render() {
        const { error, isLoaded, waitingResponse, items, currency } = this.state;
        var currencyBeforeSign = '€';
        var currencyAfterSign = '';
        if (currency == 'RON') { currencyBeforeSign = ''; currencyAfterSign = 'RON' }
        else if (currency == 'GBP') { currencyBeforeSign = '₤'; currencyAfterSign = '' }

        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;
        }
        else if (read_cookie('token') == null || read_cookie('token').length == 0) {
            return <Redirect to='/#/' />;
        } else if (!isLoaded) {
            return (
                <main id="main">
                    {waitingResponse ? <div className="loading">Loading&#8230;</div> : <div></div>}

                    <div>
                        <Header reloadPage={this.reloadPage} />

                        <div className="hero-wrap page-title" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" }}>
                            <div className="row justify-content-center mb-3 pb-3">
                                <div className="col-md-12 heading-section text-center">
                                    <h1 className="mb-4"><Translate content='order.OrderHistory' /></h1>
                                </div>
                            </div>
                        </div>
                        <div className="loading">Loading&#8230;</div>;
                </div>
                </main>
            );
        } else {
            if (read_cookie('token') == null || read_cookie('token').length == 0) {
                return <Redirect to='/#/' />;
            }

            return (
                <main id="main">
                    <div>
                        <Header reloadPage={this.reloadPage} />

                        <div className="hero-wrap page-title" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" }}>
                            <div className="row justify-content-center">
                                <div className="col-md-12 heading-section text-center">
                                    <h1 className="mb-4"><Translate content={'order.OrderHistory'} /></h1>
                                </div>
                            </div>
                        </div>

                        <section className="ftco-section">
                            <div className="container">
                                <div className="justify-content-center">
                                    {
                                        items.map((item, i) => (
                                            <div key={i}>

                                                <div className="card">
                                                    <div className="card-header">
                                                        <Translate content='order.OrderNo' /> {item.OrderId}
                                                    </div>
                                                    <div className="card-body">
                                                        <p className="card-text"><Translate content='order.PlacedOn' />:  {item.Date} | <Translate content='order.Total' />: {item.Total}</p>
                                                        <div className="btn-group btn-group-justified">
                                                            <div className="btn btn-default" title="View">
                                                                <Link to={"/order/" + item.OrderId}><Translate content='order.OrderDetails' /></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            );
        }

    }
}
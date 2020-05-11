import * as React from 'react';
import { Header } from './Header';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
import { NotificationManager } from 'react-notifications';
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

export class OrderAdminHistory extends React.Component<any, any> {
    constructor(props) {
        super(props);

        counterpart.setLocale(read_cookie('lang'));
        this.state = {
            isLoaded: false,
            items: null,
            error: null,  
            waitingResponse: false,          
            language: read_cookie('lang'),
            currency: read_cookie('currency'),
            deliveredFilter: false
        };

        this.reloadPage = this.reloadPage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        if (read_cookie('token') != null && read_cookie('token').length !== 0) {
            axios.get(API_Path + '/Orders',
                {
                    headers: {
                        token: read_cookie('token') //the token is a variable which holds the token
                    },
                    params: {
                        deliveredFilter: this.state.deliveredFilter
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

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });

        if (read_cookie('token') != null && read_cookie('token').length !== 0) {
            axios.get(API_Path + '/Orders',
                {
                    headers: {
                        token: read_cookie('token') //the token is a variable which holds the token
                    },
                    params: {
                        deliveredFilter: event.target.value
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

    updateOrder(orderId: number) {
        if (read_cookie('token') != null && read_cookie('token').length !== 0) {
            axios.post(API_Path + '/EditOrders', {
                orderId: orderId,
                sent: true,
            }, {
                headers: {
                    token: read_cookie('token') //the token is a variable which holds the token
                }
            })
                .then((response) => {
                    NotificationManager.success(response.data.message);

                    window.location.reload();
                })
                .catch((error) => {
                    this.setState({ isLoaded: true, error });
                    NotificationManager.error("Request failed. Please, try again later.");
                })
                .then(() => {
                    this.setState({ waitingResponse: false });
                });
        }
    }

    render() {
        const { error, isLoaded, waitingResponse, items, currency, deliveredFilter } = this.state;
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

                        <div className="hero-wrap hero-bread" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" }}> }}>
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

                        <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                            <div className="container">
                                <div className="row no-gutters slider-text align-items-center justify-content-center">
                                    <div className="col-md-9 text-center">
                                        <h1 className="mb-0 bread"><Translate content='order.OrderHistory' /></h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="ftco-section">
                            <div className="container">
                                <div className="justify-content-center">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="deliveredFilter"><Translate content='order.ShowOrders' /></label>
                                            <div className="select-wrap">
                                                <select className="form-control" value={this.state.deliveredFilter} onChange={this.handleChange} name="deliveredFilter" id="deliveredFilter" required>
                                                    <Translate component="option" value="true" content='order.Delivered' />
                                                    <Translate component="option" value="false" content='order.NotDelivered' />
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                 
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

                                                        {
                                                            (deliveredFilter == false || deliveredFilter == 'false') &&
                                                            <div className="btn-group btn-group-justified">
                                                                <div className="btn btn-default" title="View">
                                                                    <a href="javascript:void(0)" className="add-to-cart text-center py-2 mr-1" onClick={() => this.updateOrder(item.OrderId)}><span><Translate content='order.OrderIsDelivered' /></span></a>
                                                                </div>
                                                            </div>
                                                        }
                                                        
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
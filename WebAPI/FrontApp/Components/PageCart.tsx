import * as React from 'react';
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
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

export class Cart extends React.Component<any, any>{

    constructor(props) {
        super(props);
        counterpart.setLocale(read_cookie('lang'));
        this.state = { isLoaded: false, items: null, error: null, cartProducts: null, subtotal: 0, total: 0, delivery: 0, language: read_cookie('lang'), currency: read_cookie('currency')  };

        this.updateTotal = this.updateTotal.bind(this);
        this.getQuantity = this.getQuantity.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeProductFromCart = this.removeProductFromCart.bind(this);     
        this.updateTotalAfterRemove = this.updateTotalAfterRemove.bind(this);  
        this.reloadPage = this.reloadPage.bind(this);
    }

    readCartFromCookie(cookie) {
        var cartProducts = new KeyedCollection<number>();
        for (var prop in cookie.items) {
            cartProducts.Add(parseInt(prop, 10), parseInt(cookie.items[prop], 10));
        }
        return cartProducts;
    }

    componentWillMount() {
        var cookie = read_cookie('cartProducts');
        if (cookie.length != 0) {
            var cartProducts = this.readCartFromCookie(cookie);
            this.setState({ cartProducts: cartProducts });

            if (cartProducts.Count() > 0) {
                axios.post(API_Path + '/ChartProducts',
                    {
                        productIds: cartProducts.Keys(),
                        lang: this.state.language,
                        currency: this.state.currency
                    })
                    .then((response) => {
                        this.setState({ isLoaded: true, items: response.data.data });
                        this.updateTotal();
                    })
                    .catch((error) => {
                        this.setState({ isLoaded: true, error });
                    })
                    .then();
            }
        }
    }

    handleChange(event) {
        var cartProducts = this.state.cartProducts;
        cartProducts.Remove([event.target.name]);
        cartProducts.Add([event.target.name], event.target.value);

        delete_cookie('cartProducts');
        bake_cookie('cartProducts', cartProducts);

        this.setState({ cartProducts: cartProducts });
        this.setState({ isChanged: true });

        this.updateTotal();
    }

    removeProductFromCart(productId) {
        var cartProducts = this.state.cartProducts;
        cartProducts.Remove(productId);      

        let filteredArray = this.state.items.filter(item => item.ProductId != productId)

        delete_cookie('cartProducts');
        bake_cookie('cartProducts', cartProducts);

        this.setState({ cartProducts: cartProducts, items: filteredArray });
        this.setState({ isChanged: true });

        this.updateTotalAfterRemove(productId);
    }

    updateTotal() {
        var subtotal = 0;
        var delivery = 0;
        var cartProducts = this.readCartFromCookie(read_cookie('cartProducts'));
        this.state.items.map((item, i) => (subtotal = subtotal + (item.Price * cartProducts.Item(item.ProductId))));

        this.setState({ delivery: 0, subtotal: subtotal, total: subtotal + delivery });
    }

    updateTotalAfterRemove(productId) {
        var subtotal = 0;
        var delivery = 0;
        var cartProducts = this.readCartFromCookie(read_cookie('cartProducts'));

        let filteredArray = this.state.items.filter(item => item.ProductId != productId)
        filteredArray.map((item, i) => (subtotal = subtotal + (item.Price * cartProducts.Item(item.ProductId))));

        this.setState({ items: filteredArray, delivery: 0, subtotal: subtotal, total: subtotal + delivery });
    }

    getQuantity(productId) {

        var cartProducts = this.readCartFromCookie(read_cookie('cartProducts'));
        return cartProducts.Item(productId);
    }

    public reloadPage() {
        window.location.reload(false);
    }

    render() {
        const { error, isLoaded, items, currency } = this.state;
        var currencyBeforeSign = '€';
        var currencyAfterSign = '';
        if (currency == 'lei') { currencyBeforeSign = ''; currencyAfterSign = 'lei' }
        else if (currency == 'pounds') { currencyBeforeSign = '₤'; currencyAfterSign = '' }

        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div></div>;
        } else {
            return (
                <div>
                    <Header Active={'Cart'} reloadPage={this.reloadPage} />

                    <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                        <div className="row justify-content-center mb-3 pb-3">
                            <div className="col-md-12 heading-section text-center">
                                <h1 className="mb-4"><Translate content='checkout.MyCart' /></h1>
                            </div>
                        </div>
                    </div>

                    <section className="ftco-section ftco-cart">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="cart-list">
                                        <table className="table">
                                            <thead className="thead-primary">
                                                <tr className="text-center">
                                                    <th>&nbsp;</th>
                                                    <th>&nbsp;</th>
                                                    <th><Translate content='checkout.Product' /></th>
                                                    <th><Translate content='checkout.Price' /></th>
                                                    <th><Translate content='checkout.Quantity' /></th>
                                                    <th><Translate content='checkout.Total' /></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    items.map((item, i) => (
                                                        <tr key={i} className="text-center">
                                                            <td className="product-remove"><span onClick={() => this.removeProductFromCart(item.ProductId)} className="ion-ios-close"></span></td>

                                                            <td className="image-prod"><img src={item.Image} className="img-fluid" alt="..." /></td>

                                                            <td className="product-name"><h3>{item.Name}</h3></td>

                                                            <td className="price">{currencyBeforeSign + " " + item.Price + " " + currencyAfterSign}</td>

                                                            <td className="quantity">
                                                                <div className="input-group mb-3">
                                                                    <input type="text" name={item.ProductId} className="quantity form-control input-number" value={this.getQuantity(item.ProductId)} min="1" max="100" onChange={this.handleChange} />
                                                                </div>
                                                            </td>

                                                            <td className="total">{currencyBeforeSign + " " + item.Price * this.getQuantity(item.ProductId)+ " " + currencyAfterSign}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-start">
                                <div className="col col-lg-5 col-md-6 mt-5 cart-wrap">
                                    <div className="cart-total mb-3">
                                        <h3>Cart Totals</h3>
                                        <p className="d-flex">
                                            <span><Translate content='checkout.Subtotal' /></span>
                                            <span>{currencyBeforeSign + " " + this.state.subtotal + " " + currencyAfterSign}</span>
                                        </p>
                                        <p className="d-flex">
                                            <span><Translate content='checkout.Delivery' /></span>
                                            <span>{currencyBeforeSign + " " + this.state.delivery + " " + currencyAfterSign}</span>
                                        </p>
                                        <hr />
                                        <p className="d-flex total-price">
                                            <span><Translate content='checkout.Total' /></span>
                                            <span>{currencyBeforeSign + " " + this.state.total + " " + currencyAfterSign}</span>
                                        </p>
                                    </div>
                                    <p className="text-center">
                                        <Link to={
                                            {
                                                pathname: "/checkout",
                                                subtotal:  this.state.subtotal,
                                                delivery:  this.state.delivery,
                                                total:  this.state.total 
                                            }
                                        } className="btn btn-primary py-3 px-4" ><Translate content='checkout.ProceedToCheckout' /></Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
    }
}
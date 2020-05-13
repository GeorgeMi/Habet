import * as React from 'react';
import { KeyedCollection } from './Dictionary';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { NotificationManager } from 'react-notifications';
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

export class SectionProducts extends React.Component<any, any>
{
    constructor(props) {
        super(props);

        counterpart.setLocale(read_cookie('lang'));
        this.state = { isLoaded: false, items: null, error: null, gender: props.Gender, type: props.Type, language: read_cookie('lang'), currency: read_cookie('currency')};

        this.addProductToCart = this.addProductToCart.bind(this);
        this.buyProduct = this.buyProduct.bind(this);      
    }
       
    componentWillMount() {
        axios.get(API_Path + '/Products',
            {
                params: {
                    top: 20,
                    from: 0,
                    gender: this.state.gender,
                    type: this.state.type,
                    lang: this.state.language,
                    currency: this.state.currency
                }
            })
            .then((response) => {
                this.setState({ isLoaded: true, items: response.data.data });
                if (null != this.props.setLoadedComponentsArray) {
                    this.props.setLoadedComponentsArray("SectionProducts" + this.state.gender + this.state.type, "true");
                    }
            })
            .catch((error) => {
                this.setState({ isLoaded: true, error });
            })
            .then();
    }

    readCartFromCookie(cookie) {
        var cartProducts = new KeyedCollection<number>();
        for (var prop in cookie.items) {
            cartProducts.Add(parseInt(prop, 10), cookie.items[prop]);
        }

        return cartProducts;
    }

    addProductToCart(productId: number, no: number, reloadPage: boolean) {
        if (read_cookie('token') == null || read_cookie('token').length == 0) {
            NotificationManager.info("Please login in order to add products to cart.");
        }
        else {

            var cookie = read_cookie('cartProducts');
            if (cookie.length == 0) {
                var cartProducts = new KeyedCollection<number>();
            }
            else {
                var cartProducts = this.readCartFromCookie(cookie);
                if (cartProducts.ContainsKey(productId)) {
                    no = no + cartProducts.Item(productId);
                    cartProducts.Remove(productId);
                }
            }

            cartProducts.Add(productId, no);
            delete_cookie('cartProducts');
            bake_cookie('cartProducts', cartProducts);

            this.setState({ state: this.state });

            if (reloadPage)
            {
                this.props.reloadPage();
            }
        }
    }

    buyProduct(productId: number) {
        if (read_cookie('token') == null || read_cookie('token').length == 0) {
            NotificationManager.info("Please login in order to add products to cart.");
        }
        else {
            this.addProductToCart(productId, 1, false);

            document.location.href = "/#/cart";
        }
    }

    render() {
        const { error, isLoaded, items, gender, type, currency } = this.state;
        var currencyBeforeSign = '€';
        var currencyAfterSign = '';
        if (currency == 'RON') { currencyBeforeSign = ''; currencyAfterSign = 'RON' }
        else if (currency == 'GBP') { currencyBeforeSign = '₤'; currencyAfterSign = ''}
       
        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div></div>;
        } else {         
            return (
                <div >

                    <div className="container">

                            <div className="jumbotron" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .5)), url('images/banner_" + gender + "_" + type+".jpg')" }}>
                                <div className="col-md-12 heading-section text-center" style={{ fontFamily: 'Brush Script St', opacity: 1 }}>
                                    {type == 'Bags' ? <h2 className="mb-4"><Translate content={'products.' + gender} /></h2> : <h2 className="mb-4" style={{ opacity: 0 }}><Translate content={'products.' + gender} /></h2>}
                                    <h2><Translate content={'products.' + type} /></h2>
                                </div>
                            </div>

                        <div className="row" >           
                            
                            {
                                items.map((item, i) => (

                                    <div key={i} className="col-lg-4 col-md-6 product-item filter-app wow fadeInUp">
                                        <div className="product d-flex flex-column">
                                            <a href={"/#/item/" + item.ProductId} className="img-prod"><img className="img-fluid" src={item.Image} alt="" style={{ width: '350px', height: '466px' }}/>
                                                <div className="overlay"></div>
                                            </a>
                                            <div className="text py-3 pb-4 px-3">
                                                <h3><a href={"/#/item/" + item.ProductId}>{item.Name}</a></h3>
                                                <div className="pricing">
                                                    <p className="price"><span>{currencyBeforeSign + " " + item.Price + " " + currencyAfterSign}</span></p>
                                                </div>
                                                <p className="bottom-area d-flex px-3">
                                                    <a href="javascript:void(0)" className="add-to-cart text-center py-2 mr-1" onClick={() => this.addProductToCart(item.ProductId, 1, true)}><span><Translate content="products.AddToCart" /><i className="ion-ios-add ml-1"></i></span></a>
                                                    <a href="javascript:void(0)" onClick={() => this.buyProduct(item.ProductId)} className="buy-now text-center py-2"><Translate content="products.BuyNow" /><span><i className="ion-ios-cart ml-1"></i></span></a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
               
                        </div>
                    </div>
                </div >
            );
        }
    }
}
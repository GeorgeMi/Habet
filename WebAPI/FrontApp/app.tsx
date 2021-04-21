import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import HttpsRedirect from 'react-https-redirect'

import { Home } from "./Components/PageHome";
import { Landing } from "./Components/PageLanding";
import { Contact } from './Components/PageContact';
import { Footer } from "./Components/Footer";
import { NotFound } from "./Components/PageNotFound";
import { Product } from "./Components/PageProduct";
import { Checkout } from "./Components/PageCheckout";
import { Search } from "./Components/PageSearch";
import { Cart } from "./Components/PageCart";
import { Register } from "./Components/PageRegister";
import { Verify } from "./Components/PageVerify";
import { RecoverPassword } from "./Components/PageRecoverPassword";
import { ResetPassword } from "./Components/PageResetPassword";
import { ChangePassword } from "./Components/PageChangePassword";
import { AddProduct } from "./Components/PageAddProduct";
import { UpdateUserDetails } from "./Components/PageUpdateUserDetails";
import { CookiePolicy } from "./Components/PageCookiePolicy";
import { OrderHistory } from "./Components/PageOrderHistory";
import { OrderAdminHistory } from "./Components/PageOrderAdminHistory";
import { Order } from "./Components/PageOrder";
import { CreditCardPayment } from "./Components/PageCreditCardPayment";
import { PrivacyPolicy } from "./Components/PagePrivacyPolicy";
import { TermsAndConditions } from "./Components/PageTermsAndConditions";


class App extends React.Component {
    render() {
        return (
            <HttpsRedirect>
     
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/home/:section" component={Home} />
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/item/:id" component={Product} />
                            <Route exact path="/contact" component={Contact} />
                            <Route exact path="/checkout" component={Checkout} />
                            <Route exact path="/search" component={Search} />
                            <Route exact path="/cart" component={Cart} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/cookie_policy" component={CookiePolicy} />
                            <Route exact path="/verify/:id" component={Verify} />
                            <Route exact path="/recover_password" component={RecoverPassword} />
                            <Route exact path="/reset_password/:id" component={ResetPassword} />
                            <Route exact path="/change_password" component={ChangePassword} />
                            <Route exact path="/user_details" component={UpdateUserDetails} />   
                            <Route exact path="/add_product" component={AddProduct} />   
                            <Route exact path="/add_product" component={AddProduct} />   
                            <Route exact path="/orders" component={OrderHistory} />     
                            <Route exact path="/admin_orders" component={OrderAdminHistory} />     
                            <Route exact path="/order/:id" component={Order} />   
                            <Route exact path="/card_payment" component={CreditCardPayment} />   
                            <Route exact path="/privacy_policy" component={PrivacyPolicy} />   
                            <Route exact path="/terms_and_conditions" component={TermsAndConditions} />    
                            <Route component={NotFound} />  
                        </Switch>
                        <Footer />
                    </div>
                </Router>

            </HttpsRedirect>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
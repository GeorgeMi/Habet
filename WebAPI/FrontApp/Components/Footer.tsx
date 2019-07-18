import * as React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export class Footer extends React.Component {
    render() {
        return (
             <footer id="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-3 col-md-6 footer-info">
                                <h4>GabrielHabet</h4>
                                <p>Butterfly Gabriel Habet is a fashion brand mainly known for its bag and belt designs for both women and men.</p>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><i className="ion-ios-arrow-right"></i> <a href="#">Home</a></li>
                                    <li><i className="ion-ios-arrow-right"></i> <Link to="#Women-section">Women</Link></li>
                                    <li><i className="ion-ios-arrow-right"></i> <Link to="#Men-section">Men</Link></li>
                                    <li><i className="ion-ios-arrow-right"></i> <a href="/#/contact">Contact</a></li>
                                    <li><i className="ion-ios-arrow-right"></i> <a href="/#/logIn">LogIn</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-contact">
                                <h4>Contact Us</h4>
                                <p>
                                    73 Somerfield Rd <br/>
                                    Manchester M9 8AQ<br/>
                                    United Kingdom <br />
                                    <strong>Phone:</strong> +44 161 258 2629<br/>
                                    <strong>Email:</strong> habetgabriel@gmail.com<br/>
                                </p>

                                <div className="social-links">
                                    <a href="#" className="twitter"><i className="fa fa-twitter"></i></a>
                                    <a href="https://www.facebook.com/butterflygabrielhabet/" className="facebook"><i className="fa fa-facebook"></i></a>
                                    <a href="#" className="instagram"><i className="fa fa-instagram"></i></a>
                                    <a href="#" className="google-plus"><i className="fa fa-google-plus"></i></a>
                                    <a href="https://www.linkedin.com/in/gabriel-habet-b27a9bba/" className="linkedin"><i className="fa fa-linkedin"></i></a>
                                </div>

                            </div>

                            <div className="col-lg-3 col-md-6 footer-newsletter">
                                <h4>Our Newsletter</h4>
                                <p>I would like to receive emails from GabrielHabet with updates and special offers of GabrielHabet. I can unsubscribe any time by clicking the unsubscribe link in the email.</p>
                                <form action="" method="post">
                                    <input type="email" name="email"/><input type="submit" value="Subscribe"/>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="copyright">
                        &copy; Made by <strong>George Miron</strong> © 2019. All Rights Reserved
                    </div>
                    <div className="credits"></div>
                </div>
            </footer>
        );
    }
}
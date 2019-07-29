import * as React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
export class Footer extends React.Component {
    render() {
        return (

            <footer className="ftco-footer ftco-section">
                <div className="container">
                    <div className="row">
                        <div className="mouse">
                            <a href="#" className="mouse-icon">
                                <div className="mouse-wheel"><span className="ion-ios-arrow-up"></span></div>
                            </a>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-3">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">GabrielHabet</h2>
                                <p>Butterfly Gabriel Habet is a fashion brand mainly known for its bag and belt designs for both women and men.</p>
                                <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                                    <li className="ftco-animate"><a href="#"><span className="icon-twitter"></span></a></li>
                                    <li className="ftco-animate"><a href="https://www.facebook.com/butterflygabrielhabet/"><span className="icon-facebook"></span></a></li>
                                    <li className="ftco-animate"><a href="#"><span className="icon-instagram"></span></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="ftco-footer-widget mb-4 ml-md-5">
                                <h2 className="ftco-heading-2">Menu</h2>
                                <ul className="list-unstyled">
                                    <li><a href="/" className="py-2 d-block">Home</a></li>
                                    <li><Link to="#Women-section" className="py-2 d-block">Women</Link></li>
                                    <li><Link to="#Men-section" className="py-2 d-block">Men</Link></li>
                                    <li><a href="/#/contact" className="py-2 d-block">Contact</a></li>
                                    <li><a href="/#/logIn" className="py-2 d-block">LogIn</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Contact Us</h2>
                                <div className="d-flex">
                                    <p>
                                        73 Somerfield Rd <br />
                                        Manchester M9 8AQ<br />
                                        United Kingdom <br />
                                        <strong>Phone:</strong> +44 161 258 2629<br />
                                        <strong>Email:</strong> habetgabriel@gmail.com<br />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Our Newsletter</h2>
                                <div className="block-23 mb-3">
                                    <p>I would like to receive emails from GabrielHabet with updates and special offers of GabrielHabet. I can unsubscribe any time by clicking the unsubscribe link in the email.</p>
                                    <form action="" method="post">
                                        <div className="input-group">
                                            <input type="email" name="email" />
                                            <span className="input-group-btn">
                                                <button className="btn btn-info">Subscribe</button>
                                            </span>
                                        </div>
                                    </form>                                 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                             <div className="copyright">
                                &copy; Made by <strong>George Miron</strong> © 2019. All Rights Reserved
                             </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
import * as React from 'react';
import { Header } from './Header';

export class NotFound extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <br />
                <br />
                <br />
                <section id="contact" className="section-bg wow fadeInUp">
                    <div className="container">
                        <div className="section-header">
                            <h3>ARE YOU HAPPY NOW?</h3>
                            <p>Just kidding! Our bad.</p>
                            <p>404 NOT FOUND</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
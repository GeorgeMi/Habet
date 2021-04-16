import * as React from 'react';
import { Header } from './Header';

export class NotFound extends React.Component {
    constructor(props) {
        super(props);

        this.reloadPage = this.reloadPage.bind(this);
    }

    public reloadPage() {
        //do nothing
    }

    render() {
        return (
            <div>
                <Header />
                <section className="ftco-section contact-section bg-light">
                    <div className="container">
                        <div className="bg-white p-5" style={{ textAlign: 'justify' }}>
                            <div className="row justify-content-center mb-3 pb-3">
                                <div className="col-md-12 heading-section text-center">
                                    <h2 className="mb-4">ARE YOU HAPPY NOW?</h2>
                                    <h5>Just kidding! Our bad. 404 NOT FOUND</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
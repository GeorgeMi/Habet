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
                <Header reloadPage={this.reloadPage}/>
                <div className="hero-wrap page-title" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" }}>
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-12 text-center">
                            <h1 className="mb-0 bread">ARE YOU HAPPY NOW?</h1>
                            <h5>Just kidding! Our bad. 404 NOT FOUND</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
﻿import * as React from 'react';
import { Header } from './Header';

export class NotFound extends React.Component {
    constructor(props) {
        super(props);

        this.langaugeChanged = this.langaugeChanged.bind(this);
    }

    public langaugeChanged() {
        //do nothing
    }

    render() {
        return (
            <div>
                <Header langaugeChanged={this.langaugeChanged}/>
                <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('images/background.jpg')" }}>
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-9 text-center">
                            <h1 className="mb-0 bread">ARE YOU HAPPY NOW?</h1>
                            <h5>Just kidding! Our bad. 404 NOT FOUND</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
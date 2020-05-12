import * as React from 'react';
import { KeyedCollection } from './Dictionary';
import { Header } from './Header';
import { NotificationManager } from 'react-notifications';
import { Redirect } from 'react-router-dom'

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');

export class Verify extends React.Component<any, any>
{
    constructor(props) {
        super(props);

        var dictionary = new KeyedCollection<string>();
        this.state = { isLoaded: false, item: null, error: null, imageDictionary: dictionary, token: props.match.params.id };

        this.reloadPage = this.reloadPage.bind(this);
    }

    componentWillMount() {
        axios.get(API_Path + '/Auth/' + this.state.token)
            .then((response) => {
                this.setState({ isLoaded: true });
                NotificationManager.success(response.data.message);
            })
            .catch((error) => {
                this.setState({ isLoaded: true, error });
            })
            .then();
    }

    public reloadPage() {
        //do nothing
    }

    render() {
        const { error, isLoaded, item } = this.state;
        if (error) {
            return (
                <div>
                    <Header reloadPage={this.reloadPage}/>
                    <div className="hero-wrap" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" }}>
                        <div className="row no-gutters slider-text align-items-center justify-content-center">
                            <div className="col-md-9 text-center">
                                <h1 className="mb-0 bread">ARE YOU HAPPY NOW?</h1>
                                <h5>Just kidding! Our bad. 404 NOT FOUND</h5>
                            </div>
                        </div>
                    </div>
                </div>
            );

        } else if (!isLoaded) {
            return <div className="loading">Loading&#8230;</div>;

        } else {
            return <Redirect to='/#/' />;
        }
    }
}
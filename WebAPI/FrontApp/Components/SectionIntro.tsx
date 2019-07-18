import * as React from 'react';
import { KeyedCollection } from './Dictionary';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');

export class SectionIntro extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = { isLoaded: false, items: null, error: null };
    }

    componentWillMount() {
        axios.get(API_Path + '/Products',
            {
                params: {
                    top: 20,
                    from: 0
                }
            })
            .then((response) => {
                this.setState({ isLoaded: true, items: response.data });
            })
            .catch((error) => {
                this.setState({ isLoaded: true, error });
            })
            .then();
    }
    render() {
        const { error, isLoaded, items} = this.state;
        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;

        } else if (!isLoaded) {
            return <div>Loading...</div>;

        } else {
            var activeDictionary = new KeyedCollection<string>();
            
            items.map((item, i) => (
                activeDictionary.Add(i, "")
            ));
            activeDictionary.Add(0, "active");

            return (
                <section id="intro">
                    <div className="intro-container">
                        <div id="introCarousel" className="carousel  slide carousel-fade" data-ride="carousel">

                            <ol className="carousel-indicators"></ol>

                            <div className="carousel-inner" role="listbox">
                                {
                                    items.map((item, i) => (
                                        <div key={i} className={activeDictionary.Item(i) + " carousel-item"}>
                                            <div className="carousel-background"><img src={item.image} alt="" /></div>
                                            <div className="carousel-container">
                                                <div className="carousel-content">
                                                    <h2>{item.name}</h2>
                                                    <p>$ {item.price}</p>
                                                    <a href="#featured-services" className="btn-get-started scrollto">Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <a className="carousel-control-prev" href="#introCarousel" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon ion-chevron-left" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>

                            <a className="carousel-control-next" href="#introCarousel" role="button" data-slide="next">
                                <span className="carousel-control-next-icon ion-chevron-right" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>

                        </div>
                    </div>
                </section>
            );
        }
    }
}
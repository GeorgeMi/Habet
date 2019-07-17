import * as React from 'react';
import { KeyedCollection } from './Dictionary';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');


export class SectionProducts extends React.Component<any, any>
{
     constructor(props)
     {
        super(props);

         var dictionary = new KeyedCollection<string>();
         this.state = { isLoaded: false, items: null, error: null, imageDictionary: dictionary, gender: props.Gender, type: props.Type, needsTitle: props.NeedsTitle };  

         this.getImageForProduct = this.getImageForProduct.bind(this);
     }

    componentWillMount()
    {
       axios.get(API_Path + '/Products',
            {
            params: {
                top: 20,
                from: 0
            }
        })
            .then((response) =>
            {
                var dictionary = this.state.imageDictionary;
                this.setState({ isLoaded: true, items: response.data, imageDictionary: dictionary });

                response.data.map(item => (this.getImageForProduct(item.productId)));         
            })
            .catch((error) =>
            {
                this.setState({ isLoaded: true, error });
            })
            .then();      
    }

    getImageForProduct(productId) {
        axios.get(API_Path + '/ProductsImages/' + productId)
            .then((response) => {

                var dictionary = this.state.imageDictionary;
                dictionary.Add(productId, response.data);

                this.setState({imageDictionary: dictionary});
            }).catch(err => {
                console.log(productId + " .... " + this.state.imageDictionary);
                //console.log(err);        
            })
    }

    render() {
        const { error, isLoaded, items, imageDictionary, gender, type, needsTitle  } = this.state;
        if (error)
        {
            console.log(error);
            return <div>Error: {error.message}</div>;

        } else if (!isLoaded)
        {
            return <div>Loading...</div>;

        } else
        {

            if (needsTitle == 'True') {
                return (
                    <section id={gender+"-"+type+"-section"} className="portfolio section-bg">
                        <div className="container">

                            <header className="section-header" id={gender + "-section"}>
                                <h3 className="section-title" > {gender} </h3>
                            </header>
                            <header className="section-header">
                                <h5 className="section-title">{type}</h5>
                            </header>

                            <div className="row portfolio-container">
                                {
                                    items.map((item, i) => (

                                        <div key={i} className="col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp">
                                            <div className="portfolio-wrap">
                                                <figure>
                                                    <img src={imageDictionary.Item(item.productId)} className="img-fluid" alt="" />
                                                    <a href={imageDictionary.Item(item.productId)} data-lightbox="portfolio" data-title={item.name} className="link-preview" title="Preview"><i className="ion ion-eye"></i></a>
                                                    <a href="#" className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>
                                                </figure>

                                                <div className="portfolio-info">
                                                    <h4><a href="#">{item.name}</a></h4>
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </section>
                );
            }
            else {
                return (
                    <section id={gender + "-" + type + "-section"} className="portfolio section-bg">
                        <div className="container">
                            <header className="section-header">
                                <h5 className="section-title">{type}</h5>
                            </header>

                            <div className="row portfolio-container">
                                {
                                    items.map((item, i) => (

                                        <div key={i} className="col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp">
                                            <div className="portfolio-wrap">
                                                <figure>
                                                    <img src={imageDictionary.Item(item.productId)} className="img-fluid" alt="" />
                                                    <a href={imageDictionary.Item(item.productId)} data-lightbox="portfolio" data-title={item.name} className="link-preview" title="Preview"><i className="ion ion-eye"></i></a>
                                                    <a href="#" className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>
                                                </figure>

                                                <div className="portfolio-info">
                                                    <h4><a href="#">{item.name}</a></h4>
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </section>
                );
            }
        }
    }
}
import * as React from 'react';

var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');


export class SectionProducts extends React.Component<any, any>
{
    constructor(props) {
        super(props);

        this.state = { isLoaded: false, items: null, error: null, gender: props.Gender, type: props.Type };
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
        const { error, isLoaded, items } = this.state;
        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;

        } else if (!isLoaded) {
            return <div>Loading...</div>;

        } else {
            return (
                <div className="row product-container">
                    {
                        items.map((item, i) => (

                            <div key={i} className="col-lg-4 col-md-6 product-item filter-app wow fadeInUp">
                                <div className="product-wrap">
                                    <figure>
                                        <img src={item.image} className="img-fluid" alt="" />
                                        <a href={item.image} data-lightbox={item.name + item.productId}  data-title={item.name} data-footer={"$ " + item.price} className="link-preview" title="Preview"><i className="ion ion-eye"></i></a>
                                        <a href={"/#/item/" + item.productId} className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>                               
                                    </figure>

                                    <div className="product-info">
                                        <h4><a href={"/#/item/" + item.productId}>{item.name}</a></h4>
                                        <p>$ {item.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            );
        }
    }
}
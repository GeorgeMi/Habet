declare var require: any

var React = require('react');
var config = require('config');
var API_Path = config.API_Path;
const axios = require('axios');

export class SectionPortfolio extends React.Component{
    api_response = { isLoaded: null, items: null, error:null };
    constructor(props) {
        super(props); 
        this.state = { isLoaded: false, items: null, error: null };
    }

    componentWillMount () {
        var self = this;

        axios.get(API_Path + '/Products', {
            params: {
                ID: 1
            }
        })
            .then((response) => {
                console.log(response);
                 this.setState({ isLoaded: true, items: response });
               // this.api_response = { isLoaded: true, items: response.data, error: null };
            })
            .catch((error) => {
                console.log(error);
                this.setState({ isLoaded: true, error });
              //  this.api_response = { isLoaded: true, items: null, error: error };
            })
            .then(
               // this.setState({this.api_response)
            );

     //   console.log(this.api_response);
    }

    render() {
        
        const { error, isLoaded, items } = this.state;
        console.log('ok');
        if (error) {
            console.log(error);
            return <div>Error: {error.message}</div>;

        } else if (!isLoaded) {
            console.log('loading');
            return <div>Loading...</div>;

        } else {      
            console.log('ok2');
             return (
                <section id="portfolio" className="section-bg">
                    <div className="container">

                        <header className="section-header">
                            <h3 className="section-title">Our Portfolio</h3>
                        </header>

                        <div className="row">
                            <div className="col-lg-12">
                                <ul id="portfolio-flters">
                                    <li data-filter="*" className="filter-active">All</li>
                                    <li data-filter=".filter-app">App</li>
                                    <li data-filter=".filter-card">Card</li>
                                    <li data-filter=".filter-web">Web</li>
                                </ul>
                            </div>
                        </div>

                        <div className="row portfolio-container">

                             {items.map(item => (

                                 <div className="col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp">
                                     <div className="portfolio-wrap">
                                         <figure>
                                             <img src="img/portfolio/app1.jpg" className="img-fluid" alt="" />
                                             <a href="img/portfolio/app1.jpg" data-lightbox="portfolio" data-title="App 1" className="link-preview" title="Preview"><i className="ion ion-eye"></i></a>
                                             <a href="#" className="link-details" title="More Details"><i className="ion ion-android-open"></i></a>
                                         </figure>

                                         <div className="portfolio-info">
                                             <h4><a href="#">App 1</a></h4>
                                             <p>App</p>
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
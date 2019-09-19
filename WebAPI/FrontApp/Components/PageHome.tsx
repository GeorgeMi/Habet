import * as React from 'react';
import { SectionProducts } from "./SectionProducts";
import { SectionIntro } from "./SectionIntro";
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import * as Translate from 'react-translate-component';
import en from './languages/en';
import it from './languages/it';
import ro from './languages/ro';

var counterpart = require('counterpart');

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('ro', ro);
counterpart.registerTranslations('it', it);

export class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = { loadedComponentsDictionary: null };
        this.setLoadedComponentsArray = this.setLoadedComponentsArray.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
    }

   public setLoadedComponentsArray(component: string, loaded: string) {

        var dictionary = this.state.loadedComponentsDictionary;
        if (null == dictionary) {
            dictionary = new KeyedCollection<string>();
        }
        dictionary.Add(component, loaded);
        this.setState({loadedComponentsDictionary: dictionary});
    }

    public reloadPage() {
        window.location.reload(false);
    }
   
    render() {
        var hideLoader = false;
        if (this.state.loadedComponentsDictionary != null && this.state.loadedComponentsDictionary.Count() == 4) {
            hideLoader = true;
        }
        
        return (
            <main id="main">
                {   hideLoader ? <div></div> : <div className="loading">Loading&#8230;</div> }

                <div>
                    <Header Active={'Home'} reloadPage={this.reloadPage}  />

                    <SectionIntro />

                    <section className="ftco-section-2 bg-light">  
                        <div className="container">           
                            <div className="row">
                                <div className="offset-1 col-md-10">
                                    <div className="text-deal" style={{ opacity: 1, fontStyle: 'italic', textAlign: 'justify' }}>
                                        <Translate component="h5" content='intro.P1' />
                                        <Translate component="h5" content='intro.P2' />
                                        <Translate component="h5" content='intro.P3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="ftco-section bg-light">                     
                        <SectionProducts Gender={'Women'} Type={'Bags'} setLoadedComponentsArray={this.setLoadedComponentsArray} />

                        <SectionProducts Gender={'Women'} Type={'Belts'} setLoadedComponentsArray={this.setLoadedComponentsArray} />

                        <SectionProducts Gender={'Men'} Type={'Bags'} setLoadedComponentsArray={this.setLoadedComponentsArray} />

                        <SectionProducts Gender={'Men'} Type={'Belts'} setLoadedComponentsArray={this.setLoadedComponentsArray} />
                    </section>
                </div>
            </main>);       
    }
}
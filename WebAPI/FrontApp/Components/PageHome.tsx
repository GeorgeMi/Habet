import * as React from 'react';
import { Suspense } from 'react';
const SectionProducts = React.lazy(() => import("./SectionProducts").then(m => ({ default: m.SectionProducts })));
import ScrollableAnchor from "react-scrollable-anchor";
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
        this.minimizeDescription = this.minimizeDescription.bind(this);
        this.maximizeDescription = this.maximizeDescription.bind(this);

        console.log(this.props.match.params.section);
    }

   public setLoadedComponentsArray(component: string, loaded: string) {

        var dictionary = this.state.loadedComponentsDictionary;
        if (null == dictionary) {
            dictionary = new KeyedCollection<string>();
        }
        dictionary.Add(component, loaded);
       this.setState({ loadedComponentsDictionary: dictionary });     
    }

    public reloadPage() {
        window.location.reload(false);
    }

    minimizeDescription() {
        document.getElementById('intro-short-description').className = "text-deal short-description";
        document.getElementById('intro-full-description').className = "text-deal hide-description";
    }

    maximizeDescription() {
        document.getElementById('intro-short-description').className = "text-deal short-description hide-description";
        document.getElementById('intro-full-description').className = "text-deal";
    }
   
    render() {
        var hideLoader = false;
        if (this.state.loadedComponentsDictionary != null && this.state.loadedComponentsDictionary.Count() == 4) {
            hideLoader = true;

            if (this.props.match.params.section != null) {
                const element = document.getElementById(this.props.match.params.section);
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        return (
            <main id="main">
                {hideLoader ? <div></div> : <div className="loading">Loading&#8230;</div>}

                <div>
                    <Header Active={'Home'} reloadPage={this.reloadPage} />

                    <SectionIntro />

                    <section className="ftco-section bg-light">
                        <Suspense fallback={<div>Loading...</div>}> 

                            <div id="women">

                                <div id="women-bags">
                                    <SectionProducts Gender={'Women'} Type={'Bags'} reloadPage={this.reloadPage} setLoadedComponentsArray={this.setLoadedComponentsArray}/>
                                 </div>

                                <div id="women-accessories">
                                    <SectionProducts Gender={'Women'} Type={'Accessories'} reloadPage={this.reloadPage} setLoadedComponentsArray={this.setLoadedComponentsArray}/>
                                </div>

                            </div>

                            <div id="men">
                            
                                <div id="men-bags">
                                    <SectionProducts Gender={'Men'} Type={'Bags'} reloadPage={this.reloadPage} setLoadedComponentsArray={this.setLoadedComponentsArray}/>
                                </div>

                                <div id="men-accessories">
                                    <SectionProducts Gender={'Men'} Type={'Accessories'} reloadPage={this.reloadPage} setLoadedComponentsArray={this.setLoadedComponentsArray}/>
                                </div>

                            </div>

                        </Suspense>
                    </section>
                </div>
            </main>);
    }
}
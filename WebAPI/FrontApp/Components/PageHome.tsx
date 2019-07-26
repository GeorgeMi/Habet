import * as React from 'react';
import { SectionProducts } from "./SectionProducts";
import { SectionIntro } from "./SectionIntro";
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';
import { NotificationContainer } from 'react-notifications';


export class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = { loadedComponentsDictionary: null };
        this.setLoadedComponentsArray = this.setLoadedComponentsArray.bind(this);
    }

   public setLoadedComponentsArray(component: string, loaded: string) {

        var dictionary = this.state.loadedComponentsDictionary;
        if (null == dictionary) {
            dictionary = new KeyedCollection<string>();
        }
        dictionary.Add(component, loaded);
        this.setState({loadedComponentsDictionary: dictionary});
    }

    render() {
       // console.log(this.state.loadedComponentsDictionary);
        var hideLoader = false;
        if (this.state.loadedComponentsDictionary != null && this.state.loadedComponentsDictionary.Count() == 4) {
            hideLoader = true;
        }
        
        return (
            <main id="main">
                {   hideLoader ? <div></div> : <div className="loading">Loading&#8230;</div> }

                <NotificationContainer />

                <div>
                    <Header Active={'Home'} />

                    <SectionIntro />

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
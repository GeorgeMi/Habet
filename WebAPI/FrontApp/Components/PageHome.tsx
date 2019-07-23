import * as React from 'react';
import { SectionProducts } from "./SectionProducts";
import { SectionIntro } from "./SectionIntro";
import { Header } from './Header';
import { KeyedCollection } from './Dictionary';


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
        console.log(this.state.loadedComponentsDictionary);
        if (this.state.loadedComponentsDictionary != null && this.state.loadedComponentsDictionary.Count() == 4) {
            console.log("ok");
        }
        else {
            console.log("nope");
        }      
            return (
                <main id="main">
                    <div>
                        <Header Active={'Home'} />

                        <SectionIntro />

                        <section className="ftco-section bg-light">
                            <div className="container">
                                <div className="row justify-content-center mb-3 pb-3">
                                    <div className="col-md-12 heading-section text-center">
                                        <h2 className="mb-4" id="Women-section">Women</h2>
                                        <p id="Women-Bags-section">Bags</p>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <SectionProducts Gender={'Women'} Type={'Bags'} setLoadedComponentsArray={this.setLoadedComponentsArray} />
                            </div>

                            <div className="container">
                                <div className="row justify-content-center mb-3 pb-3">
                                    <div className="col-md-12 heading-section text-center">
                                        <p id="Women-Belts-section">Belts</p>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <SectionProducts Gender={'Women'} Type={'Belts'} setLoadedComponentsArray={this.setLoadedComponentsArray} />
                            </div>

                            <div className="container">
                                <div className="row justify-content-center mb-3 pb-3">
                                    <div className="col-md-12 heading-section text-center">
                                        <h2 className="mb-4" id="Men-section">Men</h2>
                                        <p id="Men-Bags-section">Bags</p>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <SectionProducts Gender={'Men'} Type={'Bags'} setLoadedComponentsArray={this.setLoadedComponentsArray} />
                            </div>

                            <div className="container">
                                <div className="row justify-content-center mb-3 pb-3">
                                    <div className="col-md-12 heading-section text-center">
                                        <p id="Men-Belts-section">Belts</p>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <SectionProducts Gender={'Men'} Type={'Belts'} setLoadedComponentsArray={this.setLoadedComponentsArray} />
                            </div>
                        </section>
                    </div>
                </main>);
        
    }
}
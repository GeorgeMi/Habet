import * as React from 'react';
import { SectionProducts } from "./SectionProducts";
import { SectionIntro } from "./SectionIntro";
import { Header } from './Header';


export class Home extends React.Component {
    render() {
        return (
            <main id="main">
                <div>
                    <Header Active={'Home'} />

                    <SectionIntro />

                    <section className="ftco-section bg-light">
                        <div className="container">
                            <div className="row justify-content-center mb-3 pb-3">
                                <div className="col-md-12 heading-section text-center ftco-animate">
                                    <h2 className="mb-4" id="Women-section">Women</h2>
                                    <p id="Women-Bags-section">Bags</p>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <SectionProducts Gender={'Women'} Type={'Bags'} />
                        </div>

                        <div className="container">
                            <div className="row justify-content-center mb-3 pb-3">
                                <div className="col-md-12 heading-section text-center ftco-animate">
                                    <p id="Women-Belts-section">Belts</p>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <SectionProducts Gender={'Women'} Type={'Belts'} />
                        </div>

                        <div className="container">
                            <div className="row justify-content-center mb-3 pb-3">
                                <div className="col-md-12 heading-section text-center ftco-animate">
                                    <h2 className="mb-4" id="Men-section">Men</h2>
                                    <p id="Men-Bags-section">Bags</p>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <SectionProducts Gender={'Men'} Type={'Bags'} />
                        </div>

                        <div className="container">
                            <div className="row justify-content-center mb-3 pb-3">
                                <div className="col-md-12 heading-section text-center ftco-animate">
                                    <p id="Men-Belts-section">Belts</p>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <SectionProducts Gender={'Men'} Type={'Belts'} />
                        </div>
                    </section>
                </div>
            </main>
        );

    }
}
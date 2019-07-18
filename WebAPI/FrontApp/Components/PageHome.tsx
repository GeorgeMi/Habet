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
                    <section className="product section-bg">
                        <div className="container">
                            <header className="section-header" id="Women-section">
                                <h3 className="section-title" > Women </h3>
                            </header>
                            <section id="Women-Bags-section">
                                <header className="section-header">
                                    <h5 className="section-title">Bags</h5>
                                </header>
                                <SectionProducts Gender={'Women'} Type={'Bags'} />
                            </section>
                            <section id="Women-Belts-section">
                                <header className="section-header">
                                    <h5 className="section-title">Belts</h5>
                                </header>
                                <SectionProducts Gender={'Women'} Type={'Belts'} />
                            </section>
                            <header className="section-header" id="Men-section">
                                <h3 className="section-title" > Men </h3>
                            </header>
                            <section id="Men-Bags-section">
                                <header className="section-header">
                                    <h5 className="section-title">Bags</h5>
                                </header>
                                <SectionProducts Gender={'Men'} Type={'Bags'}/>
                            </section>
                            <section id="Men-Belts-section">
                                <header className="section-header">
                                    <h5 className="section-title">Belts</h5>
                                </header>
                                <SectionProducts Gender={'Men'} Type={'Belts'}/>
                            </section>
                        </div>
                    </section>
                </div>
            </main>
        );

    }
}
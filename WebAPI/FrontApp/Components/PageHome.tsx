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
                    <SectionProducts />
                    <SectionProducts />
                </div>
            </main>
        );

    }
}
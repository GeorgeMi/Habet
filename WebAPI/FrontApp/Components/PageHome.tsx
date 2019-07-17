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
                    <SectionProducts Gender={'Women'} Type={'Bags'} NeedsTitle= {'True'} />
                    <SectionProducts Gender={'Women'} Type={'Belts'} NeedsTitle= {'False'} />
                    <SectionProducts Gender={'Men'} Type={'Bags'} NeedsTitle= {'True'} />
                    <SectionProducts Gender={'Men'} Type={'Belts'} NeedsTitle= {'False'} />
                </div>
            </main>
        );

    }
}
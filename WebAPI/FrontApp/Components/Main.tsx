import * as React from 'react';
import { SectionAboutUs } from './SectionAboutUs'
import { SectionCallToAction } from "./SectionCallToAction";
import { SectionContact } from "./SectionContact";
import { SectionFacts } from "./SectionFacts";
import { SectionFeaturedServices } from "./SectionFeaturedServices";
import { SectionPortfolio } from "./SectionPortfolio";
import { SectionServices } from "./SectionServices";
import { SectionSkills } from "./SectionSkills";


export class Main extends React.Component {
    render() {
        return (
            <main id="main">
                <div>
                    <SectionFeaturedServices />
                    <SectionAboutUs />
                    <SectionServices />
                    <SectionCallToAction />
                    <SectionSkills />
                    <SectionFacts />
                    <SectionPortfolio />
                    <SectionContact />
                </div>
            </main>
        );

    }
}
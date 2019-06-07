declare var require: any

import { SectionAboutUs } from './SectionAboutUs'
import { SectionCallToAction } from "./SectionCallToAction";
import { SectionContact } from "./SectionContact";
import { SectionFacts } from "./SectionFacts";
import { SectionFeaturedServices } from "./SectionFeaturedServices";
import { SectionPortfolio } from "./SectionPortfolio";
import { SectionServices } from "./SectionServices";
import { SectionSkills } from "./SectionSkills";

var React = require('react');

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
                    <SectionFacts />
                    <SectionPortfolio />
                    <SectionContact />
                </div>
            </main>
        );

    }
}
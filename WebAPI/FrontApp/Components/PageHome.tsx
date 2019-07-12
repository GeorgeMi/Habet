import * as React from 'react';
import { SectionAboutUs } from './SectionAboutUs'
import { SectionCallToAction } from "./SectionCallToAction";
import { SectionFacts } from "./SectionFacts";
import { SectionFeaturedServices } from "./SectionFeaturedServices";
import { SectionProducts } from "./SectionProducts";
import { SectionServices } from "./SectionServices";
import { SectionSkills } from "./SectionSkills";
import { SectionIntro } from "./SectionIntro";


export class Home extends React.Component {
    render() {
        return (
            <main id="main">
                <div>
                    <SectionIntro />
                    <SectionFeaturedServices />
                    <SectionAboutUs />
                    <SectionServices />
                    <SectionCallToAction />
                    <SectionSkills />
                    <SectionFacts />
                    <SectionProducts />
                </div>
            </main>
        );

    }
}
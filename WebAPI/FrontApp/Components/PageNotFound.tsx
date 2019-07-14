import * as React from 'react';
import { Header } from './Header';
import { SectionServices } from "./SectionServices";
import { SectionSkills } from "./SectionSkills";
import { SectionAboutUs } from './SectionAboutUs'
import { SectionCallToAction } from "./SectionCallToAction";
import { SectionFacts } from "./SectionFacts";
import { SectionFeaturedServices } from "./SectionFeaturedServices";

export class NotFound extends React.Component {
    render() {
        return (          
            <div>
                <Header />
                <br />
                <br />
                <h2>ARE YOU HAPPY NOW?</h2>
                <h3>Just kidding! Our bad.</h3>
                <br />
                <h1>404 NOT FOUND</h1>
                <br />
                <br />
                <br />
                <SectionFeaturedServices />
                <SectionAboutUs />
                <SectionServices />
                <SectionCallToAction />
                <SectionSkills />
                <SectionFacts />
            </div>
        );

    }
}
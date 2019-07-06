import * as React from 'react';
import { Header } from './Header';
import { Intro } from "./Intro";
import { Main } from "./Main";
import { Footer } from "./Footer";

export class Layout extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Header />
                <Intro />
                <Main />
                <Footer />
            </div>
        )

    }
}
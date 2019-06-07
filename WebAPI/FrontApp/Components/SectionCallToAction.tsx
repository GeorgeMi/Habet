﻿declare var require: any

var React = require('react');

export class SectionCallToAction extends React.Component {
    render() {
        return (
            <section id="call-to-action" class="wow fadeIn">
                <div class="container text-center">
                    <h3>Call To Action</h3>
                    <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <a class="cta-btn" href="#">Call To Action</a>
                </div>
            </section>
        );

    }
}
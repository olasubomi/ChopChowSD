import React, { Component } from 'react';
import { Slot } from 'react-page-layout';
 
class PublicLayout extends Component {
    render() {
        return (
            <div>
                <header>Page Header</header>
                <Slot name="main"> View published meals</Slot>
                <Slot name="meals"  style={{ margin: 0 }} component="div"> default meal content</Slot>
                <Slot name="ingredients" style={{ margin: 40 }} > default ingredients content</Slot>
                <footer>Page Footer</footer>
            </div>
        );
    }
}
export default PublicLayout;
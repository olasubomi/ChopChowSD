// import { Page, Section } from 'react-page-layout';
import React, { Component } from 'react';

class MealsSection extends Component {
    getMealsList = () =>{
        let meals = ["Garri", "Rice"];
        let mealsListed = [];
        for(let i = 0 ; i < meals.length; i++){
            mealsListed.push(<li>{meals[i]}</li>);
        }
        return <ul>{mealsListed}</ul>;
    }

    render() {
        return this.getMealsList();
    }
}

export default MealsSection;


import React from 'react';

class RecipesMenu extends React.Component {
    render(){
        return(
            <div>
                <select className="form-control" onChange={this.props.setYear}>
                    <option value="year">Recipe...</option>
                    <option value='2019'>Garri</option>
                    <option value='2018'>Rice</option>
                </select>
            </div>
        );
    }
}

export default RecipesMenu;
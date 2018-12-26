import React from 'react';
import MakeOption from './MakeOption';

class IngredientsMenu extends React.Component {
    render(){
        return(
            <div>
                {/* <select className="form-control" onChange={this.props.setMake} > */}
                    {/* <option value='make'>Make...</option> */}
                    {Object.keys(this.props.selected.ingredients).map(key => <MakeOption
                        key={key}
                        value={key}
                    />)}
                {/* </select> */}
            </div>
        );
    }
}

export default IngredientsMenu

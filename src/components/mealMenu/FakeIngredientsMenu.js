import React from 'react';

class FakeIngredientsMenu extends React.Component {
    render(){
        return(
            <div>
                <select className="form-control" disabled>
                    <option value='make'>Make...</option>
                </select>
            </div>
        );
    }
}

export default FakeIngredientsMenu;
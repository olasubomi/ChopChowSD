import React from 'react';
import ModelOption from './ModelOption';

class ProductsMenu extends React.Component {
    render(){
        return(
            <div>
                <select className="form-control" onChange={this.props.setModel}>
                    <option value='model'>Model...</option>
                    {Object.keys(this.props.modelMenu).map(key => <ModelOption
                        key={key}
                        value={key}
                    />)}
                </select>
            </div>
        );
    }
}

export default ProductsMenu;
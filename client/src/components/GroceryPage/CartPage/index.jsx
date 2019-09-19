import React from 'react';
import './style.css';
import { Button, Container} from 'react-bootstrap';

import {  Card, Col, Row} from 'react-bootstrap'

export default class CartPage extends React.Component {
  state = {
    cartInfo:'',
    idItem:''
  }
  componentDidMount() {
    const {
      match:{
        params:{idItem}
      }
    } = this.props;
    this.setState({idItem})
  fetch(`/api/get-data-item/${idItem}`,{
    method:'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res=>{
    return res.json()
  })
  .then(response=>{
    this.setState({cartInfo:response.data[0]})
    
  })
  .catch(()=>{
    console.log('internal server error');
    
  })



  }
  render() {
    const { cartInfo } = this.state;
    console.log('cartInfo in render', cartInfo);

    return (
      <>

        
          
              <Col xs={12} md={12} lg={12} key={cartInfo.id}>
                <img src={`/images/products/${cartInfo.product_image}`} className="card-img" />
                <div className="yourlist__card-div">
                  <Card.Header className="yourlist__card-header">
                    <div>No.List>>{cartInfo.id}>></div>
                    <div className="header__name-product">Name Product : {cartInfo.product_name}</div>
                  </Card.Header>
                  <Card.Text className="yourlist__card-text">
                    Product Price :  {cartInfo.product_price}
                  </Card.Text>
                  <Card.Text className="yourlist__card-text">
                    Product Size : {cartInfo.sizes}
                  </Card.Text>
                </div>
                </Col>
        
              
            </>
    )
        }
      }

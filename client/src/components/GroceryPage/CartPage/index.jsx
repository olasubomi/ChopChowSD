/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import './style.css';
import {  Card, Col} from 'react-bootstrap'

export default class CartPage extends React.Component {
  state = {
    cartInfo:'',
    idItem:'',
    message:''
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
    this.setState({ message: 'Sorry , Internal Server ERROR' })
    
  })

  }
  render() {
    const { cartInfo } = this.state;

    return (
      <>
              <Col xs={12} md={12} lg={12} key={cartInfo.id}>
                <img src={`/images/products/${cartInfo.product_image}`} alt='image' className="card-img" />
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

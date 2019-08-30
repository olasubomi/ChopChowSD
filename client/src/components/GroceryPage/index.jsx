/* eslint-disable no-unused-expressions */
import React from 'react';
import './style.css';
import PageTitle from '../CommonComponents/PageTitle'
import { Spinner } from 'react-bootstrap'
import { Container, Alert, Card, Col, Form, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
export default class GroceryPage extends React.Component {
  state = {
    valueData: null,
    Authentication: false,
    customerId: null,
    message: null,
    email: '',
    password: '',
    messageErr: false,
    messageSuccess: false,
    show: false,
    valueId:'',
    valueProductName:'',
    valueProductImage:'',
    valueProductPrice:'',
    valueProductSize:'',
    valuePricePerOunce:'',
    addListClick:false,
    deleteListClick:false,
    showInsert:false,
    showRemove:false
  }

   handleClick = () => {
    const { email, password } = this.state;
    if (email && password) {
      // make a requset to the back with method post and data{email , password}
      fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(response => {

           if (response.status === 400 || response.status === 404) {
            this.setState({ messageErr: 'Bad Request , Check username or password ... !!' });
          } else if (response.status === 401) {
            this.setState({ messageErr: 'you are UnAuthorized' });
          } else if (response.status >= 500) {
            this.setState({ messageErr: 'Sorry , Internal Server ERROR' })
          } else {
            window.location.href = '/grocery'
            return this.setState({  messageSuccess: 'login sucessfully ', messageErr: '' ,Authentication: true })
          }
        })
    } else {
      this.setState({ messageErr: 'Please enter all fields' });
    }
  };

   handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });
  async componentDidMount() {
    const { auth } = this.props;

     this.setState({ Authentication: auth })
    const data = await fetch('/api/grocery', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
      },
    })
    let response = await data.json()
     if (response.success && response.data) {
      if (this.props.showLogin === false) {

         this.setState({ Authentication: true, show: false });

       } else {

         this.setState({ Authentication: false, show: true });

       }


       this.setState({ customerId: response.data })
      const { customerId } = this.state;
      fetch(`/getLists/${customerId}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },

       })
        .then(res => res.json())
        .then(response => {
          if (response) {
             this.setState({ valueData: response.data })
          }

         }).catch(() => {
          this.setState({ message: 'Sorry , Internal Server ERROR' })
        })
    } else {
      this.setState({ isAuthenticated: false })
    }
    
   }
   handleAddToCart=()=>{
    this.setState({showInsert:true})

   }
   handleRemoveFromCart=()=>{
    this.setState({showRemove:true})

   }
   handleDeleteItem=()=>{
    const { customerId } = this.state;
    fetch(`/api/remove-list/${customerId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    })
        .then(res => res.json)
        .then(response => {
                // this.setState({

                //     messageAlert: 'deleted successfully',
                //     showAlert: true,
                //     varaint: 'success'
                // }),
                //     () =>
                //         setTimeout(() => {
                //             this.setState({ messageAlert: '', showAlert: false })
                //         }, 1000)
                this.setState({messageSuccess:response.data})
            
        })
        .catch(()=>this.setState({messageErr:'Sorry , Internal Server Error'})
        )
   }
   handleInsertItem=()=>{
     const {valueId,valueProductName,valueProductImage,valueProductPrice,valuePricePerOunce,valueProductSize}=this.state;
    fetch('/api/appendItem',{
      method:'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: valueId,
        product_name:valueProductName,
        product_image:valueProductImage,
        product_price:valueProductPrice,
        sizes:valueProductSize,
        price_per_ounce: valuePricePerOunce
      }),
    
    })
    .then(res=>res.json())
    .then(response=>{
      console.log(777755,response)
      this.setState({messageSuccess:response.data})
    }).catch(()=>this.setState({messageErr:'Sorry, Internal Server Error'}))
   }

   handleClose = e => {
    if (e) e.stopPropagation();
    this.setState({ Insert: false });
  };

   render() {
    const {valueId, valueProductName,valueProductImage,valueProductSize,valueProductPrice,valuePricePerOunce, valueData, message, email, password, messageErr, messageSuccess, show ,addListClick,deleteListClick,showInsert,showRemove} = this.state;
    const { auth } = this.props;
    console.log(22222,addListClick);
    console.log('id',valueId);
    console.log('name',valueProductName);
    console.log('image',valueProductImage);
    console.log('size',valueProductSize);
    console.log('price',valueProductPrice);
    console.log('price once',valuePricePerOunce);
    
     return (
      <>
        {auth ? (
          <>
            <PageTitle title=" Your Grocery List" />
            <Container className="page__container">
              {message && <Alert variant="danger">{message}</Alert>}
              {valueData ? (
                <>

                  <img src={`/images/products/${valueData.product_image}`} className="card-img" />
                  <Col xs={12} md={6} lg={3} key={valueData.id}>
                    <div className="yourlist__card-div">
                      <Card.Header className="yourlist__card-header">
                        <div>No.List>>{valueData.id}>></div>
                        <div className="header__name-product">Name Product : {valueData.product_name}</div>
                      </Card.Header>
                      <Card.Text className="yourlist__card-text">
                        Product Price :  {valueData.product_price}
                      </Card.Text>
                      <Card.Text className="yourlist__card-text">
                        Product Size : {valueData.sizes}
                      </Card.Text>
                    </div>

                     <Button className="yourlist__buttonAdd" onClick={this.handleAddToCart}>Add To Cart</Button>
                    {showInsert?(
                      <Modal show={showInsert} onHide={this.handleClose} className="modal" backdrop="static">
                        <Modal.Body>
                        <Form.Group>
                      <Form.Label>Product Id:</Form.Label>
                      <Form.Control
                        type="number"
                        name="valueId"
                        value={valueId}
                        placeholder="Enter id list"
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Product Name :</Form.Label>
                      <Form.Control
                        type="text"
                        name="valueProductName"
                        value={valueProductName}
                        placeholder="Enter name list"
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Product Image :</Form.Label>
                      <Form.Control
                        type="text"
                        name="valueProductImage"
                        value={valueProductImage}
                        placeholder="Enter image list"
                        onChange={this.handleChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Product Price :</Form.Label>
                      <Form.Control
                        type="number"
                        name="valueProductPrice"
                        value={valueProductPrice}
                        placeholder="Enter price list"
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Product Size :</Form.Label>
                      <Form.Control
                        type="text"
                        name="valueProductSize"
                        value={valueProductSize}
                        placeholder="Enter size list"
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Product Price Per Ounce :</Form.Label>
                      <Form.Control
                        type="number"
                        name="valuePricePerOunce"
                        value={valuePricePerOunce}
                        placeholder="Enter Price Per Ounce list"
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    
                    <p className="msg-success">{messageSuccess}</p>
                    <p className="msg-err">{messageErr}</p>
                        </Modal.Body>
                        <Modal.Footer className="confirm__success">
                                <Button
                                  variant="secondary"
                                  onClick={this.handleClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={this.handleInsertItem}
                                >
                                  Insert
                                </Button>
                              </Modal.Footer>
                      </Modal>
                    ):null}
                    <div className="yourlist__buttonDelete"><i class="fa fa-remove" onClick={this.handleRemoveFromCart} ></i></div>
                      {showRemove?(
                        <Modal show={showRemove} onHide={this.handleClose}>
                              <Modal.Body>
                                Are you sure to delete this offer ?!
                              </Modal.Body>
                              <Modal.Footer className="confirm__delete">
                                <Button
                                  variant="secondary"
                                  onClick={this.handleClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={this.handleDeleteItem}
                                >
                                  Delete
                                </Button>
                              </Modal.Footer>
                            </Modal>
                        ):null}
                    
                  </Col>



                 </>
              ) : <Spinner animation="border" variant="info" />
              }
            </Container>
             <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="false"></div>
          </>
        ) : (
            <>
               
               <Modal show={true} onHide={this.handleClose} className="modal" backdrop="static">
                <Modal.Body>
                  <Form className="login__form">
                    <div className="login__form-div-title">
                      <h2 className="login__form-title">Log in to View Grocery List</h2>
                     </div>
                     <div className="vl">
                      <span className="vl-innertext">or</span>
                    </div>
                    <div className="col">
                      <a href="#" className="fb btn">
                        <i class="fa fa-facebook fa-fw"></i> Login with Facebook
                                                  </a>
                      <a href="#" className="google btn"><i class="fa fa-google fa-fw">
                      </i> Login with Google+
                                                  </a>
                    </div>
                     <div className="col">
                      <div className="hide-md-lg">
                        <p>Or sign in manually:</p>
                      </div>
                    </div>
                    <Form.Group>
                      <Form.Label>Email :</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password :</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <p className="msg-success">{messageSuccess}</p>
                    <p className="msg-err">{messageErr}</p>
                    <Link>
                      <span className="link-forgot-password">Forget Password  ?</span>
                    </Link>
                     <Button
                      type="button"
                      className="login__form-btn"
                      onClick={this.handleClick}
                    >
                      Log in
                              </Button>
                    <Form.Text className="login__form__text-muted">
                      Don’t have an account? {''}
                       <Link className="link-signup-word" to="/signup">
                        Sign Up
                            </Link>
                      <br />
                      or
                              <Link className="link-guest-word" to="/aguest">
                        continue as guest
                            </Link>
                     </Form.Text>
                  </Form>
                </Modal.Body>
              </Modal>
              <PageTitle title=" Your Grocery List" />
                    <Container className="page__container">
                        {message && <Alert variant="danger">{message}</Alert>}
                        {valueData ? (
                            <>
                               <img src={`/images/products/${valueData.product_image}`} className="card-img"/>
                                  <Col xs={12} md={6} lg={3} key={valueData.id}>
                                    <div className="yourlist__card-div">
                                    <Card.Header className="yourlist__card-header">
                                            <div>No.List>>{valueData.id}>></div>
                                            <div className="header__name-product">Name Product : {valueData.product_name}</div> 
                                    </Card.Header>
                                        <Card.Text className="yourlist__card-text">
                                            Product Price :  {valueData.product_price}
                                    </Card.Text>
                                        <Card.Text className="yourlist__card-text">
                                            Product Size : {valueData.sizes}
                                    </Card.Text>
                                    </div>
                                    <Button className="yourlist__buttonAdd" >Add To Cart</Button>
                                   <div className="yourlist__buttonDelete"><i class="fa fa-remove"></i></div> 
                                </Col>
                            </>
                        ) : <Spinner animation="border" variant="info" />
                        }
                    </Container>
            </>
          )}
       </>
    )
  }
}

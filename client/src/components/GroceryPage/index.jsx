/* eslint-disable no-unused-expressions */
import React from 'react';
import './style.css';
import PageTitle from '../CommonComponents/PageTitle'
import { Spinner } from 'react-bootstrap'
import { Container, Alert, Card, Col, Row,Form, Button, Modal } from 'react-bootstrap'
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
     fetch('/api/grocery', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
      },
    })
   .then(res=>{
   return res.json()

  }) 
  .then(response=>{
    if (response.success && response.data) {
     if (this.props.showLogin === false) {
        this.setState({ Authentication: true, show: false });
      } else {
this.setState({ Authentication: false, show: true });
}
} else {
  this.setState({ isAuthenticated: false })
}
      this.setState({ customerId: response.data })
     const { customerId } = this.state;
     fetch(`/api/getList/${customerId}`, {
       method: 'GET',
       credentials: 'same-origin',
       headers: {
         'Content-Type': 'application/json',
       },

      })
       .then(res => res.json())
       .then(response => {
         if (response) {//all lists for this customer
            this.setState({ valueData: response.data })
         }

        }).catch(() => {
         this.setState({ message: 'Sorry , Internal Server ERROR' })
       })
  
  })
   }
   
   handleClose = e => {
    if (e) e.stopPropagation();
  };

   render() {
    const { valueData, message, email, password, messageErr, messageSuccess} = this.state;
    const { auth } = this.props;
     return (
      <>
        {auth ? (
          <>
            <PageTitle title=" Your Grocery List" />
              {message && <Alert variant="danger">{message}</Alert>}
            <Container className="page__container">
              {valueData && valueData.length?(
                <Row>
                {valueData ? (
                  valueData.map((itemList)=>{
                    console.log(6000,itemList.product_image);
                    
                    return  <Col xs={12} md={12} lg={12} key={itemList.id}>
                    <img src={`/images/products/${itemList.product_image}`} className="card-img" />
                    <div className="yourlist__card-div">
                        <Card.Header className="yourlist__card-header">
                          <div>No.List>>{itemList.id}>></div>
                          <div className="header__name-product">Name Product : {itemList.product_name}</div>
                        </Card.Header>
                        <Card.Text className="yourlist__card-text">
                          Product Price :  {itemList.product_price}
                        </Card.Text>
                        <Card.Text className="yourlist__card-text">
                          Product Size : {itemList.sizes}
                        </Card.Text>
                      </div>
                    </Col>
                  })) : <Spinner animation="border" variant="info" />}
                </Row>
              ):(
                <>
                <span>There is no list until now</span>
                <Button className="yourlist__button" onClick={this.handleCreateList}>create list</Button>
                </>
              )}
            </Container>
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
              {/* {valueData && valueData.length?( */}

                <Row>
                {valueData ? (

                  valueData.map((itemList)=>{
                  return  <Col xs={12} md={12} lg={12} key={itemList.id}>
                    <img src={`/images/products/${itemList.product_image}`} className="card-img" />
                    <div className="yourlist__card-div">
                        <Card.Header className="yourlist__card-header">
                          <div>No.List>>{itemList.id}>></div>
                          <div className="header__name-product">Name Product : {itemList.product_name}</div>
                        </Card.Header>
                        <Card.Text className="yourlist__card-text">
                          Product Price :  {itemList.product_price}
                        </Card.Text>
                        <Card.Text className="yourlist__card-text">
                          Product Size : {itemList.sizes}
                        </Card.Text>
                      </div>
                    </Col>
                  })) : <Spinner animation="border" variant="info" />}
                </Row>
            </Container>
          
            </>
          )}
       </>
    )
  }
}

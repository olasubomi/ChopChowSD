/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
import React from 'react';
import './style.css';
import PageTitle from '../CommonComponents/PageTitle'
import { Spinner } from 'react-bootstrap'
import { Container, Alert, Card, Col, Row, Form, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import signupValidation from './validationSignup';
import validationCreateList from './validationCreateList'
export default class GroceryPage extends React.Component {
  state = {
    newcustomerId: '',
    dataTypeaheadState: '',
    cartTrue: false,
    valueData: null,
    Authentication: false,
    customerId: null,
    messageErrServer: null,
    email: '',
    password: '',
    messageErr: false,
    messageSuccess: false,
    showAlert: false,
    messageAlert: '',
    variant: '',
    showSignup: false,
    loading: false,
    valueItemId: null,

    idItem: '',
    deleteListClick: false,
    showInsert: false,
    showRemove: false,
    deletedItemId: null,
    addItemId: null,
    showRemoveList: false,
    showCreate: false,
    idsItems: null,
    deletedItemsId: null,
    lasIdListState: null,
    valueId: '',
    valueProductName: '',
    valueProductImage: '',
    valueProductPrice: '',
    valueProductSize: '',
    valuePricePerOunce: '',
    propsInfoCart: '',
    infoCart: '',
    showLogin: false,
    firstname: '',
    lastname: '',
    password: '',
    phoneNumber: '',
    street: '',
    city: '',
    zipCode: '',
    ipsid: '',
    errormsg: '',
    showSignupState: false
  }

  handleClickSignup = () => {
    const { firstname, lastname, email, password, confPassword, phoneNumber, street, city, zipCode, ipsid, newcustomerId } = this.state;
    if (firstname && lastname && email && password && confPassword && phoneNumber && street && city && zipCode && ipsid) {

      signupValidation
        .validate(
          {
            firstname,
            lastname,
            email,
            password,
            confPassword,
            phoneNumber,
            street,
            city,
            zipCode,
            ipsid
          },
          { abortEarly: false }
        )
        .then(() => {

          fetch(`/api/signup/${newcustomerId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              firstname,
              lastname,
              email,
              password,
              confPassword,
              phoneNumber,
              street,
              city,
              zipCode,
              ipsid
            }),
          })
            .then(response => {
              if (response.status === 400 || response.status === 404) {
                this.setState({ messageErr: 'Bad Request , This Email is exist so,try enter another email,please... !!' });
              } else if (response.status === 401) {
                this.setState({ messageErr: 'you are UnAuthorized' });
              } else if (response.status >= 500) {
                this.setState({ messageErr: 'Sorry , Internal Server ERROR' })
              } else {
                this.setState({ messageSuccess: 'signup sucessfully ', messageErr: '', Authentication: true })
                return window.location.href = '/login'
              }
            })
        })
        .catch(({ inner }) => {
          if (inner) {
            const errors = inner.reduce(
              (acc, item) => ({ ...acc, [item.path]: item.message }),
              {}
            );
            this.setState({ errormsg: { ...errors } });
          }
        })
    } else {
      this.setState({ messageErr: 'Please enter all fields' });
    }
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });


  
  async componentDidMount() {

    const { auth, dataTypeaheadProps } = this.props;

    this.setState({ Authentication: auth })
    fetch('/api/grocery', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => {

        return res.json()

      })
      .then(response => {
        if (response.success && response.data) {
            this.setState({ Authentication: true });
        } else {
          this.setState({ Authenticated: false })
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
          .then(res => {
            return res.json()
          })
          .then(response => {
            if (response) {//all lists for this customer
              this.setState({ valueData: response.data })
              this.setState({ valueData: dataTypeaheadProps[0] })
            }

          }).catch(() => {
            this.setState({ message: 'Sorry , Internal Server ERROR' })
          })


      })

    this.handleClose = e => {
      const { customerId } = this.state;
      if (e) e.stopPropagation();
      this.setState({ showInsert: false, showCreate: false });

      fetch(`/api/getList/${customerId}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },

      })
        .then(res => {
          return res.json()
        })
        .then(response => {
          if (response) {//all lists for this customer
            this.setState({ valueData: response.data })
          }

        }).catch(() => {
          this.setState({ messageErrServer: 'Sorry , Internal Server ERROR' })
        })
    };
    this.handleShowDeleteItem = (idItem) => {
      this.setState({ deletedItemId: idItem });
      const { customerId, deletedItemId } = this.state;
      fetch(`/api/remove-item/${idItem}/${customerId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

      })
        .then(res => {
          return res.json()

        })
        .then(response => {
          this.setState({
            messageAlert: 'deleted successfully',
            showAlert: true,
            variant: 'success'
          },
            () =>
              setTimeout(() => {
                this.setState({ messageAlert: '', showAlert: false })
              }, 3500)
          )
          this.setState(prevState => {
            const newValueData = prevState.valueData.filter(
              item => item.id !== deletedItemId
            );
            return { valueData: newValueData };
          });

        })
        .catch(() => this.setState({ messageErrServer: 'Sorry , Internal Server Error' })
        )
    }
    this.handleShowAddItem = (idItem) => {
      window.location.href = `cart-page/${idItem}`
    }

    this.handleShowDeleteList = (idsItems) => {
      const { customerId } = this.state;
      fetch(`/api/get-ids-items/${customerId}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },

      })
        .then(res => res.json())
        .then(response => {
          if (response) {//all lists for this customer
            let arrResItemDelete = response.data
            arrResItemDelete.map((resDelete) => {
              this.setState({ deletedItemsId: resDelete })
            })
          }

        }).catch(() => {
          this.setState({ messageErrServer: 'Sorry , Internal Server ERROR' })
        })

      fetch(`/api/remove-list/${customerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },

      })
        .then(res => {
          return res.json()
        })
        .then(response => {
          this.setState({ valueData: [] });
        })
    }

    this.handleShowCreateList = () => {
      this.setState({ showCreate: true })
    }

    this.handleCreateList = () => {
      const { lasIdListState, valueProductName, valueProductImage, valueProductPrice, valuePricePerOunce, valueProductSize } = this.state;
      const { customerId } = this.state;
      const idItem = lasIdListState;
      validationCreateList.validate(
        { valueProductName, valueProductImage, valueProductPrice, valueProductSize, valuePricePerOunce },
        { abortEarly: false }
      )
        .then(() => {
          fetch(`/api/create-list/${idItem}/${customerId}`, {
            method: 'POST',
            body: JSON.stringify({
              valueProductName,
              valueProductImage,
              valueProductPrice,
              valueProductSize,
              valuePricePerOunce,

            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then(res => {
              return res.json();
            })
            .then(response => {
              this.setState({ messageSuccess: 'add successfull' });
            })
        })
        .catch(({ inner }) => {
          if (inner) {
            const errors = inner.reduce(
              (acc, item) => ({ ...acc, [item.path]: item.message }),
              {}
            );
            this.setState({ errormsg: { ...errors } });
          }
        });
    }

    fetch('/api/get-ids-list', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },

    })
      .then(res => {
        return res.json()
      })
      .then(response => {
        let arrResponse = response.data;
        const lasIdList = arrResponse[arrResponse.length - 1]
        this.setState({ lasIdListState: lasIdList + 1 })

      })
    fetch('/api/get-ids-customers', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },

    })
      .then(res => {
        return res.json()
      })
      .then(response => {
        let arrResponse = response.data;
        const lasIdCustomer = arrResponse[arrResponse.length - 1]
        this.setState({ newcustomerId: lasIdCustomer + 1 })

      })

  }

  render() {
    const { firstname, lastname, email, password, phoneNumber, street, city, zipCode, ipsid, confPassword, errormsg, valueProductName, showAlert, variant, messageAlert, lasIdListState, valueData, idsItems, showCreate, valueProductImage, valueProductSize, valueProductPrice, valuePricePerOunce, messageErr, messageSuccess} = this.state;
    const { auth } = this.props;
    return (
      <>
        {auth ? (
          <>
      
            <PageTitle title=" Your Grocery List" />
            <Alert show={showAlert} key={1} variant={variant}>
              {messageAlert}
            </Alert>
            <Container className="page__container">
              {valueData && valueData.length ? (
                <Row>
                  <Button className='yourlist__buttonDeleteList'
                    variant="danger"
                    onClick={e => {
                      e.stopPropagation();
                      this.handleShowDeleteList(idsItems);
                    }}

                  >
                    Delete All Items
                  </Button>


                  {valueData ? (
                    valueData.map((itemList) => {
                      let idItem = itemList.id;
                      return <>

                        <Col xs={12} md={12} lg={12} key={itemList.id}>
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
                          <div className="yourlist__buttonAdd"><Button onClick={e => {
                            e.stopPropagation();
                            this.handleShowAddItem(idItem);
                          }}> Add To Cart</Button> </div>

                          <div className="yourlist__buttonDelete"><i class="fa fa-remove" onClick={e => {
                            e.stopPropagation();
                            this.handleShowDeleteItem(itemList.id);

                          }} ></i></div>

                        </Col>
                      </>
                    })) : <Spinner animation="border" variant="info" />}
                </Row>
              ) : (
                  <>
                    <span>There is no list until now</span>
                    <Button className="yourlist__button" onClick={this.handleShowCreateList}>create list</Button>
                    {showCreate ? (
                      <Modal show={showCreate} onHide={this.handleClose} className="modal" backdrop="static">
                        <Modal.Body>
                          <Form.Group>
                            <Form.Label>Product Id: {lasIdListState}</Form.Label>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Product Name :</Form.Label>
                            <Form.Control
                              className='create-input'
                              type="text"
                              name="valueProductName"
                              value={valueProductName}
                              placeholder="Enter name list"
                              onChange={this.handleChange}
                            />
                          </Form.Group>
                          {errormsg && <span className="errormsg">{errormsg.valueProductName}</span>}
                          <Form.Group>
                            <Form.Label>Product Image :</Form.Label>
                            <Form.Control
                              className='create-input'
                              type="text"
                              name="valueProductImage"
                              value={valueProductImage}
                              placeholder="Enter image list"
                              onChange={this.handleChange}
                            />
                          </Form.Group>
                          {errormsg && <span className="errormsg">{errormsg.valueProductImage}</span>}

                          <Form.Group>
                            <Form.Label>Product Price :</Form.Label>
                            <Form.Control
                              className='create-input'
                              type="number"
                              name="valueProductPrice"
                              value={valueProductPrice}
                              placeholder="Enter price list"
                              onChange={this.handleChange}
                            />
                          </Form.Group>
                          {errormsg && <span className="errormsg">{errormsg.valueProductPrice}</span>}

                          <Form.Group>
                            <Form.Label>Product Size :</Form.Label>
                            <Form.Control
                              className='create-input'
                              type="text"
                              name="valueProductSize"
                              value={valueProductSize}
                              placeholder="Enter size list"
                              onChange={this.handleChange}
                            />
                          </Form.Group>
                          {errormsg && <span className="errormsg">{errormsg.valueProductSize}</span>}

                          <Form.Group>
                            <Form.Label>Product Price Per Ounce :</Form.Label>
                            <Form.Control
                              className='create-input'
                              type="number"
                              name="valuePricePerOunce"
                              value={valuePricePerOunce}
                              placeholder="Enter Price Per Ounce list"
                              onChange={this.handleChange}
                            />
                          </Form.Group>
                          {errormsg && <span className="errormsg">{errormsg.valuePricePerOunce}</span>}

                          <p className="msg-success">{messageSuccess}</p>
                        </Modal.Body>
                        <Modal.Footer className="confirm__success">
                          <Button
                            variant="secondary"
                            onClick={this.handleClose}
                          >
                            Close
                          </Button>
                          <Button
                            className='create-button'
                            variant="success"
                            onClick={this.handleCreateList}
                          >
                            create
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    ) : null}
                  </>
                )}
            </Container>
          </>
        ) : (

            <>

              <Modal show={true} onHide={this.handleClose} className="modal" backdrop="static">
                <Modal.Body>
                  <Form className="content-signup">
                    <h2 className="content-signup__word-sigup">SIGN UP</h2>
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label className="content-signup__form-label">
                        First Name :{' '}
                        <span className="content-signup__username-star">*</span>
                      </Form.Label>
                      <Form.Control
                        name="firstname"
                        value={firstname}
                        onChange={this.handleChange}
                        type="firstname"
                        placeholder="e.g: emily1234"
                        className="content-signup__form-input"
                      />
                      {!messageSuccess || !messageErr || errormsg ? (

                        <span className="errormsg">{errormsg.firstname}</span>
                      ) : null}
                    </Form.Group>

                    <Form.Group controlId="formBasicUsername">
                      <Form.Label className="content-signup__form-label">
                        Last Name :{' '}
                        <span className="content-signup__username-star">*</span>
                      </Form.Label>
                      <Form.Control
                        name="lastname"
                        value={lastname}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="e.g: emily1234"
                        className="content-signup__form-input"

                      />
                      {!messageSuccess || !messageErr || errormsg ? (

                        <span className="errormsg">{errormsg.lastname}</span>
                      ) : null}

                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label className="content-signup__form-label">
                        E-mail : <span className="content-signup__email-star">*</span>
                      </Form.Label>
                      <Form.Control
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        type="email"
                        placeholder="example@mail.com"
                        className="content-signup__form-input"

                      />
                      {!messageSuccess || !messageErr || errormsg ? (

                        <span className="errormsg">{errormsg.email}</span>
                      ) : null}

                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label className="content-signup__form-label">
                        Password :{' '}
                        <span className="content-signup__password-star">*</span>
                      </Form.Label>
                      <Form.Control
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        type="password"
                        placeholder="Password"
                        className="content-signup__form-input"

                      />
                      {!messageSuccess || !messageErr || errormsg ? (

                        <span className="errormsg">{errormsg.password}</span>
                      ) : null}

                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label className="content-signup__form-label">
                        Confirm Password :{' '}
                        <span className="content-signup__confirm-password-star">*</span>
                      </Form.Label>
                      <Form.Control
                        name="confPassword"
                        value={confPassword}
                        onChange={this.handleChange}
                        type="password"
                        placeholder="Password"
                        className="content-signup__form-input"

                      />
                      {!messageSuccess || !messageErr || errormsg ? (

                        <span className="errormsg">{errormsg.confPassword}</span>
                      ) : null}

                    </Form.Group>
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label className="content-signup__form-label">
                        Phone Number  :{' '}
                        <span className="content-signup__username-star">*</span>
                      </Form.Label>
                      <Form.Control
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={this.handleChange}
                        type="number"
                        placeholder="e.g: emily1234"
                        className="content-signup__form-input"

                      />
                      {!messageSuccess || !messageErr || errormsg ? (

                        <span className="errormsg">{errormsg.phoneNumber}</span>
                      ) : null}

                    </Form.Group>
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label className="content-signup__form-label">
                        Street :{' '}
                        <span className="content-signup__username-star">*</span>
                      </Form.Label>
                      <Form.Control
                        name="street"
                        value={street}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="e.g: emily1234"
                        className="content-signup__form-input"

                      />
                      {!messageSuccess || !messageErr || errormsg ? (

                        <span className="errormsg">{errormsg.street}</span>
                      ) : null}

                    </Form.Group>
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label className="content-signup__form-label">
                        city :{' '}
                        <span className="content-signup__username-star">*</span>
                      </Form.Label>
                      <Form.Control
                        name="city"
                        value={city}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="e.g: emily1234"
                        className="content-signup__form-input"

                      />
                      {errormsg && <span className="errormsg">{errormsg.city}</span>}
                      {!messageSuccess || !messageErr || errormsg ? (

                        <span className="errormsg">{errormsg.city}</span>
                      ) : null}
                    </Form.Group>
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label className="content-signup__form-label">
                        zip Code :{' '}
                        <span className="content-signup__username-star">*</span>
                      </Form.Label>
                      <Form.Control
                        name="zipCode"
                        value={zipCode}
                        onChange={this.handleChange}
                        type="number"
                        placeholder="e.g: emily1234"
                        className="content-signup__form-input"

                      />
                      {!messageSuccess || !messageErr || errormsg ? (

                        <span className="errormsg">{errormsg.zipCode}</span>
                      ) : null}
                    </Form.Group>

                    <Form.Group controlId="formBasicUsername">
                      <Form.Label className="content-signup__form-label">
                        Ips Id :{' '}
                        <span className="content-signup__username-star">*</span>
                      </Form.Label>
                      <Form.Control
                        name="ipsid"
                        value={ipsid}
                        onChange={this.handleChange}
                        type="number"
                        placeholder="e.g: emily1234"
                        className="content-signup__form-input"

                      />
                      {!messageSuccess && !messageErr && errormsg ? (

                        <span className="errormsg">{errormsg.ipsid}</span>
                      ) : null}
                    </Form.Group>
                    <p className="msg-success">{messageSuccess}</p>
                    <p className="msg-err">{messageErr}</p>
                    <Button
                      variant="primary"
                      className="content-signup__submit"
                      onClick={this.handleClickSignup}
                    >
                      Sign Up
          </Button>
                    <Form.Text className="content-signup__text-muted">
                      Already have an account?{' '}
                      <Link to='login' className="content-signup__word-login" >
                        login

                      </Link>
                    </Form.Text>
                  </Form>
                </Modal.Body>
              </Modal>


              <PageTitle title=" Your Grocery List" />
              <Container className="page__container">
                <Row>
                  {valueData ? (
                    valueData.map((itemList) => {
                      return <>
                        <Col xs={12} md={12} lg={12} key={itemList.id}>
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
                      </>
                    })) : <Spinner animation="border" variant="info" />}
                </Row>
              </Container>

            </>
          )}
      </>
    )
  }
}


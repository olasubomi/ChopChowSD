
import React from 'react';
import './style.css';
import PageTitle from '../CommonComponents/PageTitle'
import { Spinner } from 'react-bootstrap'
import { Container, Alert, Card, Col, Row, Form, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
export default class GroceryPage extends React.Component {
  state = {
    newcustomerId: '',
    valueData: null,
    Authentication: false,
    customerId: null,
    email: '',
    password: '',
    messageErr: false,
    messageSuccess: false,
    messageSuccessCreate: false,
    showAlert: false,
    messageAlert: '',
    variant: '',
    idItem: '',
    deletedItemId: null,
    showCreate: false,
    idsItems: null,
    deletedItemsId: null,
    lasIdListState: null,
    valueProductName: '',
    valueProductImage: '',
    valueProductPrice: '',
    valueProductSize: '',
    valuePricePerOunce: '',
    errormsg: '',
  }


  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });


  componentDidMount() {
    const { auth } = this.props;
    this.setState({ Authentication: auth })
    fetch('/api/grocery', {
      method: 'GET',
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
            }
          })
          .catch(() => {
            this.setState({
              messageAlert: 'Internal Server Error',
              showAlert: true,
              variant: 'danger'
            },
              () =>
                setTimeout(() => {
                  this.setState({ messageAlert: '', showAlert: false })
                }, 8000)
            )
          })

      })
    this.handleClick = () => {
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
              this.setState({ messageErr: '' });
              this.setState({ isAuthenticated: true })
              this.setState({ messageSuccess: 'login sucessfully ' });
              return window.location.href = '/grocery'
            }
          })
          .catch(() => {
            this.setState({
              messageAlert: 'Internal Server Error',
              showAlert: true,
              variant: 'danger'
            },
              () =>
                setTimeout(() => {
                  this.setState({ messageAlert: '', showAlert: false })
                }, 8000)
            )
          })
      } else {
        this.setState({ messageErr: 'Please enter all fields' });
      }
    };


    this.handleClose = e => {
      if (e) e.stopPropagation();
      this.setState({ showCreate: false });
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
        .catch(() => {
          this.setState({
            messageAlert: 'Internal Server Error',
            showAlert: true,
            variant: 'danger'
          },
            () =>
              setTimeout(() => {
                this.setState({ messageAlert: '', showAlert: false })
              }, 8000)
          )
        })
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
            arrResItemDelete.map((resDelete) =>
              this.setState({ deletedItemsId: resDelete })
            )
          }

        })
        .catch(() => {
          this.setState({
            messageAlert: 'Internal Server Error',
            showAlert: true,
            variant: 'danger'
          },
            () =>
              setTimeout(() => {
                this.setState({ messageAlert: '', showAlert: false })
              }, 8000)
          )
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

          this.setState({ valueData: [] });
        })
        .catch(() => {
          this.setState({
            messageAlert: 'Internal Server Error',
            showAlert: true,
            variant: 'danger'
          },
            () =>
              setTimeout(() => {
                this.setState({ messageAlert: '', showAlert: false })
              }, 8000)
          )
        })
    }

    this.handleShowCreateList = () => {
      this.setState({ showCreate: true })
    }

    this.handleCreateList = () => {
      const { lasIdListState, valueProductName, valueProductImage, valueProductPrice, valuePricePerOunce, valueProductSize } = this.state;
      const { customerId } = this.state;
      const idItem = lasIdListState;
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
          if (response) {
            this.setState({ valueData: response.data, messageSuccessCreate: 'add successfull', errormsgImage: '', errormsg: '', valueProductName: '', valueProductImage: '', valueProductSize: '', valueProductPrice: '', valuePricePerOunce: '', idItem: lasIdListState + 1 });
          }

        })

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
      .catch(() => {
        this.setState({
          messageAlert: 'Internal Server Error',
          showAlert: true,
          variant: 'danger'
        },
          () =>
            setTimeout(() => {
              this.setState({ messageAlert: '', showAlert: false })
            }, 8000)
        )
      })

  }

  render() {
    const { email, password, showAlert, variant, messageAlert, lasIdListState, valueData, idsItems, showCreate, valueProductName, valueProductImage, valueProductSize, valueProductPrice, valuePricePerOunce, messageErr, messageSuccess, messageSuccessCreate } = this.state;
    const { dataTypeaheadProps, auth } = this.props;

    return (
      <>

        {auth ? (
          <>

            <PageTitle title=" Your Grocery List" />
            <Alert show={showAlert} key={1} variant={variant}>
              {messageAlert}
            </Alert>
            <Container className="page__container">

              {valueData && valueData.length !== 0 ? (

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
                          {itemList.product_image.startsWith('http://') || itemList.product_image.startsWith('data') ? (
                            <img src={`${itemList.product_image}`} alt="image product " className="card-img" />
                          ) : (
                              <img src={`/images/products/${itemList.product_image}`} alt="image product " className="card-img" />
                            )}
                          <div className="yourlist__card-div">
                            <Card.Header className="yourlist__card-header">
                              <div className="header__name-product">Name Product : {itemList.product_name}</div>
                            </Card.Header>
                            <Card.Text className="yourlist__card-text">
                              Product Price :  {itemList && itemList.product_price}
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
                    })
                  ) : <Spinner animation="border" variant="info" />}

                  {dataTypeaheadProps ? (
                    <>
                      {dataTypeaheadProps.map(itemList => {
                        return <>

                          <Col xs={12} md={12} lg={12} key={itemList.id}>
                            <img src={`/images/products/${itemList.product_image}`} className="dataTypeahead__card-img" />
                            <div className="dataTypeahead__card-div">
                              <Card.Header className="yourlist__card-header">
                                <div className="header__name-product">Name Product : {itemList.product_name}</div>
                              </Card.Header>
                              <Card.Text className="yourlist__card-text">
                                Product Price :  {itemList && itemList.product_price}
                              </Card.Text>
                              <Card.Text className="yourlist__card-text">
                                Product Size : {itemList.sizes}
                              </Card.Text>
                            </div>


                          </Col>
                        </>
                      })}
                    </>
                  ) : null}
                </Row>

              ) : (
                  <>
                    <span>There is no list until now</span>
                    <Button className="yourlist__button-create" onClick={this.handleShowCreateList}>create list</Button>
                    {showCreate ? (
                      <Modal show={showCreate} onHide={this.handleClose} backdrop="static" className="modal-create">
                        <Modal.Body className="modal-create__body">
                          <Form.Group>
                            <Form.Label className="yourlist__group-label">Product Id: {lasIdListState}</Form.Label>
                          </Form.Group>
                          <Form.Group >
                            <Form.Label className="yourlist__group-label">Product Name :</Form.Label>
                            <Form.Control
                              className='create-input'
                              type="text"
                              name="valueProductName"
                              value={valueProductName}
                              placeholder="Enter name list"
                              onChange={this.handleChange}
                            />
                          </Form.Group>
                          <Form.Group >
                            <Form.Label className="yourlist__group-label">Product Image :</Form.Label>
                            <Form.Control
                              className='create-input'
                              type="text"
                              name="valueProductImage"
                              value={valueProductImage}
                              placeholder="Enter image list"
                              onChange={this.handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="yourlist__group-label">
                            <Form.Label className="yourlist__group-label">Product Price :</Form.Label>
                            <Form.Control
                              className='create-input'
                              type="number"
                              name="valueProductPrice"
                              value={valueProductPrice}
                              placeholder="Enter price list"
                              onChange={this.handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="yourlist__group-label">
                            <Form.Label className="yourlist__group-label">Product Size :</Form.Label>
                            <Form.Control
                              className='create-input'
                              type="text"
                              name="valueProductSize"
                              value={valueProductSize}
                              placeholder="Enter size list"
                              onChange={this.handleChange}

                            />
                          </Form.Group>
                          <Form.Group className="yourlist__group-label">
                            <Form.Label className="yourlist__group-label">Product Price Per Ounce :</Form.Label>
                            <Form.Control
                              className='create-input'
                              type="number"
                              name="valuePricePerOunce"
                              value={valuePricePerOunce}
                              placeholder="Enter Price Per Ounce list"
                              onChange={this.handleChange}
                            />
                          </Form.Group>
                          {messageSuccessCreate ? (
                            <p className="msg-success">{messageSuccessCreate}</p>
                          ) : null}
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
              <Container>
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
                          <i className="fa fa-facebook fa-fw"></i> Login with Facebook
                        </a>
                        <a href="#" className="google btn"><i className="fa fa-google fa-fw">
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
                         <Link className="link-guest-word" >
                          continue as guest
                        </Link>
                      </Form.Text>
                    </Form>
                  </Modal.Body>
                </Modal>
              </Container>


            </>
          )}
      </>
    )
  }
}


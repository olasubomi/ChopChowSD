
import React from 'react';
import './style.css';
import PageTitle from '../CommonComponents/PageTitle'
import { Spinner } from 'react-bootstrap'
import { Container, Alert, Card, Col, Row, Form, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
// import { fileLoader } from 'ejs';
export default class GroceryPage extends React.Component {
  state = {
    newcustomerId: '',
    customerList: null,
    Authentication: false,
    customerId: null,
    email: '',
    password: '',
    messageErr: false,
    messageSuccess: false,
    messageErrCreate: false,
    showAlert: false,
    messageAlert: '',
    variant: '',
    idItem: '',
    deletedItemId: null,
    showGroceryList: true,
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
    // checks if user is already logged in in app.
    const { auth } = this.props;
    this.setState({ Authentication: auth })
    // if (!auth || auth === undefined){}

    // api grocery calls authenticationVerify,isAuthenticated
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
        console.log("api/grocery response:")
        console.log(response);
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
            if (response) {
              this.setState({ customerList: response.data })
            }
          })
          .catch(() => {
            this.setState({
              messageAlert: 'Internal Server Error while getting users grocery list...',
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

    fetch('/api/get-ids-list', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      }
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
      }
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
          messageAlert: 'Internal Server Error while getting customer ids',
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

  handleClick = () => {
    const { email, password } = this.state;
    if (email && password) {
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
            messageAlert: 'Internal Server Error while logging in',
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

  handleClose = e => {
    if (e) e.stopPropagation();
    this.setState({ showGroceryList: false });
  };

  handleShowDeleteItem = (idItem) => {
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
          const newValueData = prevState.customerList.filter(
            // do we need catch sttmnt for filter
            item => item.id !== deletedItemId
          );
          return { customerList: newValueData };
        });

      })
      .catch(() => {
        this.setState({
          messageAlert: 'Internal Server Error while deleting item',
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

  handleShowAddItem = (idItem) => {
    window.location.href = `cart-page/${idItem}`
  }

  handleShowDeleteList = (idsItems) => {
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
        if (response) {
          let arrResItemDelete = response.data
          arrResItemDelete.map((resDelete) =>
            this.setState({ deletedItemsId: resDelete })
          )
        }
      })
      .catch(() => {
        this.setState({
          messageAlert: 'Internal Server Error while getting item id',
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

        this.setState({ customerList: [] });
      })
      .catch(() => {
        this.setState({
          messageAlert: 'Internal Server Error while deleting list',
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

  handleShowGroceryList = () => {
    this.setState({ showGroceryList: true })
  }


  render() {
    const { email, password, showAlert, variant, messageAlert, customerList, idsItems, messageErr, messageSuccess } = this.state;
    // const { showGroceryList, valueProductName, valueProductImage, valueProductSize, valueProductPrice, valuePricePerOunce, lasIdListState, messageErrCreate } = this.state;
    const { dataTypeaheadProps } = this.props;

    return (
      <>
        {this.state.Authentication ? (
          <>
            <PageTitle title=" Your Grocery List" />
            {/* Display alert if there is any issue loading grocery page */}
            <Alert show={showAlert} key={1} variant={variant}>
              {messageAlert}
            </Alert>


            {/* display grocery page typeahead functionalities */}
            <Container className="page__container">
              {customerList && customerList.length !== 0 ? (
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

                  {/* display searchbar typeahead items if they exist */}
                  {dataTypeaheadProps ? (
                    <>
                      {/* create all search bar options from typeahead's display on grocery list ? */}
                      {dataTypeaheadProps.map(ingredient_item_grocery_search => {
                        return <>
                          <Col xs={12} md={12} lg={12} key={ingredient_item_grocery_search.id}>
                            <img src={`/images/products/${ingredient_item_grocery_search.product_image}`} className="dataTypeahead__card-img" alt="product_img" />
                            <div className="dataTypeahead__card-div">
                              <Card.Header className="dataTypeahead__yourlist__card-header">
                                <div className="dataTypeahead__header__name-product">Product Name: {ingredient_item_grocery_search.product_name}</div>
                              </Card.Header>
                              <Card.Text className="dataTypeahead__yourlist__card-text">
                                Product Price :  {ingredient_item_grocery_search && ingredient_item_grocery_search.product_price}
                              </Card.Text>
                              <Card.Text className="dataTypeahead__yourlist__card-text">
                                Product Size : {ingredient_item_grocery_search.sizes}
                              </Card.Text>
                            </div>
                            <div className="dataTypeahead__buttonAdd"><Button onClick={e => {
                              e.stopPropagation();
                              this.handleShowAddItem(ingredient_item_grocery_search.id);
                            }}> Add To Cart</Button> </div>

                            <div className="dataTypeahead__buttonDelete"><i class="fa fa-remove" onClick={e => {
                              e.stopPropagation();
                              this.handleShowDeleteItem(ingredient_item_grocery_search.id);

                            }} ></i></div>
                          </Col>
                        </>
                      })}
                    </>
                  ) : null}
                  {/* display grocery list, for any authenticated customer */}
                  {customerList ? (
                    customerList.map((ingredient_item_customers_grocery) => {
                      let idItem = ingredient_item_customers_grocery.id;
                      return <>
                        <Col xs={12} md={12} lg={12} key={ingredient_item_customers_grocery.id}>
                          {ingredient_item_customers_grocery.product_image.startsWith('http://') || ingredient_item_customers_grocery.product_image.startsWith('data') ? (
                            <img src={`${ingredient_item_customers_grocery.product_image}`} alt="product_img " className="card-img" />
                          ) : (
                              <img src={`/images/products/${ingredient_item_customers_grocery.product_image}`} alt="product_img " className="card-img" />
                            )}
                          <div className="yourlist__card-div">
                            <Card.Header className="yourlist__card-header">
                              <div className="header__name-product">Name Product : {ingredient_item_customers_grocery.product_name}</div>
                            </Card.Header>
                            <Card.Text className="yourlist__card-text">
                              Product Price :  {ingredient_item_customers_grocery && ingredient_item_customers_grocery.product_price}
                            </Card.Text>
                            <Card.Text className="yourlist__card-text">
                              Product Size : {ingredient_item_customers_grocery.sizes}
                            </Card.Text>
                          </div>
                          <div className="yourlist__buttonAdd"><Button onClick={e => {
                            e.stopPropagation();
                            this.handleShowAddItem(idItem);
                          }}> Add To Cart</Button> </div>
                          <div className="yourlist__buttonDelete"><i className="fa fa-remove" onClick={e => {
                            e.stopPropagation();
                            this.handleShowDeleteItem(ingredient_item_customers_grocery.id);
                          }} ></i></div>
                        </Col>
                      </>
                    })
                  ) : <Spinner animation="border" variant="info" />}
                </Row>
              ) : (
                  <></>
                )};
             </Container>
          </>
        ) : (
            <>
              {/* display create list option if customer has no grocery list */}
              <div>Log in as guest or user to load your grocery list</div>
              <Button className="yourlist__button-create" onClick={this.handleShowGroceryList}>create list</Button>
              {/* display log in pop-up on grocery page. (May be best to separate this into its own fileLoader, to be used on any page) */}
              <Container>
                <Modal show={true} onHide={this.handleClose} className="modal loginformmm" backdrop="static">
                  <Modal.Body>
                    <Form className="login__form">
                      <div className="login__form-div-title">
                        <h2 className="login__form-title">Log in to View Grocery</h2>
                      </div>
                      <div className="vl">
                        <span className="vl-innertext">or</span>
                      </div>
                      <div className="col">
                        <button className="fb btn">
                          <i className="fa fa-facebook fa-fw"></i> Login with Facebook
                        </button>
                        <button className="google btn"><i className="fa fa-google fa-fw">
                        </i> Login with Google+
                        </button>
                      </div>

                      <Form.Group>
                        <Form.Label className="login__form__label">Email</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          value={email}
                          placeholder="Enter your email"
                          onChange={this.handleChange}
                          className='login__form__input'
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="login__form__label">Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={password}
                          placeholder="Enter your password"
                          onChange={this.handleChange}
                          className='login__form__input'

                        />
                      </Form.Group>
                      <p className="msg-success">{messageSuccess}</p>
                      <p className="msg-err">{messageErr}</p>
                      <Link to="/forgotpass">
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
                         <Link className="link-guest-word" to="/v2">
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

    /* Move Create List option to suggest meal */ 
    /* <Container>
              {showGroceryList ? (
                <Modal show={showGroceryList} onHide={this.handleClose} backdrop="static" className="modal-create">
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
                    {messageErrCreate ? (
                      <p className="create__msg-err">{messageErrCreate}</p>
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
              ) : <div>No list to show</div>}
                    </Container> 
                  
                    handleCreateList = () => {
    const { lasIdListState, valueProductName, valueProductImage, valueProductPrice, valuePricePerOunce, valueProductSize } = this.state;
    // if (valueProductName && valueProductImage && valueProductPrice && valueProductSize && valuePricePerOunce) {
    //   if (valueProductImage.startsWith('http://') || valueProductImage.startsWith('data') || valueProductImage.endsWith('png') || valueProductImage.endsWith('jpg') || valueProductImage.endsWith('gif')) {

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
          const { customerList } = this.state;
          this.setState({ customerList: [...customerList, ...response.data], errormsgImage: '', errormsg: '', valueProductName: '', valueProductImage: '', valueProductSize: '', valueProductPrice: '', valuePricePerOunce: '', lasIdListState: lasIdListState + 1 })
        }
      })

    //     } else {
    //     this.setState({ messageErrCreate: 'should be the image start word  "data" or "http" or end word "png" , "jpg","gif" ' })
    //   }
    // } else {
    //   this.setState({ messageErrCreate: 'should be sure fill all fields ' })
    // }

  }
*/}}
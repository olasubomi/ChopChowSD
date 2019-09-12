/* eslint-disable no-unused-expressions */
import React from 'react';
import './style.css';
import PageTitle from '../CommonComponents/PageTitle'
import { Spinner } from 'react-bootstrap'
import { Container, Alert, Card, Col, Row, Form, Button, Modal } from 'react-bootstrap'
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import CartPage from './CartPage'
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
    showAlert:false,
    messageAlert: '',
    variant:'',
    show: false,
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
    lasIdListState:null,
    valueId: '',
    valueProductName: '',
    valueProductImage: '',
    valueProductPrice: '',
    valueProductSize: '',
    valuePricePerOunce: '',
    propsInfoCart: '',
    infoCart: ''
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
            this.setState({ loading: false })
            window.location.href = '/grocery'
        // this.props.history.push('/grocery')
            
            return this.setState({ messageSuccess: 'login sucessfully ', messageErr: '', Authentication: true })
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
      .then(res => {
        console.log('resgreoccc',res);
        
        return res.json()

      })
      .then(response => {
        console.log('alalalalala',response.data)
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
          .then(res => {
            console.log('resvaalalla',res);
            
         return   res.json()
          }
            
            
            )
          .then(response => {
            console.log('vvvvaaaalll',response)
            if (response) {//all lists for this customer
              this.setState({ valueData: response.data })
            }

          }).catch(() => {
            this.setState({ message: 'Sorry , Internal Server ERROR' })
          })

      })
    //  this.handleAddToCart=(itemList)=>{
    //    console.log(4444,itemList);
    //   //  this.setState({ showInsert: true });
    //   // this.setState({valueItemId:itemList})

    //       // window.location.href = '/cart-page'
    //   }
    this.handleClose = e => {
      if (e) e.stopPropagation();
      this.setState({ showRemove: false });
    };
    this.handleShowDeleteItem = (idItem) => {
      console.log(7878787,idItem);
      
      this.setState({deletedItemId: idItem});
      const { customerId, deletedItemId } = this.state;
      fetch(`/api/remove-item/${idItem}/${customerId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

      })
        .then(res => {
          console.log('res200',res);
          
          return res.json()

        })
        .then(response => {
          console.log('response delted',response);
          
          // this.setState({ message: 'deleted successfull' })
          this.setState({
            messageAlert: 'deleted successfully',
            showAlert:true,
            variant:'success'
          },
          ()=>
          setTimeout(()=>{
            this.setState({ messageAlert: '', showAlert: false})
          },3500)
          )
          this.setState(prevState => {
            const newValueData = prevState.valueData.filter(
              item => item.id !== deletedItemId
            );
            return { valueData: newValueData };
          });

        })
        .catch(() => this.setState({ messageErr: 'Sorry , Internal Server Error' })
        )

    }
    this.handleShowAddItem = (itemList) => {
      const { infoCart } = this.state;
      console.log('andle sho add item', itemList);
      //  console.log('85aaaaaaa',this.props.infoItem)
      this.setState({ infoCart: itemList })

      this.setState({ showInsert: true });
      // this.props.infoItem = this.state.infoCart;
      // this.setState({propsInfoCart:this.props.infoItem})
      // this.setState({propsInfoCart:infoCart})


    }
    //  this.handleAddToCart=(idItem) =>{
    //   this.setState({  showInsert: true });
    //   this.setState({deletedItemId:idItem})
    // }

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
        console.log(8582552,response);
        let arrResItemDelete=response.data
        arrResItemDelete.map(resDelete=>{

          this.setState({deletedItemsId:resDelete})
        })
            // this.setState({ idsItems: response.data })
          }

        }).catch(() => {
          this.setState({ message: 'Sorry , Internal Server ERROR' })
        })
      // this.setState({  showRemoveList: true });
      const {deletedItemsId}=this.state
      fetch(`/api/remove-list/${customerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },

      })
        .then(res => {
          console.log(5555555, res);

          return res.json()

        })
        .then(response => {
          console.log(65625,response);
          
          this.setState(prevState => {
            const newValueData = prevState.valueData.filter(
              item => item.id !== deletedItemsId
            );
            this.setState({ valueData: newValueData }) ;
            this.setState({
              messageAlert: 'deleted successfully',
              showAlert:true,
              variant:'success'
            },
            ()=>
            setTimeout(()=>{
              this.setState({ messageAlert: '', showAlert: false})
            },4000)
            )
          });
        })
    }


    this.handleShowCreateList = () => {
      this.setState({ showCreate: true })

    }
    this.handleCreateList = () => {
      const { lasIdListState,showCreate, valueId, valueProductName, valueProductImage, valueProductPrice, valuePricePerOunce, valueProductSize } = this.state;
      const { customerId } = this.state;
      const idItem = lasIdListState;
      fetch(`/api/create-list/${idItem}/${customerId}`, {
        method: 'POST',
        credentials: 'same-origin',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: valueProductName,
          product_image: valueProductImage,
          product_price: valueProductPrice,
          sizes: valueProductSize,
          price_per_ounce: valuePricePerOunce
        }),
      })
        .then(res => {
          console.log(6666, res);
          return res.json();

        })
        .then(response => {
          console.log(8888, response);
          // this.setState({ messageSuccess: 'add successfull' })
        })


        
 
}
    
    fetch('/api/get-ids-list', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },

    })
    .then(res=>{
      console.log('fgfalaa',res);
      return res.json()
    })
    .then(response=>{
      console.log('respppppp',response.data);
      let arrResponse= response.data;
     const lasIdList= arrResponse[arrResponse.length-1]
     console.log('lasIdListnnnnn',lasIdList+1);
     this.setState({lasIdListState:lasIdList+1})
     
    })
  }



  render() {
    const {deletedItemsId,showAlert, variant,messageAlert,lasIdListState,valueData, infoCart, propsInfoCart, deletedItemId, idItem, idsItems, showCreate, valueId, customerId, showRemoveList, valueProductName, valueProductImage, valueProductSize, valueProductPrice, valuePricePerOunce, message, email, password, messageErr, messageSuccess, show, addListClick, deleteListClick, showInsert, showRemove } = this.state;
    const { auth } = this.props;
const {infoItemOption} = this.props
    console.log('valuedata',valueData);
    console.log('lasIdListStatejkfjffj',lasIdListState);
    console.log(1010101,deletedItemsId);
    
    console.log(7777777, idsItems);
    console.log('alaaaaa', idItem);
    console.log(3636, deletedItemId);
    console.log(9999999999999999999, showInsert);
    console.log(22222222222222, infoCart);



    return (
      <>
        {auth ? (
          <>
            <PageTitle title=" Your Grocery List" />
            {/* {message && <Alert variant="danger">{message}</Alert>} */}
            
            <Container className="page__container">

            {/* infoItemOption:  {infoItemOption} */}
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
                   <Alert show={showAlert} key={1} variant={variant}>
                    {messageAlert}
                  </Alert>
                  {/* {showRemoveList ? (
                    <Modal show={showRemoveList} onHide={this.handleClose}>
                      <Modal.Body>
                        Are you sure to delete all this items ?!
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
                          onClick={this.handleDeleteList(customerId)}

                        >
                          Delete
                                  </Button>
            {messageSuccess && <Alert variant="danger">{messageSuccess}</Alert>} */}
           
                      {/* </Modal.Footer>
                    </Modal>
                  ) : null} */}
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
                            this.handleShowAddItem(itemList);
                          }}> Add To Cart</Button> </div>
                          {console.log(55555, showInsert)
                          }
                          {showInsert?(
                          <Modal show={showInsert} onHide={this.handleClose} className='insert'>
                                <Modal.Body className='insert'>
                                 cart pazge , idfdfdfd {idItem}
                                   <div>No.List>>{infoCart.id}>></div>
                                  <div>Name Product : {infoCart.product_name}</div>
                                  <div> Product Price :  {infoCart.product_price}</div>
                                  <div> Product Size : {infoCart.sizes}</div>
                                </Modal.Body>
                                <Modal.Footer className="confirm__delete">
                                



                                  <Button
                                    variant="secondary"
                                    onClick={this.handleClose}
                                    >
                                    Close
                                  </Button>

                                  
                                </Modal.Footer>
                              </Modal>
                          ):null}
                          {/* {showInsert ? (
                            <Route
                              exact
                              path="/cart-page"
                              render={props => (
                                //  <CartPage cartInfo={infoCart} />
                                <>
                                  kkkkkk
                              {/* <div>No.List>>{itemList.id}>></div>
                              <div>Name Product : {itemList.product_name}</div>
                              <div> Product Price :  {itemList.product_price}</div>
                              <div> Product Size : {itemList.sizes}</div> */}
                                {/* </>
                              )}

                            /> */}

                          {/* ) : null} */} 
                          <div className="yourlist__buttonDelete"><i class="fa fa-remove" onClick={e => {
                            e.stopPropagation();
                            this.handleShowDeleteItem(itemList.id);
                          // {console.log(565656,itemList.id)
                          // }
                          }} ></i></div>
            {/* {message && <Alert variant="danger">{message}</Alert>} */}

            <Alert show={showAlert} key={1} variant={variant}>
                    {messageAlert}
                  </Alert>
                          {/* {showRemove ? (
                            <Modal show={showRemove} onHide={this.handleClose}>
                              <Modal.Body>
                                Are you sure to delete this item ?!
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
                                  onClick={this.handleDeleteItem(itemList.id)}

                                >
                                  {console.log('id item',idItem)
                                  }
                                  Delete
                                  </Button>
                                <span>{messageSuccess}</span>
                              </Modal.Footer>
                            </Modal>
                          ) : null} */}

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
                            {/* <Form.Label>Product Id:</Form.Label> */}
                            {/* <Form.Control
                              type="number"
                              name="valueId"
                              value={valueId}
                              placeholder="Enter id list"
                              onChange={this.handleChange}
                            /> */}
                            <Form.Label>Product Id: {lasIdListState}</Form.Label>
                                  
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

                          {/* <p className="msg-success">{messageSuccessCreate}</p>
                          <p className="msg-err">{messageErrCreate}</p> */}
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
                            onClick={this.handleCreateList}
                          >
                            create
                                  </Button>
                          {/* <span>{messageSuccess}</span> */}
                        </Modal.Footer>
                      </Modal>
                    ) : null}
                  </>
                )}
            </Container>
          </>
        ) : (

            <>
              {/* {loading?(
              
              <Spinner animation="border" variant="info" />
              ):null} */}
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
                              <Link className="link-guest-word" to="/grocery-empty">
                        continue as guest
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

                        <Button className="yourlist__buttonAdd"
                        // onClick={this.handleAddToCart(idItem)}

                        >Add To Cart</Button>
                        {/* <div className="yourlist__buttonDelete"><i class="fa fa-remove" onClick={this.handleRemoveFromCart} ></i></div> */}
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

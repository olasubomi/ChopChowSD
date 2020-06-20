import React from "react";
import "./style.css";
import PageTitle from "../CommonComponents/PageTitle";
import { Spinner } from "react-bootstrap";
import { Container, Alert, Card, Col, Row, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

export default class GroceryPage extends React.Component {
  // Mongo
  _isMounted = false;
  products = [];
  productNamesForTypeahead = new Map();

  state = {
    customerList: null,
    Authentication: false,
    customerId: null,
    email: "",
    password: "",

    messageErr: false,
    messageSuccess: false,
    messageErrCreate: false,
    showAlert: false,
    messageAlert: "",

    variant: "",
    productID: "",
    deletedItemId: null,
    selectedProduct: null,
    idsItems: null,
    deletedItemsId: null,
    lasIdListState: null,
    valueProductName: "",
    valueProductImage: "",
    valueProductPrice: "",
    valueProductSize: "",
    valuePricePerOunce: "",
    errormsg: "",
    typeAheadAdded: false,
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      const { auth, customerId } = this.props;
      this.setState({ Authentication: auth });
      this.setState({ customerId: customerId });
      this.getCustomerList(customerId);
    }
  }

  componentWillReceiveProps(nextProps) {
    // checks if user is already logged in in app.
    const { auth, customerId } = nextProps;
    console.log("comes in grocery page cdm");
    this.setState({ Authentication: auth });
    this.setState({ customerId: customerId });

    console.log("this.props, ", nextProps);

    if (auth === true) {
      // or if (customerId !== null) , grocery page not displaying after login click
      this.getCustomerList(customerId);
    }
  }
  getCustomerList = (customerId) => {
    var localToken = window.localStorage.getItem("userToken");
    console.log("customder id  iss: " + customerId);
    var url = `./api/getCustomerGroceryList/${customerId}`;
    // var url = `http://localhost:5000/api/getCustomerGroceryList/${customerId}`

    fetch(url, {
      method: "GET",
      // credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localToken,
      },
    })
      .then((res) => {
        console.log("customer list response is ");
        console.log(res);
        return res.json();
      })
      .then((response) => {
        if (response) {
          this.setState({ customerList: response.data });
        }
      })
      .catch(() => {
        this.setState(
          {
            messageAlert:
              "Authentication Error while fetching your grocery list...",
            showAlert: true,
            variant: "danger",
          },
          () =>
            setTimeout(() => {
              this.setState({ messageAlert: "", showAlert: false });
            }, 8000)
        );
      });

    // url = "https://chopchowdev.herokuapp.com/api/get-all-products";
    // url = `http://localhost:5000/api/get-all-products`
    url = "./api/get-all-products";
    // or should we call this in App.js and pass it as a prop ??

    fetch(url, {
      method: "GET",
      // credentials: 'include',
      // headers: {
      //   'Content-Type': 'application/json',
      // }
    })
      .then((res) => res.text())
      .then((body) => {
        // console.log("should print body");
        // console.log(body);
        var productsList = JSON.parse(body);
        console.log("PRINTING ALL PRODUCTS LIST");
        // console.log(productsList);
        if (productsList && productsList.data.length !== 0) {
          console.log("returns GET ALL PRODUCTS ");
          console.log(productsList.data.length);
          for (var i = 0; i < productsList.data.length; i++) {
            this.products.push(productsList.data[i]);
            this.productNamesForTypeahead.set(
              productsList.data[i].product_name,
              productsList.data[i].id
            );
          }
          console.log(this.products);
          console.log(this.productNamesForTypeahead);
        } else {
          console.log("get all products function does not return");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleShowDeleteItem = (productID) => {
    this.setState({ deletedItemId: productID });
    const { customerId, deletedItemId } = this.state;
    // var url = `https://chopchowdev.herokuapp.com/api/remove-item/${productID}/${customerId}`
    var url = `./api/remove-item/${productID}/${customerId}`;

    fetch(url, {
      method: "DELETE",
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        this.setState(
          {
            messageAlert: "deleted successfully",
            showAlert: true,
            variant: "success",
          },
          () =>
            setTimeout(() => {
              this.setState({ messageAlert: "", showAlert: false });
            }, 3500)
        );
        this.setState((prevState) => {
          // delete item on client side
          const newValueData = prevState.customerList.filter(
            // do we need catch sttmnt for filter
            (item) => item.id !== deletedItemId
          );
          return { customerList: newValueData };
        });
        console.log("Delets item");
        this.componentDidMount();
      })
      .catch(() => {
        this.setState(
          {
            messageAlert: "Internal Server Error while deleting item",
            showAlert: true,
            variant: "danger",
          },
          () =>
            setTimeout(() => {
              this.setState({ messageAlert: "", showAlert: false });
            }, 8000)
        );
      });
  };

  handleDeleteList = () => {
    console.log("Comes in deletes list");
    const { customerId } = this.state;
    var url = `https://chopchowdev.herokuapp.com/api/remove-list/${customerId}`;
    // var url = `./api/remove-list/${customerId}`

    fetch(url, {
      method: "DELETE",
      // headers: {
      //   'Content-Type': 'application/json',
      // }
    })
      .then((response) => {
        console.log("delete response is: ");
        console.log(response);
        console.log(response.json);
        this.setState(
          {
            messageAlert: "deleted successfully",
            showAlert: true,
            variant: "success",
          },
          () =>
            setTimeout(() => {
              this.setState({ messageAlert: "", showAlert: false });
            }, 3500)
        );

        this.setState({ customerList: [] });
        this.componentDidMount();
        console.log("deletes list");
        return response.json();
      })
      .catch(() => {
        console.log("caught an error while deleting list");
        this.setState(
          {
            messageAlert: "Internal Server Error while deleting list",
            showAlert: true,
            variant: "danger",
          },
          () =>
            setTimeout(() => {
              this.setState({ messageAlert: "", showAlert: false });
            }, 8000)
        );
      });
  };

  handleClickTypeahead = (selected) => {
    this.setState({ selectedProduct: selected });
    // var arrayOfProductNames = Array.from(this.productNamesForTypeahead.keys());

    console.log("selected is:");
    console.log(selected[0]);
    console.log(typeof selected[0]);
    console.log("array of product names is:");
    console.log(this.productNamesForTypeahead);

    this.productNamesForTypeahead.get(selected);

    // var index = arrayOfProductNames.findIndex((el) => el === selected[0]);
    var productID = this.productNamesForTypeahead.get(selected[0]);
    console.log("productID is: " + productID);
    console.log("customer id is: " + this.state.customerId);
    if (!isNaN(productID)) {
      // var url = `https://chopchowdev.herokuapp.com/api/addTypeaheadDataToCustomerGroceryList/${productID}/${this.state.customerId}`
      var url = `./api/addTypeaheadDataToCustomerGroceryList/${productID}/${this.state.customerId}`;
      fetch(url, {
        method: "POST",
        // headers: {
        //   Accept: 'application/json',
        // //   'Content-Type': 'application/json',
        // },
      }).then((response) => {
        // .then(res => {
        // return res.json();
        // })
        if (response) {
          this.setState(
            {
              messageAlert: "product added successfully",
              showAlert: true,
              variant: "success",
            },
            () =>
              setTimeout(() => {
                this.setState({ messageAlert: "", showAlert: false });
              }, 3500)
          );
          // const { customerList } = this.state;
          console.log("Comes in handleClickTypeahead's then on client side");
          this.componentDidMount();
          // this.setState({ typeAheadAdded : !this.state.typeAheadAdded })
        }
      });
    }
  };

  render() {
    const { showAlert, variant, messageAlert, customerList } = this.state;
    console.log("Authentication, ", this.state.Authentication);
    console.log("customerId, ", this.state.customerId);
    console.log("customerList, ", this.state.customerList);

    return (
      <>
        <Typeahead
          // multiple
          options={Array.from(this.productNamesForTypeahead.keys())}
          placeholder="Add products to your grocery list here.."
          id="typeahead"
          onChange={(selected) => {
            // console.log(selected);
            this.handleClickTypeahead(selected);
          }}
        // filterBy={['product_name']}
        />

        {/* Display alert if there is any issue loading grocery page */}
        <Alert show={showAlert} key={1} variant={variant}>
          {messageAlert}
        </Alert>

        {this.state.messageVisible ? (
          <div>
            you can not add in this item because it is already in customers
            grocery list
          </div>
        ) : null}
        {this.state.Authentication ? (
          <>
            <PageTitle title=" Your Grocery List" />

            <div>
              {/* display customers list */}
              {/* <Row> */}
              {/* <Col xs={12} md={8} lg={4} key="delete_col"> */}

              <Button
                className="yourlist__buttonDeleteList"
                variant="danger"
                onClick={(e) => {
                  e.stopPropagation();
                  this.handleDeleteList();
                }}
              >
                Delete List Items
              </Button>
              {/* </Col> */}
              {/* </Row> */}
              <br></br>
              <Container className="page__container" fluid>
                {/* display grocery list, for any authenticated customer */}
                {customerList ? (
                  customerList.map((customer_grocery_product_item) => {
                    let productID = customer_grocery_product_item.id;
                    return (
                      // <>
                      <Row
                        display="inline-flex"
                        key={customer_grocery_product_item.id}
                      >
                        <Col key={customer_grocery_product_item.id}>
                          {/* check for private or public images (can be used for suggest meal) */}
                          {customer_grocery_product_item.product_image.startsWith(
                            "http://"
                          ) ||
                            customer_grocery_product_item.product_image.startsWith(
                              "data"
                            ) ? (
                              <img
                                src={`${customer_grocery_product_item.product_image}`}
                                alt="product_img "
                                className="card-img"
                              />
                            ) : (
                              <img
                                src={`/images/products/${customer_grocery_product_item.product_image}`}
                                alt="product_img "
                                className="card-img"
                              />
                            )}
                        </Col>

                        <Col>
                          <Card.Title className="grocery_item_card-header">
                            Product Name :{" "}
                            {customer_grocery_product_item.product_name}
                          </Card.Title>
                          <Card.Text>
                            Product Price :{" "}
                            {customer_grocery_product_item &&
                              customer_grocery_product_item.product_price}
                            <br></br>
                            Product Size : {customer_grocery_product_item.sizes}
                          </Card.Text>
                        </Col>

                        <Col>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              this.handleAddItemToCart(productID);
                            }}
                          >
                            {" "}
                            Add To Cart
                          </Button>
                        </Col>
                        <Col>
                          <i
                            className="fa fa-remove"
                            onClick={(e) => {
                              e.stopPropagation();
                              this.handleShowDeleteItem(
                                customer_grocery_product_item.id
                              );
                            }}
                          ></i>
                        </Col>
                      </Row>
                    );
                  })
                ) : (
                    <Spinner animation="border" variant="info" />
                  )}
              </Container>
            </div>
          </>
        ) : (
            <>
              {/* <Login /> */}
              <div>
                Log into your account or continue as guest to load your grocery
                list
            </div>
            </>
          )}
      </>
    );

    /* Move Create List option to suggest meal */
    // handleClose = e => {
    //   if (e) e.stopPropagation();
    //   this.setState({ showGroceryList: false });
    // };

    // handleShowGroceryList = () => {
    //   this.setState({ showGroceryList: true })
    // }

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
    const productID = lasIdListState;
    var url = "https://chopchowdev.herokuapp.com/api/get-all-products";
    // var url = "http://localhost:5000/api/get-all-products"
    fetch(`/api/create-list/${productID}/${customerId}`, {
      method: 'POST',
      body: JSON.stringify({
        valueProductName,
        valueProductImage,
        valueProductPrice,
        valueProductSize,
        valuePricePerOunce,fdeleted successfully

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
*/
  }
}

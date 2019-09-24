// import React from 'react';
// import './style.css';
// import { Button, Form, Modal } from 'react-bootstrap';
// import {Link} from 'react-router-dom'

// export default class CartPage extends React.Component {
//     state = {
//         dataTypeaheadState: '',
//         cartTrue: false,
//         valueData: null,
//         Authentication: false,
//         customerId: null,
//         messageErrServer: null,
//         email: '',
//         password: '',
//         messageErr: false,
//         messageSuccess: false,
//         showAlert: false,
//         messageAlert: '',
//         variant: '',
//         showSignup: false,
//         loading: false,
//         valueItemId: null,
    
//         idItem: '',
//         deleteListClick: false,
//         showInsert: false,
//         showRemove: false,
//         deletedItemId: null,
//         addItemId: null,
//         showRemoveList: false,
//         showCreate: false,
//         idsItems: null,
//         deletedItemsId: null,
//         lasIdListState: null,
//         valueId: '',
//         valueProductName: '',
//         valueProductImage: '',
//         valueProductPrice: '',
//         valueProductSize: '',
//         valuePricePerOunce: '',
//         propsInfoCart: '',
//         infoCart: '',
//         showLogin: false,
//         firstname: '',
//         lastname: '',
//         password: '',
//         phoneNumber: '',
//         street: '',
//         city: '',
//         zipCode: '',
//         ipsid: '',
//         errormsg: '',
//         showSignup: false
//       }
//   componentDidMount() {
//       this.handleShowLogin = () => {
//         this.setState({ showLogin: true })
//       }
//     //   this.handleShowSignup = () => {
//     //     this.setState({ showSignup: true })
//     //   }
//     this.handleClickSignup = () => {
//       const { firstname, lastname, email, password, confPassword, phoneNumber, street, city, zipCode, ipsid } = this.state;
//       if (firstname && lastname && email && password && confPassword && phoneNumber && street && city && zipCode && ipsid) {
//         // make a requset to the back with method post and data{email , password}
  
//         signupValidation
//           .validate(
//             {
//               firstname,
//               lastname,
//               email,
//               password,
//               confPassword,
//               phoneNumber,
//               street,
//               city,
//               zipCode,
//               ipsid
//             },
//             { abortEarly: false }
//           )
//           .then(() => {
  
//             fetch('/api/signup', {
//               method: 'POST',
//               credentials: 'include',
//               headers: {
//                 'Content-type': 'application/json',
//               },
//               body: JSON.stringify({
//                 firstname,
//                 lastname,
//                 email,
//                 password,
//                 confPassword,
//                 phoneNumber,
//                 street,
//                 city,
//                 zipCode,
//                 ipsid
//               }),
//             })
//               .then(response => {
//                 if (response.status === 400 || response.status === 404) {
//                   this.setState({ messageErr: 'Bad Request , This Email is exist so,try enter another email,please... !!' });
//                 } else if (response.status === 401) {
//                   this.setState({ messageErr: 'you are UnAuthorized' });
//                 } else if (response.status >= 500) {
//                   this.setState({ messageErr: 'Sorry , Internal Server ERROR' })
//                 } else {
//                   // window.location.href = '/grocery'
//                   return this.setState({ messageSuccess: 'signup sucessfully ', messageErr: '', Authentication: true })
//                 }
//               })
//           })
//           .catch(({ inner }) => {
//             if (inner) {
//               const errors = inner.reduce(
//                 (acc, item) => ({ ...acc, [item.path]: item.message }),
//                 {}
//               );
//               this.setState({ errormsg: { ...errors } });
//             }
//           })
//       } else {
//         this.setState({ messageErr: 'Please enter all fields' });
//       }
//     };
  

//   }
//   render() {
//     const { firstname, lastname, email, password, phoneNumber, street, city, zipCode, ipsid, showLogin, confPassword, errormsg, idItem, cartTrue, valueProductName, deletedItemsId, showAlert, variant, messageAlert, lasIdListState, valueData, infoCart, propsInfoCart, deletedItemId, idsItems, showCreate, valueId, customerId, showRemoveList, valueProductImage, valueProductSize, valueProductPrice, valuePricePerOunce, message, messageErr, messageSuccess, showSignup, addListClick, deleteListClick, showInsert, showRemove } = this.state;


//     return (
//       <>
// <Modal show={true} onHide={this.handleClose} className="modal" backdrop="static">
//                   <Modal.Body>
//                     <Form className="content-signup">
//                       <h2 className="content-signup__word-sigup">SIGN UP</h2>
//                       <Form.Group controlId="formBasicUsername">
//                         <Form.Label className="content-signup__form-label">
//                           First Name :{' '}
//                           <span className="content-signup__username-star">*</span>
//                         </Form.Label>
//                         <Form.Control
//                           name="firstname"
//                           value={firstname}
//                           onChange={this.handleChange}
//                           type="firstname"
//                           placeholder="e.g: emily1234"
//                           className="content-signup__form-input"
//                         />
//                         {!messageSuccess  ||!messageErr || errormsg ? (

//                           <span className="errormsg">{errormsg.firstname}</span>
//                         ) : null}
//                       </Form.Group>

//                       <Form.Group controlId="formBasicUsername">
//                         <Form.Label className="content-signup__form-label">
//                           Last Name :{' '}
//                           <span className="content-signup__username-star">*</span>
//                         </Form.Label>
//                         <Form.Control
//                           name="lastname"
//                           value={lastname}
//                           onChange={this.handleChange}
//                           type="text"
//                           placeholder="e.g: emily1234"
//                           className="content-signup__form-input"

//                         />
//                         {!messageSuccess || !messageErr || errormsg ? (

//                           <span className="errormsg">{errormsg.lastname}</span>
//                         ) : null}

//                       </Form.Group>
//                       <Form.Group controlId="formBasicEmail">
//                         <Form.Label className="content-signup__form-label">
//                           E-mail : <span className="content-signup__email-star">*</span>
//                         </Form.Label>
//                         <Form.Control
//                           name="email"
//                           value={email}
//                           onChange={this.handleChange}
//                           type="email"
//                           placeholder="example@mail.com"
//                           className="content-signup__form-input"

//                         />
//                         {!messageSuccess || !messageErr || errormsg ? (

//                           <span className="errormsg">{errormsg.email}</span>
//                         ) : null}

//                       </Form.Group>
//                       <Form.Group controlId="formBasicPassword">
//                         <Form.Label className="content-signup__form-label">
//                           Password :{' '}
//                           <span className="content-signup__password-star">*</span>
//                         </Form.Label>
//                         <Form.Control
//                           name="password"
//                           value={password}
//                           onChange={this.handleChange}
//                           type="password"
//                           placeholder="Password"
//                           className="content-signup__form-input"

//                         />
//                         {!messageSuccess || !messageErr || errormsg ? (

//                           <span className="errormsg">{errormsg.password}</span>
//                         ) : null}

//                       </Form.Group>
//                       <Form.Group controlId="formBasicPassword">
//                         <Form.Label className="content-signup__form-label">
//                           Confirm Password :{' '}
//                           <span className="content-signup__confirm-password-star">*</span>
//                         </Form.Label>
//                         <Form.Control
//                           name="confPassword"
//                           value={confPassword}
//                           onChange={this.handleChange}
//                           type="password"
//                           placeholder="Password"
//                           className="content-signup__form-input"

//                         />
//                         {!messageSuccess || !messageErr || errormsg ? (

//                           <span className="errormsg">{errormsg.confPassword}</span>
//                         ) : null}

//                       </Form.Group>
//                       <Form.Group controlId="formBasicUsername">
//                         <Form.Label className="content-signup__form-label">
//                           Phone Number  :{' '}
//                           <span className="content-signup__username-star">*</span>
//                         </Form.Label>
//                         <Form.Control
//                           name="phoneNumber"
//                           value={phoneNumber}
//                           onChange={this.handleChange}
//                           type="number"
//                           placeholder="e.g: emily1234"
//                           className="content-signup__form-input"

//                         />
//                         {!messageSuccess || !messageErr || errormsg ? (

//                           <span className="errormsg">{errormsg.phoneNumber}</span>
//                         ) : null}

//                       </Form.Group>
//                       <Form.Group controlId="formBasicUsername">
//                         <Form.Label className="content-signup__form-label">
//                           Street :{' '}
//                           <span className="content-signup__username-star">*</span>
//                         </Form.Label>
//                         <Form.Control
//                           name="street"
//                           value={street}
//                           onChange={this.handleChange}
//                           type="text"
//                           placeholder="e.g: emily1234"
//                           className="content-signup__form-input"

//                         />
//                         {!messageSuccess || !messageErr || errormsg ? (

//                           <span className="errormsg">{errormsg.street}</span>
//                         ) : null}

//                       </Form.Group>
//                       <Form.Group controlId="formBasicUsername">
//                         <Form.Label className="content-signup__form-label">
//                           city :{' '}
//                           <span className="content-signup__username-star">*</span>
//                         </Form.Label>
//                         <Form.Control
//                           name="city"
//                           value={city}
//                           onChange={this.handleChange}
//                           type="text"
//                           placeholder="e.g: emily1234"
//                           className="content-signup__form-input"

//                         />
//                         {errormsg && <span className="errormsg">{errormsg.city}</span>}
//                         {!messageSuccess || !messageErr || errormsg ? (

//                           <span className="errormsg">{errormsg.city}</span>
//                         ) : null}
//                       </Form.Group>
//                       <Form.Group controlId="formBasicUsername">
//                         <Form.Label className="content-signup__form-label">
//                           zip Code :{' '}
//                           <span className="content-signup__username-star">*</span>
//                         </Form.Label>
//                         <Form.Control
//                           name="zipCode"
//                           value={zipCode}
//                           onChange={this.handleChange}
//                           type="number"
//                           placeholder="e.g: emily1234"
//                           className="content-signup__form-input"

//                         />
//                         {!messageSuccess || !messageErr || errormsg ? (

//                           <span className="errormsg">{errormsg.zipCode}</span>
//                         ) : null}
//                       </Form.Group>

//                       <Form.Group controlId="formBasicUsername">
//                         <Form.Label className="content-signup__form-label">
//                           Ips Id :{' '}
//                           <span className="content-signup__username-star">*</span>
//                         </Form.Label>
//                         <Form.Control
//                           name="ipsid"
//                           value={ipsid}
//                           onChange={this.handleChange}
//                           type="number"
//                           placeholder="e.g: emily1234"
//                           className="content-signup__form-input"

//                         />
//                         {!messageSuccess && !messageErr && errormsg ? (

//                           <span className="errormsg">{errormsg.ipsid}</span>
//                         ) : null}
//                       </Form.Group>
//                       <p className="msg-success">{messageSuccess}</p>
//                       <p className="msg-err">{messageErr}</p>
//                       <Button
//                         variant="primary"
//                         className="content-signup__submit"
//                         onClick={this.handleClickSignup}
//                       >
//                         Sign Up
//           </Button>
//                       <Form.Text className="content-signup__text-muted">
//                         Already have an account?{' '}
//                         <Link to='login' className="content-signup__word-login" >
//                           login

//                       </Link>
//                       </Form.Text>
//                     </Form>
//                   </Modal.Body>
//                 </Modal>
//             </>
//     )
//         }
//       }





import React from 'react';
import './style.css';
import { Form, Button, Container ,Modal} from 'react-bootstrap';

 import { Link, Redirect } from 'react-router-dom';
 import signupValidation from '../GroceryPage/validationSignup';

 export default class Signup extends React.Component {
  state = {
    newcustomerId:'',
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
            showSignup: false
  };
componentDidMount(){
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
  this.handleClickSignup = () => {
         const {newcustomerId, firstname, lastname, email, password, confPassword, phoneNumber, street, city, zipCode, ipsid } = this.state;
      if (newcustomerId,firstname && lastname && email && password && confPassword && phoneNumber && street && city && zipCode && ipsid) {
        // make a requset to the back with method post and data{email , password}
  
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
}

   handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

   render() {
    const { firstname, lastname, email, password, phoneNumber, street, city, zipCode, ipsid, showLogin, confPassword, errormsg, idItem, cartTrue, valueProductName, deletedItemsId, showAlert, variant, messageAlert, lasIdListState, valueData, infoCart, propsInfoCart, deletedItemId, idsItems, showCreate, valueId, customerId, showRemoveList, valueProductImage, valueProductSize, valueProductPrice, valuePricePerOunce, message, messageErr, messageSuccess, showSignup, addListClick, deleteListClick, showInsert, showRemove } = this.state;
    
    return (
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
                        {!messageSuccess  ||!messageErr || errormsg ? (

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
        </Container>
      </>
    );
  }
  
}

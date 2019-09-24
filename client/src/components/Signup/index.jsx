
import React from 'react';
import './style.css';
import { Form, Button, Container, Modal } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import signupValidation from '../GroceryPage/validationSignup';

export default class Signup extends React.Component {
  state = {
    newcustomerId: '',
    Authentication: false,
    email: '',
    password: '',
    messageErr: false,
    messageSuccess: false,
    variant: '',
    firstname: '',
    lastname: '',
    password: '',
    phoneNumber: '',
    street: '',
    city: '',
    zipCode: '',
    ipsid: '',
    errormsg: '',
  };
  componentDidMount() {
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
      const { newcustomerId, firstname, lastname, email, password, confPassword, phoneNumber, street, city, zipCode, ipsid } = this.state;
      if ( firstname && lastname && email && password && confPassword && phoneNumber && street && city && zipCode && ipsid) {
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
    const { firstname, lastname, email, password, phoneNumber, street, city, zipCode, ipsid,  confPassword, errormsg, messageErr, messageSuccess } = this.state;

    return (
      <>
        <Container>
          <Modal show={true} onHide={this.handleClose} className="modal" backdrop="static">
            <Modal.Body>

              <Form className="signup__form">
                <div className="signup__form-div-title">
                  <h2 className="sinup__form-title">Sign Up</h2>
                </div>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label className="content-signup__form-label">
                    First Name :{' '}
                    <span className="content-signup__star">*</span>
                  </Form.Label>
                  <Form.Control
                    name="firstname"
                    value={firstname}
                    onChange={this.handleChange}
                    type="firstname"
                    placeholder="first name"
                    className="content-signup__form-input"
                  />
                  {!messageSuccess || !messageErr || errormsg ? (

                    <span className="errormsg">{errormsg.firstname}</span>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="formBasicUsername">
                  <Form.Label className="content-signup__form-label">
                    Last Name :{' '}
                    <span className="content-signup__star">*</span>
                  </Form.Label>
                  <Form.Control
                    name="lastname"
                    value={lastname}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="last name"
                    className="content-signup__form-input"

                  />
                  {!messageSuccess || !messageErr || errormsg ? (

                    <span className="errormsg">{errormsg.lastname}</span>
                  ) : null}

                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="content-signup__form-label">
                    E-mail : <span className="content-signup__star">*</span>
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
                    <span className="content-signup__star">*</span>
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
                    <span className="content-signup__star">*</span>
                  </Form.Label>
                  <Form.Control
                    name="confPassword"
                    value={confPassword}
                    onChange={this.handleChange}
                    type="password"
                    placeholder="Confirm Password"
                    className="content-signup__form-input"

                  />
                  {!messageSuccess || !messageErr || errormsg ? (

                    <span className="errormsg">{errormsg.confPassword}</span>
                  ) : null}

                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label className="content-signup__form-label">
                    Phone Number  :{' '}
                    <span className="content-signup__star">*</span>
                  </Form.Label>
                  <Form.Control
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={this.handleChange}
                    type="number"
                    placeholder="Phone Number"
                    className="content-signup__form-input"

                  />
                  {!messageSuccess || !messageErr || errormsg ? (

                    <span className="errormsg">{errormsg.phoneNumber}</span>
                  ) : null}

                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label className="content-signup__form-label">
                    Street :{' '}
                    <span className="content-signup__star">*</span>
                  </Form.Label>
                  <Form.Control
                    name="street"
                    value={street}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="street"
                    className="content-signup__form-input"

                  />
                  {!messageSuccess || !messageErr || errormsg ? (

                    <span className="errormsg">{errormsg.street}</span>
                  ) : null}

                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label className="content-signup__form-label">
                    city :{' '}
                    <span className="content-signup__star">*</span>
                  </Form.Label>
                  <Form.Control
                    name="city"
                    value={city}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="city"
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
                    <span className="content-signup__star">*</span>
                  </Form.Label>
                  <Form.Control
                    name="zipCode"
                    value={zipCode}
                    onChange={this.handleChange}
                    type="number"
                    placeholder="zip Code"
                    className="content-signup__form-input"

                  />
                  {!messageSuccess || !messageErr || errormsg ? (

                    <span className="errormsg">{errormsg.zipCode}</span>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="formBasicUsername">
                  <Form.Label className="content-signup__form-label">
                    Ips Id :{' '}
                    <span className="content-signup__star">*</span>
                  </Form.Label>
                  <Form.Control
                    name="ipsid"
                    value={ipsid}
                    onChange={this.handleChange}
                    type="number"
                    placeholder="Ips Id"
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

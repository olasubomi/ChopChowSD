import React from 'react';
import './style.css';
import { Form, Button, Container ,Modal} from 'react-bootstrap';

 import { Link } from 'react-router-dom';

 export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      messageErr:false,
      messageSuccess:false,
      isAuthenticated: false,
    };
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
            this.setState({messageErr:''});
            this.setState({isAuthenticated:true})
            this.setState({ messageSuccess: 'login sucessfully '});
            return window.location.href = '/grocery'
          }
        })


     } else {
      this.setState({ messageErr: 'Please enter all fields' });
    }
  };

   handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

    handleLoginClick = () => {
      var email = this.state.email;
      var password = this.state.password ;


      // const { email, password } = this.state;
      if (email && password) {
        // var url = `https://chopchowdev.herokuapp.com/api/login`;
        var url = `./api/login`
        // var url = `http://localhost:5000/api/login`
  
  
        fetch(url, {
          method: 'POST',
          // credentials: 'include',
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
              this.setState({ messageErr: 'Bad Request. Please check email or password.' });
            } else if (response.status === 401) {
              this.setState({ messageErr: 'Sorry, you are not authorized' });
            } else if (response.status >= 500) {
              this.setState({ messageErr: 'Sorry , Internal Server ERROR' })
            } else {
              this.setState({ messageErr: '' });
              this.setState({ isAuthenticated: true })
              this.setState({ messageSuccess: 'Logged in Sucessfully! ' });
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
        console.log("Please enter all fields")
      }
    };

   render() {
    const { email, password, messageErr, messageSuccess } = this.state;
    return (
      <> 
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
                        // onClick={this.props.handleLoginClick(this.state.email, this.state.password)}
                        onClick={this.handleLoginClick}

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
    );
  }
  
}

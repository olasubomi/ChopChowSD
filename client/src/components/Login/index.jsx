import React from 'react';
import './style.css';
import { Form, Button, Container ,Modal} from 'react-bootstrap';

 import { Link } from 'react-router-dom';

 export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    messageErr:false,
    messageSuccess:false,
    isAuthenticated: false,
  };

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

   render() {
    const { email, password, messageErr, messageSuccess } = this.state;
    return (
      <> 
        <Container>
        <Modal show="true" onHide={this.handleClose} className="modal" backdrop="static">
                        <Modal.Body>

                           <Form className="login__form">
                            <div className="login__form-div-title">
                            <h2 className="login__form-title">Log in to View Grocery List</h2>

                             </div>



                           <div className="vl">
                            <span className="vl-innertext">or</span>
                          </div>

                           <div className="col">
                            <button className="fb btn">
                                <i class="fa fa-facebook fa-fw"></i> Login with Facebook
                                                  </button>
                            <button className="google btn"><i class="fa fa-google fa-fw">
                            </i> Login with Google+
                                                  </button>
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
                            <br/>
                            or

                             <Link className="link-guest-word" to="/aguest">
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

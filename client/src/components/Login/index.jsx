
import React from 'react';
import './style.css';
// import { Form, Button, Container } from 'react-bootstrap';

import { Link, Redirect } from 'react-router-dom';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    message: '',
  };

  handleClick = () => {
    const { email, password } = this.state;
    // const { setUserInfo } = this.props;
    if (email && password) {
      // make a requset to the back with method post and data{email , password}
      fetch('/api/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(response => {
          console.log(54545454545, response.status);
          
          if (response.status === 400 || response.status === 401 ||response.status === 404  ) {
            this.setState({ message: 'Bad Request , Check username or password ... !!' });
          }else if( response.status === 500){
            this.setState({message:'sorry , internal server error'})
          }else{

            this.setState({ message: 'login sucessfully ', });
            // return response.json();
            const {
              history: {
                push
                
              },
          } = this.props;
         console.log('ppppppp',this.props);
         
          return push('/api/grocery');
          }

          

        })
       
  
    } else {
      this.setState({ message: 'Please enter all fields' });
    }
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value, message: '' });

  render() {
    const { location } = this.props;
    const { email, password, message } = this.state;
    
    return (
      // <Container>
      //   <Form className="login__form">
      //     <h2 className="login__form-title">LOGIN</h2>
      //     <Form.Group>
      //       <Form.Label>Email :</Form.Label>
      //       <Form.Control
      //         type="text"
      //         name="email"
      //         value={email}
      //         placeholder="Enter your email"
      //         onChange={this.handleChange}
      //       />
      //     </Form.Group>
      //     <Form.Group>
      //       <Form.Label>Password :</Form.Label>
      //       <Form.Control
      //         type="password"
      //         name="password"
      //         value={password}
      //         placeholder="Enter your password"
      //         onChange={this.handleChange}
      //       />
      //     </Form.Group>
      //     <p className="message">{message}</p>
      //     <Button
      //       type="button"
      //       className="login__form-btn"
      //       onClick={this.handleClick}
      //     >
      //       Login
      //     </Button>
      //     <Form.Text className="login__form__text-muted">
      //       Don’t have an account?{' '}
      //       <Link className="link-signup-word" to="/signup">
      //         sign up
      //       </Link>
      //     </Form.Text>
      //   </Form>
      // </Container>
      // <Container>
        <form className="login__form">
          <h2 className="login__form-title">LOGIN</h2>
            <label>Email :</label>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={this.handleChange}
            />
            <label>Password :</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={this.handleChange}
            />
          <p className="message">{message}</p>
          <button
            type="button"
            className="login__form-btn"
            onClick={this.handleClick}
          >
            Login
          </button>
          <div className="login__form__text-muted">
            Don’t have an account?{' '}
            <Link className="link-signup-word" to="/signup">
              sign up
            </Link>
          </div>
        </form>
    );
  }
}

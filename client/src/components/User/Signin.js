import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./user.css";
import axios from "axios";
export class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signin: {
        email: "",
        password: ""
      }
    };
  }
  componentWillMount() {
    sessionStorage.removeItem("jwtoken");
  }
  componentDidMount() {
    // console.log('token', sessionStorage.getItem('jwtoken'))
  }

  handleLoginFormSubmit = async e => {
    e.preventDefault();
    await axios
      .post("/users/login", {
        email: this.state.signin.email,
        password: this.state.signin.password
      })
      .then(resp => {
        if (resp.status == 200) {
          const returnObj = resp.data;
          //console.log(returnObj);
          sessionStorage.setItem(
            "jwtoken",
            JSON.stringify(returnObj)
          );
          this.props.history.push("/product-list");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleEmailChange = e => {
    this.setState({
      signin: { ...this.state.signin, email: e.target.value }
    });
  };
  handlePasswordChange = e => {
    this.setState({
      signin: { ...this.state.signin, password: e.target.value }
    });
  };

  render() {
    return (
      <div className='form-signin'>
        <form
          className='login-form'
          action='/'
          onSubmit={this.handleLoginFormSubmit}>
          <h2 className='text-center'>Log in</h2>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              name='email'
              placeholder='User Email'
              required='required'
              onChange={this.handleEmailChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              className='form-control'
              placeholder='Password'
              required='required'
              onChange={this.handlePasswordChange}
            />
          </div>
          <div className='form-group'>
            <button
              type='submit'
              className='btn btn-primary btn-block'>
              Log in
            </button>
          </div>
          <div className='clearfix'>
            <label className='pull-left checkbox-inline'>
              <input type='checkbox' /> Remember me
            </label>
          </div>
          <div className='clearfix'>
            <NavLink to='/signup' className='pull-right'>
              Forgot Password?
            </NavLink>
            <NavLink to='/signup' className='text-center'>
              Create an Account
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

export default Signin;

import React, { Component } from "react";
import "./user.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signup: {
        fname: "",
        lanme: "",
        email: "",
        pwd: "",
        phone: "",
        subs: false
      }
    };
    this.fname = React.createRef();
    this.lname = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.phone = React.createRef();
    this.subs = React.createRef();
  }

  componentDidMount() {
    console.log();
  }

  handleCheck = e => {
    this.setState({
      signup: { ...this.state.signup, subs: !this.state.signup.subs }
    });
  };

  handleSignupFormSubmit = async e => {
    e.preventDefault();
    let signup = {
      fname: this.fname.current.value,
      lname: this.lname.current.value,
      email: this.email.current.value,
      password: this.password.current.value,
      phone: this.phone.current.value,
      subs: this.state.signup.subs
    };
    console.log(signup);
    this.setState({ signup });

    await axios
      .post("/users/signup", { signup })
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

  render() {
    return (
      <div className='form-signup'>
        <form
          className='text-center border border-light p-5'
          onSubmit={this.handleSignupFormSubmit}
          action='/'>
          <p className='h4 mb-4'>Sign up</p>
          <div className='form-row mb-4'>
            <div className='col'>
              <input
                type='text'
                id='fname'
                name='fname'
                className='form-control'
                placeholder='First name'
                ref={this.fname}
              />
            </div>
            <div className='col'>
              <input
                type='text'
                id='lname'
                name='lname'
                className='form-control'
                placeholder='Last name'
                ref={this.lname}
              />
            </div>
          </div>
          <input
            type='email'
            id='email'
            name='email'
            className='form-control mb-4'
            placeholder='E-mail'
            ref={this.email}
          />

          <input
            type='password'
            id='password'
            name='password'
            className='form-control'
            placeholder='Password'
            ref={this.password}
          />
          <small id='password' className='form-text text-muted mb-4'>
            At least 8 characters and 1 digit
          </small>

          <input
            type='tel'
            id='phone'
            name='phone'
            className='form-control'
            placeholder='Phone number'
            ref={this.phone}
          />
          <small id='phone' className='form-text text-muted mb-4'>
            Optional - for two step authentication
          </small>

          <div className='custom-control custom-checkbox'>
            <input
              type='checkbox'
              className='custom-control-input'
              id='subs'
              name='subs'
              defaultChecked={this.state.signup.subs}
              onClick={this.handleCheck}
            />
            <label htmlFor='subs' className='custom-control-label'>
              Subscribe to our newsletter
            </label>
          </div>
          <button
            className='btn btn-info my-4 btn-block'
            type='submit'>
            Sign Up
          </button>
          <p>
            If already registered{" "}
            <NavLink to='/signin' className=''>
              Sign In
            </NavLink>
          </p>
          <p>or sign up with:</p>
          <NavLink to='/' className='mx-2' role='button'>
            <i className='fab fa-facebook-f light-blue-text'>
              facebook
            </i>
          </NavLink>
          <NavLink to='/' className='mx-2' role='button'>
            <i className='fab fa-twitter light-blue-text'>twitter</i>
          </NavLink>
          <NavLink to='/' className='mx-2' role='button'>
            <i className='fab fa-linkedin-in light-blue-text'>
              linkedin
            </i>
          </NavLink>
          <NavLink to='/' className='mx-2' role='button'>
            <i className='fab fa-github light-blue-text'>github</i>
          </NavLink>
          <hr />

          <p>
            By clicking
            <em>Sign up</em> you agree to our
            <NavLink to='/'>terms of service</NavLink>
          </p>
        </form>
      </div>
    );
  }
}

export default Signup;

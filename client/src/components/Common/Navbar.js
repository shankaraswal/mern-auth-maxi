import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getToken } from "../../Utils/Utils";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: null
    };
  }
  componentDidMount() {
    this.setState({
      isAuth: getToken()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("jwtoken", prevState.isAuth, this.state.isAuth);
  }

  render() {
    //console.log("nav isAuth", this.state.isAuth);
    return (
      <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
        <div className='container'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/cart'>
                My Cart
              </NavLink>
            </li>
            )}
            <li className='nav-item'>
              <NavLink className='nav-link' to='/order-list'>
                Order History
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/product-list'>
                Our Products
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/signin'>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;

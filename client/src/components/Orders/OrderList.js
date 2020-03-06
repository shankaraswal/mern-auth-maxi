import React, { Component } from 'react'
import axios from 'axios'
import { getToken } from '../../Utils/Utils'

export default class OrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderCount:0,
      orders:[]
    }
  }
  fetchOrders = async () => {
    const stoken = (JSON.parse(sessionStorage.getItem('jwtoken'))).token;
    await axios.get('/orders', {
      headers: { Authorization: "Bearer " + stoken }
    }).then(res => {
      this.setState({
        orderCount:res.data.count,
        orders:res.data.data
      })
    }).catch(err => {
      console.log(err);
    })
  }
  componentDidMount() {
    if (getToken()) { this.fetchOrders() } else { 
      this.props.history.push('/signin')
    };
  }
  render() {
    return (
      <div className="container">
        <h3 className="text-default text-left mt-4 text-danger">Order History <a href="#" className="badge badge-pill badge-info">{this.state.orderCount}</a></h3>
        <hr />
        <div className="row mt-4">
            <div className="mb-4 text-left">
              <table id="cart" className="table table-hover table-condensed">
                <thead>
                <tr>
                  <th >Product</th>
                  <th >Price</th>
                  <th >Quantity</th>
                  <th >Subtotal</th>
                  <th ></th>
                </tr>
              </thead>
              <tbody>
              {(this.state.orders || []).map(item => (
                <tr key={item.orderId}>
                  <td data-th="Product">
                  <p className="text-danger"><b>Order Id: {item.orderId}</b></p>
                    <div className="row">
                      <div className="col-sm-2 hidden-xs"><img src="http://placehold.it/100x100" alt="..." className="img-responsive" />></div>
                      <div className="col-sm-10">
                        <h4 className="nomargin">{item.name}</h4>
                        <p>Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet.</p>
                      </div>
                    </div>
                  </td>
                  <td>$1.99</td>
                  <td>
                    <input type="number" className="form-control text-center" defaultValue="1" />
                  </td>
                  <td data-th="Subtotal" className="text-center">1.99</td>
                  <td className="actions" data-th="">
                    <button className="btn btn-info btn-sm"><i className="fa fa-refresh"></i></button>
                    <button className="btn btn-danger btn-sm"><i className="fa fa-trash-o"></i></button>								
                  </td>
                </tr>
            ))}
              </tbody>
              <tfoot>
                <tr className="visible-xs">
                  <td className="text-center"><strong>Total 1.99</strong></td>
                </tr>
                <tr>
                  <td><a href="#" className="btn btn-warning"><i className="fa fa-angle-left"></i> Continue Shopping</a></td>
                  <td colSpan="2" className="hidden-xs"></td>
                  <td className="hidden-xs text-center"><strong>Total $1.99</strong></td>
                  <td><a href="#" className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></a></td>
                </tr>
              </tfoot>
            </table>
              
            </div>
        </div>
      </div>
    )
  }
}

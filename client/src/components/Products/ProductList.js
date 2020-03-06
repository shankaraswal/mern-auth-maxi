import React, { Component } from 'react'
import axios from 'axios'
import { getToken } from '../../Utils/Utils'

export default class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productCount:0,
      products:[]
    }
  }
  fetchProducts = async () => {
    const stoken = (JSON.parse(sessionStorage.getItem('jwtoken'))).token;
    await axios.get('/products', {
      headers: { Authorization: "Bearer " + stoken }
    }).then(res => {
      this.setState({
        productCount:res.data.count,
        products:res.data.data
      })
    }).catch(err => {
      console.log(err);
    })
  }
  componentDidMount() {
    if (getToken()) { this.fetchProducts() } else { 
      this.props.history.push('/signin')
    };
  }
  render() {
    return (
      <div className="container">
        <h3 className="text-default text-left mt-4 text-danger">Product List <a href="#" className="badge badge-pill badge-info">{this.state.productCount}</a></h3>
        <hr />
        <div className="row mt-4">
          {(this.state.products || []).map(item => ( 
            <div className="col-sm-4  mb-4 text-left" key={item.productId}>
              <div className="card">
                <img className="card-img-top" src="https://via.placeholder.com/600x300/eeeeee" alt="Card image" />
                <div className="card-body">
                <h4 className="card-title text-uppercase">{item.name}</h4>
                <h4 className="card-title"> Price: <b className="text-danger">$ {item.price}.00</b></h4>
                  <p className="card-text">JSONPlaceholder. JSONPlaceholder is a simple fake REST API for testing and prototyping. It's like an image placeholder but for web developers.</p>
                  <div className="text-center">
                    <button prodid={item.productId} className="btn btn-danger">Add to Cart</button>
                    </div>
                </div>
              </div>
             </div> 
            ))}
        </div>
      </div>
    )
  }
}



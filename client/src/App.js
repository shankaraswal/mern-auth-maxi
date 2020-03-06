import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Navbar from "./components/Common/Navbar";
import Signin from "./components/User/Signin";
import Signup from "./components/User/Signup";
import ProductList from "./components/Products/ProductList";
import OrderList from "./components/Orders/OrderList";
import Cart from "./components/Cart/Cart";
import { ProtectedRoute } from "./Utils/ProtectedRoute";

function App() {
  //console.log("app", getToken());
  return (
    <div className='App'>
      <Router>
        <div>
          <Switch>
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            <ProtectedRoute
              path='/product-list'
              component={ProductList}
              children={Navbar}
            />
            <ProtectedRoute
              path='/order-list'
              component={OrderList}
              children={Navbar}
            />
            <ProtectedRoute
              path='/cart'
              component={Cart}
              children={Navbar}
            />
            <Route path='/' component={Signin} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;

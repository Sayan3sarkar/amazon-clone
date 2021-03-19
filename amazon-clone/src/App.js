import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import './App.css';
import Login from './components/Auth/Login/Login';
import Checkout from './components/Checkout/Checkout';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import * as actions from './store/actions';
import {auth} from './shared/firebase';
import Payment from './components/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders/Orders';

const stripePromise = loadStripe(
  'pk_test_51IWL5NLfJz1AMGIG1YSV5a0n1d0GoyDH9gYFr51SIZzLsHsoSDIu0Thz4E8BQmNGDthsSvvUJJSgn5Id0Zm8oeGK00u1Iq8vnz'
  )

class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        this.props.SetUser(authUser);
      } else {
        this.props.SetUser(null);
      }
    })
  }
  render() {
    let routes = (
      <Switch>

        <Route path="/orders">
          <Header />
          <Orders />
        </Route>

        <Route path="/login" component={Login} />

        <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>

        <Route path="/payment">
          <Header />
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        </Route>

        <Route path="/">
          <Header />
          <Home />
        </Route>
        
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div className="app">
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  SetUser: user => dispatch(actions.setUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

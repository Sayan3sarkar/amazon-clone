import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { ElementsConsumer } from '@stripe/react-stripe-js';
import './Payment.css';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import PaymentForm from './PaymentForm';

class Payment extends Component {
    render() {
        return (
            <div className="payment">
                <div className="payment__container">
                    <h1>
                        Checkout (<Link to="/checkout">{this.props.basket?.length} items</Link>)
                    </h1>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Delivery Address</h3>
                        </div>
                        <div className="payment__address">
                            <p>{this.props.user?.email}</p>
                            <p>Salt Lake, Sector-1</p>
                            <p>Kolkata, West Bengal</p>
                        </div>
                    </div>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Review Items and Delivery</h3>
                        </div>
                        <div className="payment__items">
                            {this.props.basket.map(item => (
                                <CheckoutProduct 
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}/>
                            ))}
                        </div>
                    </div>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Payment Method</h3>
                        </div>
                        <div className="payment__details">
                            <ElementsConsumer>
                                {({elements, stripe}) => (
                                    <PaymentForm elements={elements} stripe={stripe}/>
                                )}
                            </ ElementsConsumer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    basket: state.checkout.basket,
    user: state.auth.user
})

export default withRouter(connect(mapStateToProps, null)(Payment));

import React, { Component } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';
import axios from '../../shared/axios';

import './Payment.css';
import { withRouter } from 'react-router';
import * as actions from '../../store/actions';
import { db } from '../../shared/firebase';

class PaymentForm extends Component {

    state = {
        error: null,
        disabled: true,
        processing: null,
        succeeded: false,
        clientSecret: true
    };

    componentWillReceiveProps = nextProps => {
        if(nextProps.basket) {
            // Makes a request to the specified URL and updates clientSecret every time the basket prop changes
            const getClientSecret = async () => {
                const response  = await axios({
                    method: 'post',
                    url: `/payments/create?total=${this.getBasketTotal(nextProps.basket) * 100}`
                });
                this.setState({
                    clientSecret: response.data.clientSecret
                });
                console.log(this.state.clientSecret);
            }
            getClientSecret();
            // console.log(this.state.clientSecret);
        }
    }

    // Method to calculate total price of items in the Shopping Basket
    getBasketTotal = basket => basket?.reduce((amount, item) => item.price + amount, 0);

    onSubmitHandler = async (e) => {
        e.preventDefault();
        const {stripe, elements} = this.props;

        // Check whether Stripe has loaded or not
        if (!stripe || !elements) {
            return;
        }
        // Indicates payment status is processing
        this.setState({
            processing: true
        });

        // Uses the clientSecret to confirm Payment
        const payload = await stripe.confirmCardPayment(this.state.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent is the Payment confirmation

            let basketItems = this.props.basket;
            let user = this.props.user;

            // Adds the order to the firestore database
            // Creates a 'user' collection, goes into the specific user, creates and 'orders' collection,
            // Goes into the document with the paymentConfirmation ID(paymentIntent.id) within the 'orders' collection
            // Sets the value of that document to be the basket items along with the amount and the timestamp
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basketItems,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            this.setState({ // Payment confirmed without error
                succeeded: true,
                error: null,
                processing: false
            });

            // Empty the shopping cart
            this.props.onEmptyBasket();

            // Redirect to orders page
            this.props.history.replace('/orders');
        })
    }
    onChangeHandler = e => {
        this.setState({
            disabled: e.empty,
            error: (e.error ? e.error.message : "")
        })
    }
    render() {
        const {
            stripe,
            elements
        } = this.props;
        return (            
                <form onSubmit={this.onSubmitHandler}>
                    <CardElement onChange={this.onChangeHandler}/>
                    <div className="payment__priceContainer">
                        <CurrencyFormat
                            renderText={(value) => (
                                <>
                                <h3>Order Total: {value}</h3>
                                </>
                            )}
                            decimalScale={2}
                            value={this.getBasketTotal(this.props.basket)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"INR"}
                        />
                        <button disabled={this.state.processing || this.state.disabled || this.state.succeeded}>
                            <span>{this.state.processing ? <p>Processing</p> : 'Buy Now'}</span>
                        </button>
                    </div>
                    {this.state.error && <div>{this.state.error}</div>}
                </form>
        );
    }
}

const mapStateToProps = state => ({
    basket: state.checkout.basket,
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    onEmptyBasket: ()=> dispatch(actions.emptyBasket())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentForm));

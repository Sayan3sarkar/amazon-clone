import React, { Component } from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Subtotal extends Component {
    /**
     * Calculates total price of items in basket
     * @param {*} basket 
     * @returns integer
     */
    getBasketTotal = basket => basket?.reduce((amount, item) => item.price + amount, 0);

    onProceedToCheckout = e => {
        e.preventDefault();
        this.props.history.push('/payment')
    }

    render() {
        return (
            <div className="subtotal">
                 <CurrencyFormat
                    renderText={(value) => (
                    <>
                        <p>
                        Subtotal ({this.props.basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                        <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                    )}
                    decimalScale={2}
                    value={this.getBasketTotal(this.props.basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"INR"}
                />
                <button onClick={this.onProceedToCheckout}>Proceed to Checkout</button>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    basket: state.checkout.basket
})

export default withRouter(connect(mapStateToProps, null)(Subtotal));

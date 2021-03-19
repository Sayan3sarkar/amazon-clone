import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import Subtotal from '../Subtotal/Subtotal';
import './Checkout.css';

class Checkout extends Component {
    render() {
        return (
            <div className="checkout">
                <div className="checkout__left">
                    <img 
                        src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" 
                        alt="" 
                        className="checkout__ad"/>

                    <div>
                        <h3>Hello, {this.props.user?.email}</h3>
                        <h2 className="checkout__title">Your Shopping Cart</h2>
                        {
                            this.props.basket.map(item => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="checkout__right">
                    <h2><Subtotal /></h2>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    basket: state.checkout.basket,
    user: state.auth.user
})

export default connect(mapStateToProps, null)(withRouter(Checkout));
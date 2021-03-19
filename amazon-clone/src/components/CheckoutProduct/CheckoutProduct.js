import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import './CheckoutProduct.css';

class CheckoutProduct extends Component {
    render() {
        const {
            id,
            title,
            image,
            price,
            rating,
            hideButton
        } = this.props;

        const onRemoveFromBasket = () => {
            this.props.RemoveFromBasket(id);
        }
        return (
            <div className='checkoutProduct'>
                <img src={image} alt="" className='checkoutProduct__image'/>
                <div className="checkoutProduct__info">
                    <p className='checkoutProduct__title'>{title}</p>
                    <p className="checkoutProduct__price">
                        <strong>{price}</strong>
                        <small>/-</small>
                    </p>
                    <div className="checkoutProduct__rating">
                        {
                            Array(rating).fill().map((_,i)=>(
                                <p>⭐</p>
                            ))
                        }
                    </div>
                    {!hideButton && (
                        <button type="button" onClick={onRemoveFromBasket}>Remove from Cart</button>
                    )}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    RemoveFromBasket: id => dispatch(actions.removeFromBasket(id))
})

export default connect(null, mapDispatchToProps)(CheckoutProduct);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Product.css';

import * as actions from '../../store/actions';

class Product extends Component {
    render() {
        const {
            id,
            title,
            image,
            price,
            rating
        } = this.props;

        const onAddToBasket = ()=> {
            const item = {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
            this.props.AddToBasket(item);
        }

        return (
            <div className="product">
                <div className="product__info">
                    <p>{title}</p>

                    <p className="product__price">
                        <strong>{price}</strong>
                        <small>/-</small>
                    </p>

                    <div className="product__rating">
                        {Array(rating).fill().map((_,i) => (
                            <p>⭐</p>
                        ))}
                    </div>
                </div>
                <img src={image} alt=""/>

                <button type="button" onClick={onAddToBasket}>Add To Basket</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    AddToBasket: item => dispatch(actions.addToBasket(item))
})

export default connect(null, mapDispatchToProps)(Product);
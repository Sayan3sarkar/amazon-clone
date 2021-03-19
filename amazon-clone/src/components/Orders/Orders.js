import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './Orders.css';
import { db } from '../../shared/firebase';
import Order from './Order/Order';

class Orders extends Component {
    state = {
        orders: []
    };
    componentDidMount() {
        let user = this.props.user;
        if(user) {
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc') // Sort the orders in descending based on the 'created' value
            .onSnapshot(snapshot => ( // Real time database snapshot. We set the state based on this snapshot
                this.setState({
                    orders: snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                })
            ));
        } else {
            this.setState({
                orders: []
            });
        }
    }
    render() {
        return (
            <div className="orders">
                <h1>Your Orders</h1>
                <div className="orders__order">
                    {this.state.orders?.map(order => (
                        <Order order={order} />     
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    basket: state.checkout.basket,
    user: state.auth.user
})

export default withRouter(connect(mapStateToProps, null)(Orders));

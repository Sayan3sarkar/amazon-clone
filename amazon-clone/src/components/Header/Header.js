import React, { Component } from 'react';
import './Header.css';

import SearchIcon from '@material-ui/icons/Search';
import { ShoppingBasket } from '@material-ui/icons';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Header extends Component {

    // Logs user out if user is present
    handleAuth = () => {
        if(this.props.user) {
            this.props.onLogout(this.props.history);
        }
    }
    render() {
        return (
            <div className="header">
                <Link to="/">
                    <img 
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    className="header__logo"
                    alt=""/>
                </Link>

                <div className="header__search">
                    <input type="text" className="header__searchInput"/>
                    <SearchIcon className="header__searchIcon" />
                </div>

                <div className="header__nav">
                    
                <NavLink to='/login' className="header__navLink">
                    <div className="header__option" onClick={this.handleAuth}>
                        <span className="header__optionLineOne">
                            Hello, {this.props.user ? this.props.user.email : 'Guest'}
                        </span>
                        <span className="header__optionLineTwo">
                            {this.props.user ? 'Sign Out' : 'Sign In'}  
                        </span>
                    </div>
                </NavLink>

                    <NavLink to="/orders" className="header__navLink">
                        <div className="header__option">
                            <span className="header__optionLineOne">
                                Returns
                            </span>
                            <span className="header__optionLineTwo">
                                & Orders
                            </span>
                        </div>
                    </NavLink>

                    <div className="header__option">
                        <span className="header__optionLineOne">
                            Your
                        </span>
                        <span className="header__optionLineTwo">
                            Prime
                        </span>
                    </div>

                    <Link to="/checkout">
                        <div className="header__optionBasket">
                            < ShoppingBasket/>
                            <span className="header__optionLineTwo header__basketCount">{this.props.basket?.length}</span>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    basket: state.checkout.basket,
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    onLogout: (history)=> dispatch(actions.logout(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);

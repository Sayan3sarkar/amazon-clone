import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import './Login.css';
import * as actions from '../../../store/actions';

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    onLogin = e => {
        e.preventDefault();
        this.props.OnLogin(this.state.email, this.state.password, this.props.history);
    }

    onSignup = e => {
        e.preventDefault();
        this.props.OnSignup(this.state.email, this.state.password, this.props.history);
    }
    render() {
        // let error = this.props.error;
        return (
            <div className="login">
                {/* {error ? alert(error): null} */}
                <Link to="/">
                    <img
                        className="login__logo"
                        alt=""
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                    />
                </Link>
                <div className="login__container">
                    <h1>Sign In</h1>
                    <form >
                        <h5>Email</h5>
                        <input 
                            type="text"
                            name="email" 
                            value={this.state.email}
                            onChange={this.onChange}></input>

                        <h5>Password</h5>
                        <input 
                            type="password" 
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}></input>

                        <button type="submit" className="login__signInButton" onClick={this.onLogin}>Sign In</button>
                    </form>

                    <p>
                        By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                        see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                    </p>
                    <button className="login__registerButton" onClick={this.onSignup}>Create Your Amazon Account</button>
                    <small>Fill up email and password and then press this button to Sign Up</small>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
    OnLogin: (email, password, history, isSignIn) => dispatch(actions.signIn(email, password, history)),
    OnSignup: (email, password, history, isSignIn) => dispatch(actions.signUp(email, password, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));

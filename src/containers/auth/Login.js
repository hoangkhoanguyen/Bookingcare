import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import userService from '../../services/userService'

import './Login.scss';
import Validate from '../../services/Validate'
import { validateLocaleAndSetLanguage } from 'typescript';

class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
        this.state = {
            userInfo: {
                email: '',
                password: '',
            },
            messageWarning: {}
        }
    }

    handleChangeInput = (e, name) => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [name]: e.target.value
            }
        })
    }

    handleLoginButton = async () => {
        let newMessage = {}
        for (const key in this.state.userInfo) {
            if (!Validate.ValidateMustNotEmpty(this.state.userInfo[key])) {
                newMessage[key] = 'This field must not be empty!'
            } else {
                newMessage[key] = ''
            }
        }
        if (newMessage.email == '') {
            if (!Validate.ValidateEmail(this.state.userInfo.email)) {
                newMessage.email = 'This is not an email!'
            }
        }

        this.setState({
            messageWarning: newMessage
        })
        if (newMessage.email == '' && newMessage.password == '') {
            let result = await userService.handleLogin(this.state.userInfo)
            if (result && result.errCode === 0) {
                this.props.userLoginSuccess(result.user)
            } else {
                this.props.userLoginFail()
            }
        }
    }

    render() {
        return (
            <div className='background-login'>
                <div className="login-container row">
                    <div className="text-center col-12 text-login">
                        Login
                    </div>
                    <div className="col-12 form-group">
                        <label >Email:</label>
                        <input onChange={(e) => { this.handleChangeInput(e, 'email') }} value={this.state.userInfo.email} type="text" className='form-control' />
                        <span>{this.state.messageWarning.email}</span>

                    </div>
                    <div className="col-12 form-group">
                        <label >Password:</label>
                        <input onChange={(e) => { this.handleChangeInput(e, 'password') }} value={this.state.userInfo.password} type="password" className='form-control' />
                        <span>{this.state.messageWarning.password}</span>

                    </div>
                    <div className="col-12">
                        <button onClick={this.handleLoginButton}>Login</button>
                    </div>
                    <div className="col-12">
                        <span>Forgot your password?</span>
                    </div>
                    <div className="col-12">

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

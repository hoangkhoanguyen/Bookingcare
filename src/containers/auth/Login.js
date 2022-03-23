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

    handlePressEnter = (e) => {
        if (e.code == 'Enter') {
            this.handleLoginButton()
        }
    }

    render() {
        return (
            <div className='background-login'>
                <div className="login-body">
                    <h1>Login</h1>
                    <div className='info-content' >
                        <div style={{ '--colorBottom': !this.state.messageWarning.email || (this.state.messageWarning.email == '') ? 'transparent' : 'red' }}>
                            <input onChange={(e) => {
                                // e.stopPropagation()
                                this.handleChangeInput(e, 'email')
                            }}
                                onKeyDown={this.handlePressEnter}
                                value={this.state.userInfo.email} placeholder='Email' type='text' />
                            <span>{this.state.messageWarning.email}</span>
                        </div>
                        <div style={{ '--colorBottom': !this.state.messageWarning.password || (this.state.messageWarning.password == '') ? 'transparent' : 'red' }}>
                            <input onChange={(e) => {
                                // e.stopPropagation()
                                this.handleChangeInput(e, 'password')
                            }}
                                onKeyDown={this.handlePressEnter}
                                value={this.state.userInfo.password} placeholder='Password' type='password' />
                            <span>{this.state.messageWarning.password}</span>
                        </div>
                        <button onClick={this.handleLoginButton} className='submid-btn' >Log in</button>
                    </div>
                </div>
                {/* <div className="card-body row"> */}
                {/* <h1 className="text-center col-12 text-login title-login">
                        Login
                    </h1>
                    <div style={{ '--colorBottom': this.state.messageWarning.email == '' ? 'transparent' : 'red' }}>
                        <input onChange={(e) => {
                            // e.stopPropagation()
                            this.handleChangeInput(e, 'email')
                        }} value={this.state.userInfo.email} type="text" />
                        <span>{this.state.messageWarning.email}</span>
                    </div> */}
                {/* <div className="col-12 form-group label-login">
                        <label >Email:</label>
                        <input onChange={(e) => { this.handleChangeInput(e, 'email') }} value={this.state.userInfo.email} type="text" className='form-control' />
                        <span>{this.state.messageWarning.email}</span>

                    </div> */}
                {/* <div className="col-12 form-group label-login">
                        <label >Password:</label>
                        <input onChange={(e) => { this.handleChangeInput(e, 'password') }}
                            onKeyDown={this.handlePressEnter}
                            value={this.state.userInfo.password} type="password" className='form-control' />
                        <span>{this.state.messageWarning.password}</span>

                    </div>
                    <div className="col-12 login-btn">
                        <button onClick={this.handleLoginButton}>Login</button>
                    </div>
                    <div className="col-12">
                        <span>Forgot your password?</span>
                    </div>
                    <div className="col-12">

                    </div> */}
                {/* </div> */}
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

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Header from '../Header/Header';


class UserManage extends Component {

    state = {

    }

    componentDidMount() {

    }


    render() {
        return (
            <>
                <Header />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions/Auth'

function SignIn(props) {
    console.log(props)
    return (
        <div>
            <p>Signin Page</p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authState: state.authReducer
    };
};

export default connect(
    mapStateToProps,
    { ...actions }
)(SignIn);
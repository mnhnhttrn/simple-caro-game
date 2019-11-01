import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions/Auth'

const Home = props => {
    return (
        <div>
            <p>Home Page</p>
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
)(Home);
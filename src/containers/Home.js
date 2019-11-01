import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import * as actions from '../actions/Auth'
import Loading from '../components/Loading'

const Home = props => {
    const { authToken } = props
    //Authenticating
    const [checkAuthing, setCheckAuthing] = React.useState(true)
    React.useEffect(() => {
        authToken().then(res => {
            if (!res) {
                props.history.push('/sign-in')
            } else {
                setCheckAuthing(false)
            }
        })
    }, [])

    if (checkAuthing) {
        return <Loading />
    }

    return (
        <div>
            <Typography>Home Page</Typography>
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
)(withRouter(Home));
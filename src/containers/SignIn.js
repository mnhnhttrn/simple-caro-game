import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography, Link, TextField, Container, CssBaseline, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions/Auth'
import Loading from '../components/Loading'

const SignIn = props => {
    const { postLogin, authState, authToken } = props
    let [loginPayload, setLoginPayload] = React.useState({ Username: '', Password: '' })
    const { isAuthFetching } = authState

    //Authenticating
    const [checkAuthing, setCheckAuthing] = React.useState(true)
    React.useEffect(() => {
        authToken().then(res => {
            console.log(res)
            if (res) {
                props.history.push('/')
            } else {
                setCheckAuthing(false)
            }
        })
    }, [])

    if (checkAuthing) {
        return <Loading />
    }

    return (
        <Container maxWidth="xs" component="main">
            <CssBaseline />
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center">
                <Typography
                    component="h1"
                    variant="h5">
                    đăng nhập
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
                    disabled={isAuthFetching}
                    onChange={event => { setLoginPayload({ ...loginPayload, Username: event.target.value }) }} />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={isAuthFetching}
                    onChange={event => { setLoginPayload({ ...loginPayload, Password: event.target.value }) }} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        postLogin(loginPayload).then(res => {
                            if (res.type = "POST_LOGIN_SUCCESS") {
                                props.history.push('/')
                            }
                        })
                    }}
                    disabled={isAuthFetching}>
                    đăng nhập
                </Button>
                <Link
                    href="/signup"
                    align="center">
                    chưa có tài khoản? đăng ký
                    </Link>
            </Box>
        </Container >
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
)(withRouter(SignIn));
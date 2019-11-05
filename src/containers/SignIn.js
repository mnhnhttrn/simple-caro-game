import React from 'react'
import { connect } from 'react-redux'
import { makeStyles, Paper, Box, Typography, Link, TextField, Container, CssBaseline, Button, Avatar, CardMedia, Snackbar } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions/Auth'
import Loading from '../components/Loading'
import CustomSnackBar from '../components/CustomSnackBar'

import logoImg from '../static/logo.png'
import * as types from '../actions/actionTypes'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    paper: {
        width: '100%',
        padding: theme.spacing(3, 5)
    },
    item: {
        margin: theme.spacing(2)
    },
    logo: {
        width: 60,
        height: 60
    }
}))

const SignIn = props => {
    const { postLogin, authState, authToken } = props
    let [loginPayload, setLoginPayload] = React.useState({ username: '', password: '' })
    const { isAuthFetching, error } = authState

    const classes = useStyles()

    //Authenticating
    const [checkAuthing, setCheckAuthing] = React.useState(true)
    React.useEffect(() => {
        authToken().then(res => {
            if (res) {
                props.history.push('/')
            } else {
                setCheckAuthing(false)
            }
        });
    }, [])

    if (checkAuthing) {
        return <Loading />
    }

    return (
        <Container maxWidth="xs" className={classes.container} component="main">
            <CssBaseline />
            <Paper className={classes.paper}>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center">
                    <Avatar className={classes.logo} src={logoImg} />
                    <Typography
                        className={classes.item}
                        variant="h5">
                        Đăng nhập
                    </Typography>
                    <TextField
                        className={classes.item}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Tên đăng nhập"
                        name="username"
                        autoFocus
                        disabled={isAuthFetching}
                        onChange={event => { setLoginPayload({ ...loginPayload, username: event.target.value }) }} />
                    <TextField
                        className={classes.item}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        disabled={isAuthFetching}
                        onChange={event => { setLoginPayload({ ...loginPayload, password: event.target.value }) }} />
                    <Button
                        className={classes.item}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            loginPayload.username && loginPayload.password && postLogin(loginPayload).then(res => {
                                if (res.type === types.POST_LOGIN_SUCCESS) {
                                    props.history.push('/')
                                }
                            })
                        }}
                        disabled={isAuthFetching}>
                        đăng nhập
                    </Button>
                    <Link
                        className={classes.item}
                        href="/sign-up"
                        align="center">
                        chưa có tài khoản? đăng ký
                    </Link>
                </Box>
            </Paper>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={error !== "" && error}
                autoHideDuration={3333}>
                <CustomSnackBar
                    variant="error"
                    message={error}
                />
            </Snackbar>
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
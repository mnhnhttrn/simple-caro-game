import React from 'react'
import { connect } from 'react-redux'
import { makeStyles, Paper, Box, Typography, Link, TextField, Container, CssBaseline, Button, IconButton, Snackbar } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions/Auth'
import * as types from '../actions/actionTypes'
import Loading from '../components/Loading'
import { ArrowBack } from '@material-ui/icons'
import CustomSnackBar from '../components/CustomSnackBar'

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
    }
}))

const SignUp = props => {
    const { postSignup, authState, authToken } = props
    const [signupPayload, setSignupPayload] = React.useState({ username: '', password: '', confirmPassword: '', avatarURL: '' })
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
        })
    }, [])

    if (checkAuthing) {
        return <Loading />
    }

    return (
        <Container maxWidth="xs" className={classes.container} component="main">
            <CssBaseline />
            <Paper className={classes.paper}>
                <IconButton href="/" aria-label="Quay lại trang chủ">
                    <ArrowBack />
                </IconButton>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center">
                    <Typography
                        className={classes.item}
                        component="h1"
                        variant="h5">
                        Đăng ký
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
                        onChange={event => { setSignupPayload({ ...signupPayload, username: event.target.value }) }} />
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
                        onChange={event => { setSignupPayload({ ...signupPayload, password: event.target.value }) }} />
                    <TextField
                        className={classes.item}
                        margin="normal"
                        required
                        fullWidth
                        name="confirm-password"
                        label="Xác nhận mật khẩu"
                        type="password"
                        id="confirm-password"
                        disabled={isAuthFetching}
                        error={signupPayload.password !== signupPayload.confirmPassword}
                        helperText={signupPayload.password !== signupPayload.confirmPassword ? "Hai mật khẩu chưa khớp" : false}
                        onChange={event => { setSignupPayload({ ...signupPayload, confirmPassword: event.target.value }) }} />
                    <Button
                        className={classes.item}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            signupPayload.username && signupPayload.password && postSignup(signupPayload).then(res => {
                                if (res.type === types.POST_LOGIN_SUCCESS) {
                                    props.history.push('/')
                                }
                            })
                        }}
                        disabled={isAuthFetching}>
                        đăng ký
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
                open={error !== ""}
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
)(withRouter(SignUp));
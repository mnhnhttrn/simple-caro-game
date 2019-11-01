import React from 'react'
import { connect } from 'react-redux'
import { makeStyles, Paper, Box, Typography, Link, TextField, Container, CssBaseline, Button, IconButton } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions/Auth'
import Loading from '../components/Loading'
import { ArrowBack } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    paper: {
        width: '100%',
        height: '80%',
        padding: theme.spacing(3)
    },
    item: {
        margin: theme.spacing(2)
    }
}))

const SignUp = props => {
    const { postLogin, authState, authToken } = props
    const [signupPayload, setSignupPayload] = React.useState({ Username: '', Password: '', ConfirmPassword: '' })
    const { isAuthFetching } = authState

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
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Tên đăng nhập"
                        name="username"
                        autoFocus
                        disabled={isAuthFetching}
                        onChange={event => { setSignupPayload({ ...signupPayload, Username: event.target.value }) }} />
                    <TextField
                        className={classes.item}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        disabled={isAuthFetching}
                        onChange={event => { setSignupPayload({ ...signupPayload, Password: event.target.value }) }} />
                    <TextField
                        className={classes.item}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirm-password"
                        label="Xác nhận mật khẩu"
                        type="password"
                        id="confirm-password"
                        disabled={isAuthFetching}
                        error={signupPayload.Password !== signupPayload.ConfirmPassword}
                        helperText={signupPayload.Password !== signupPayload.ConfirmPassword ? "Hai mật khẩu chưa khớp" : false}
                        onChange={event => { setSignupPayload({ ...signupPayload, ConfirmPassword: event.target.value }) }} />
                    <Button
                        className={classes.item}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            // postLogin(loginPayload).then(res => {
                            //     if (res.type = "POST_LOGIN_SUCCESS") {
                            //         props.history.push('/')
                            //     }
                            // })
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
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
        padding: theme.spacing(3, 5)
    },
    item: {
        margin: theme.spacing(2)
    }
}))

const Profile = props => {
    const { postLogin, authState, authToken } = props
    const [signupPayload, setSignupPayload] = React.useState({ Username: '', Password: '', ConfirmPassword: '' })
    const { isAuthFetching, profilePayload } = authState
    const { username, avatarURL } = profilePayload

    const classes = useStyles()

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
                        Thông tin tài khoản
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
                        onChange={event => { profilePayload({ ...profilePayload, Username: event.target.value }) }} />
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
)(withRouter(Profile));
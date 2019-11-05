import React from 'react'
import { connect } from 'react-redux'
import { makeStyles, Paper, Box, Typography, Snackbar, TextField, Container, CssBaseline, Button, IconButton, Avatar, ButtonBase } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions/Auth'
import Loading from '../components/Loading'
import { ArrowBack, Publish } from '@material-ui/icons'
import AvatarImg from '../components/AvatarImg'
import CustomSnackBar from '../components/CustomSnackBar'
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
    avatarWrapper: {
        position: 'relative',
        minWidth: 100,
        minHeight: 100,
        '&:hover': {
            '& $avatarAbove': {
                display: 'block',
                opacity: 0.3
            }
        },
    },
    avatar: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        marginBottom: theme.spacing(3),
    },
    avatarAbove: {
        zIndex: 100,
        display: 'none',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: theme.palette.common.black,
        color: theme.palette.common.white,
        position: 'absolute',
    },
    item: {
        margin: theme.spacing(2)
    }
}))

const ChangePassword = props => {
    const { postChangePassword, authState, authToken, updateAvatar } = props
    const { isAuthFetching, profilePayload, error } = authState
    const { username, avatarURL } = profilePayload
    const [changePasswordPayload, setChangePasswordPayload] = React.useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' })

    let avatarInputRef = React.useRef(null)

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
                        id="old-password"
                        label="Mật khẩu cũ"
                        name="old-password"
                        autoFocus
                        disabled={isAuthFetching}
                        type="password"
                        onChange={event => { setChangePasswordPayload({ ...changePasswordPayload, oldPassword: event.target.value }) }} />
                    <TextField
                        className={classes.item}
                        margin="normal"
                        required
                        fullWidth
                        id="new-password"
                        label="Mật khẩu mới"
                        name="new-password"
                        disabled={isAuthFetching}
                        type="password"
                        onChange={event => { setChangePasswordPayload({ ...changePasswordPayload, newPassword: event.target.value }) }} />
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
                        error={changePasswordPayload.newPassword !== changePasswordPayload.confirmNewPassword}
                        helperText={changePasswordPayload.newPassword !== changePasswordPayload.confirmNewPassword ? "Hai mật khẩu chưa khớp" : false}
                        onChange={event => { setChangePasswordPayload({ ...changePasswordPayload, confirmNewPassword: event.target.value }) }} />
                    <Button
                        className={classes.item}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            postChangePassword(changePasswordPayload).then(res => {
                                if (res.type === types.POST_LOGIN_SUCCESS) {
                                    props.history.push('/profile')
                                }
                            })
                        }}
                        disabled={isAuthFetching || changePasswordPayload.oldPassword === '' || changePasswordPayload.newPassword === '' || changePasswordPayload.newPassword !== changePasswordPayload.confirmNewPassword}>
                        cập nhật password
                    </Button>
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
)(withRouter(ChangePassword));
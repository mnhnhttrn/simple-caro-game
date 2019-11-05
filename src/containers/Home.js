import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { makeStyles, Box, Typography, Paper, Avatar, Button } from '@material-ui/core'
import { Memory, People, Settings } from '@material-ui/icons'
import * as actions from '../actions/Auth'
import Loading from '../components/Loading'
import LogoImg from '../static/logo.png'
import AvatarImg from '../components/AvatarImg'

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: theme.palette.common.white
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(5)
    },
    logo: {
        width: 80,
        height: 80,
        marginTop: theme.spacing(3)
    },
    button: {
        width: '100%',
        marginTop: theme.spacing(3)
    }
}))

const Home = props => {
    const { authToken, authState, signout } = props
    const classes = useStyle()
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

    const { profilePayload } = authState

    const { username, avatarURL } = profilePayload

    return (
        <Box className={classes.root}>
            <Box className={classes.container}>
                <Typography variant="h6"> Xin chào {username}!</Typography>
                <Avatar className={classes.logo} src={AvatarImg(avatarURL)} imgProps={{ onError: e => { e.target.src = AvatarImg() } }} />
                <Button variant="contained" startIcon={<Memory />} className={classes.button} href="/single-player">Chơi với máy</Button>
                <Button variant="contained" startIcon={<People />} className={classes.button} href="/multi-player">Chơi với người</Button>
                <Button variant="contained" startIcon={<Settings />} className={classes.button} href="/profile">Tài khoản</Button>
                <Button variant="contained" startIcon={<Settings />} className={classes.button} onClick={() => { signout(); window.location.reload() }}>Đăng xuất</Button>
            </Box>
        </Box>
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
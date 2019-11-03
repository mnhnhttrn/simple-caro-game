import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { makeStyles, Box, Typography, Paper, Avatar, Button } from '@material-ui/core'
import { Memory, People, Settings } from '@material-ui/icons'
import * as actions from '../actions/Auth'
import Loading from '../components/Loading'
import LogoImg from '../static/logo.png'

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
    const { authToken, authState } = props
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

    console.log(authState)

    const { profilePayload } = authState

    const { username, avatarURL } = profilePayload

    const avatar = avatarURL ? avatarURL : LogoImg

    return (
        <Box className={classes.root}>
            <Paper className={classes.container}>
                <Typography variant="h6"> Xin chao {username}!</Typography>
                <Avatar className={classes.logo} src={avatar} />
                <Button variant="contained" startIcon={<Memory />} className={classes.button} href="/single-player">Choi voi may</Button>
                <Button variant="contained" startIcon={<People />} className={classes.button} href="/multi-player">Choi voi nguoi</Button>
                <Button variant="contained" startIcon={<Settings />} className={classes.button} href="/profile">Tai khoan</Button>
            </Paper>
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
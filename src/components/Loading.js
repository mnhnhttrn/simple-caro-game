import React from 'react';
import { makeStyles, CircularProgress, Avatar, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors'
import Logo from '../static/logo.png'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.common.white
    },
    wrapper: {
        position: 'relative',
        left: -28
    },
    title: {
        margin: 10,
    },
    fabProgress: {
        color: grey[500],
        position: 'absolute',
        zIndex: 1,
        top: -6,
        left: -6,
    },
    avatar: {
        width: 56,
        height: 56,
        position: 'absolute',
    },
}));

const Loading = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography variant="h5" className={classes.title}>
                Vui lòng chờ...
            </Typography>
            <div className={classes.wrapper}>
                <Avatar src={Logo} className={classes.avatar} />
                <CircularProgress size={68} className={classes.fabProgress} />
            </div>
        </div>
    )
}

export default Loading;
import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography, Link, TextField, Container, CssBaseline, Button, makeStyles } from '@material-ui/core'

import * as actions from '../actions/Auth'

const useStyles = makeStyles(theme => {

})

const SignUp = props => {
    let [username, setUsername] = React.useState('')
    let [password, setPassword] = React.useState('')
    return (
        <Container maxWidth="xs" component="main">
            <CssBaseline />
            <Box display="flex" flexDirection="column" justifyContent="center">
                <Typography component="h1" variant="h5">
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
                    onChange={event => { setUsername({ ...username, username: event.target.value }) }}
                />
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
                    onChange={event => { setPassword({ ...password, password: event.target.value }) }}
                />
                <Button>
                    đăng nhập
                </Button>
                <Link href="/signup" align="center">chưa có tài khoản? đăng ký</Link>
            </Box>
        </Container>
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
)(SignUp);
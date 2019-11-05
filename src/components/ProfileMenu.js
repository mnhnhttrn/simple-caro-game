import React from 'react';
import { connect } from 'react-redux'
import { IconButton, Menu, MenuItem, Avatar, Link } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import * as actions from '../actions/Auth'
import AvatarImg from './AvatarImg'

function ProfileMenu(props) {
    const { avatarURL, signout } = props

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton color="default" aria-label="Tài khoản" onClick={handleClick}>
                <Avatar src={AvatarImg(avatarURL)} imgProps={{ onError: (e) => { e.target.src = AvatarImg() } }} />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { props.history.push('/profile') }}>Tài khoản</MenuItem>
                <MenuItem onClick={() => { signout(); props.history.push('/') }}>Đăng xuất</MenuItem>
            </Menu>
        </div >
    );
}

export default connect(null, { ...actions })(withRouter(ProfileMenu))
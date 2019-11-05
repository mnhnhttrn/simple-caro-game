import React from 'react'
import axios from 'axios'
import { REST_API_BASE_URL } from '../config/general'
import DefaultAvatar from '../static/default_avatar.svg'

export default function AvatarImg(src) {
    if (src) {
        return REST_API_BASE_URL + src
    }
    return DefaultAvatar
} 
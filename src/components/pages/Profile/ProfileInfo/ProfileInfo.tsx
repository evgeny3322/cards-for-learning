import React from 'react'
import style from '../Profile.module.css'

import { EditOutlined, Reply } from '@mui/icons-material'
import { Button, ButtonGroup } from '@material-ui/core'
import { UserAvatar } from './UserAvatar/UserAvatar'

export type ProfileInfoType = {
    avatar: string | undefined
    name: string
    email: string
    packsCount: number
    onClickChangeEditModeHandler: () => void
    onClickLogoutChangeHandler: () => void
}

export const ProfileInfo = ({ avatar, name, email, packsCount, onClickChangeEditModeHandler, onClickLogoutChangeHandler }: ProfileInfoType) => {

    return (
        <div className={style.profileInfo}>
            <div className={style.infoByUser}>
                <UserAvatar avatar={avatar} />
                <div className={style.infoUser}>

                    <div>
                        <div>
                            {'Name: ' + name}
                        </div>
                        <div>
                            {'Email: ' + email}
                        </div>
                        <div>
                            {'Total packs: ' + packsCount}
                        </div>
                    </div>

                    <ButtonGroup >
                        <Button
                            variant={'outlined'}
                            size={'small'}
                            endIcon={<EditOutlined />}
                            onClick={onClickChangeEditModeHandler}
                        >
                            Edit
                        </Button>
                        <Button
                            variant={'outlined'}
                            size={'small'}
                            endIcon={<Reply />}
                            onClick={onClickLogoutChangeHandler}
                        >
                            Logout
                        </Button>
                    </ ButtonGroup >

                </div>
            </div>
        </div>
    )
}

import React from 'react'
import style from '../Profile.module.css'

import { EditOutlined, Reply } from '@mui/icons-material'
import { Button, ButtonGroup } from '@material-ui/core'
import { UserAvatar } from './UserAvatar/UserAvatar'
import { EditableSpan } from './EditableSpan/EditableSpan'

export type ProfileInfoType = {
    avatar: string | undefined
    name: string
    email: string
    packsCount: number
    editMode: boolean
    setEditMode: (editMode: boolean) => void
    onClickChangeEditModeHandler: () => void
    onClickLogoutChangeHandler: () => void
}

export const ProfileInfo = ({ avatar, name, email, packsCount, editMode, setEditMode, onClickChangeEditModeHandler, onClickLogoutChangeHandler }: ProfileInfoType) => {
    const updateTitle = () => {

    }
    return (
        <div className={style.profileInfo}>
            <div className={style.infoByUser}>
                <UserAvatar avatar={avatar} />
                <div className={style.infoUser}>

                    <div>
                        <div>
                            <EditableSpan title={'Name:' + name} editMode={editMode} setEditMode={setEditMode} updateTitle={updateTitle} />
                        </div>
                        <div>
                            <EditableSpan title={'Email:' + email} editMode={editMode} setEditMode={setEditMode} updateTitle={updateTitle} />
                        </div>
                        <div>
                            <EditableSpan title={'Total packs:' + packsCount} editMode={editMode} setEditMode={setEditMode} updateTitle={updateTitle} />
                        </div>
                    </div>

                    {/* <div> Name: {name}</div>
                    <div> Email: {email}</div>
                    <div>Total packs: {packsCount}</div> */}
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

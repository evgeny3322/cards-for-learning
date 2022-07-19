import { Button } from '@material-ui/core'
import React from 'react'
import { UserAvatar } from '../ProfileInfo/UserAvatar/UserAvatar'
import { EditableSpan } from './EditableSpan/EditableSpan'
import style from './EditProfileInfo.module.css'

type EditProfileInfoType = {
    title: string
    setTitle: (title: string) => void
    avatarUser?: string | undefined
    setAvatarUser: (avatarUser: string | undefined) => void
    email: string
    onClickChangeEditModeHandler: () => void
    updateUserInfoHandler: (title: string, avatarUser: string | undefined) => void

}

export const EditProfileInfo = ({ title, setTitle, avatarUser, setAvatarUser, email, onClickChangeEditModeHandler, updateUserInfoHandler }: EditProfileInfoType) => {



    return (

        <div className={style.container}>

            <div className={style.editUserInfo}>
                <div className={style.info}>User information</div>
                <div className={style.avatar}>
                    <UserAvatar avatar={avatarUser} />
                </div>
                <div className={style.information}>
                    <EditableSpan name={'Name: '} title={title} disabled={false} setTitle={setTitle} />
                    <EditableSpan name={'Email: '} title={email} disabled={true} setTitle={setTitle} />
                </div>
                <div className={style.button}>
                    <div className={style.firstButton}>
                        <Button
                            variant={'outlined'}
                            size={'small'}
                            onClick={() => updateUserInfoHandler(title, avatarUser)}
                        >
                            save
                        </Button>
                    </div>
                    <div className={style.secondButton}>
                        <Button
                            variant={'outlined'}
                            size={'small'}
                            onClick={onClickChangeEditModeHandler}
                        >
                            cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}
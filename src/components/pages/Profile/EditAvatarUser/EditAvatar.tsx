import React, { ChangeEvent } from 'react'
import addPhoto from '../../../../assets/images/addPhoto.svg'
import { useAppDispatch } from '../../../../bll/store'
import { UserAvatar } from '../ProfileInfo/UserAvatar/UserAvatar'
import style from '../EditProfileInfo/EditProfileInfo.module.css'
import { setAppError } from '../../../../bll/reducers/app-reducer'

type EditableAvatarType = {
    avatarUser: string | undefined
    setAvatarUser: (newImage: string) => void
}


export const EditAvatar = ({ avatarUser, setAvatarUser }: EditableAvatarType) => {

    const dispatch = useAppDispatch()

    const addPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files?.length) {
            // Encode image file as URL
            const fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);

            fileReader.onloadend = function () {

                if ((typeof fileReader.result) == 'string') {
                    //@ts-ignore
                    setAvatarUser(fileReader.result)

                } else {
                    dispatch(setAppError('Some error occured. Please try again'))
                }

            }
        }
    }

    return (
        <div className={style.containerPhoto}>
            <UserAvatar avatar={avatarUser} />

            <div className={style.changePhoto}>
                <label className={style.changePhotoLabel}>
                    <input className={style.changePhotoInput} onChange={addPhotoHandler} type="file" />
                    <img className={style.changePhotoIcon} src={addPhoto} alt="new_photo" />
                </label>
            </div>
        </div>
    )
}




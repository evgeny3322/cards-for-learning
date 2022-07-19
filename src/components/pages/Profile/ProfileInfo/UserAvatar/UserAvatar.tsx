import React from 'react'
import user from '../../../../../assets/images/user.png'
import style from '../../Profile.module.css'

export type UserAvatarType = {
    avatar?: string | undefined} 

export const UserAvatar = ({avatar}:UserAvatarType) => {
  return (
    <div className={style.infoAvatar}>
    {!avatar
        ? <img src={user} alt={'userPhoto'} className={style.photo} />
        : <img src={avatar} alt={'userPhoto'} className={style.photo} />}
</div>
  )
}

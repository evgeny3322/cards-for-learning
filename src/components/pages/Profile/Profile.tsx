import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../bll/store';
import style from './Profile.module.css'
import MultiRangeSlider from './MultiRangeSlider/MultiRangeSlider';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { Packs } from './Packs/Packs';
import { EditProfileInfo } from './EditProfileInfo/EditProfileInfo';
import { logoutProfileTC, updateUserInfoTC } from '../../../bll/reducers/profile-reducer';

export const Profile = React.memo(() => {

    const dispatch = useAppDispatch();

    const isAuth = useAppSelector<boolean>(state => state.login.isAuth)
    const avatar = useAppSelector<string | undefined>(state => state.login.data.avatar)
    const name = useAppSelector<string>(state => state.login.data.name)
    const email = useAppSelector<string>(state => state.login.data.email)
    const packsCount = useAppSelector<number>(state => state.login.data.publicCardPacksCount)

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(name)
    const [avatarUser, setAvatarUser] = useState(avatar)

    const onClickChangeEditModeHandler = () => {
        setEditMode(!editMode)
        // console.log(editMode);
    }

    const onClickLogoutChangeHandler = () => {
        dispatch(logoutProfileTC())
    }
    useEffect(() => {
        (title === name ? console.log('1') : console.log('2')

        )
    }, [name, title])


    const updateUserInfoHandler = async (name: string, avatar: string | undefined): Promise<any> => {
        await dispatch(updateUserInfoTC(name, avatar))
        const res = setEditMode(!editMode)
        return res
    }


    if (!isAuth) return <Navigate to={'/login'} />

    if (!editMode) {
        return (
            <>
                <div className={style.container}>
                    <div className={style.profile}>
                        <div className={style.information}>
                            <ProfileInfo
                                avatar={avatar}
                                name={name}
                                email={email}
                                packsCount={packsCount}
                                onClickChangeEditModeHandler={onClickChangeEditModeHandler}
                                onClickLogoutChangeHandler={onClickLogoutChangeHandler}
                            />
                            <div className={style.cardsInfo}>
                                <span className={style.textInCardsInfo}> information for cards </span>
                                <MultiRangeSlider min={0} max={100} />
                            </div>
                        </div>
                    </div>

                    <Packs isAuth={isAuth} />
                </div>

            </>
        );
    } else {
        return (
            <>
                <EditProfileInfo
                    title={title}
                    setTitle={setTitle}
                    avatarUser={avatarUser}
                    setAvatarUser={setAvatarUser}
                    email={email}
                    onClickChangeEditModeHandler={onClickChangeEditModeHandler}
                    updateUserInfoHandler={updateUserInfoHandler}
                />
            </>
        )
    }


})


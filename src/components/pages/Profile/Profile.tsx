import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../bll/store';
import style from './Profile.module.css'
import MultiRangeSlider from './MultiRangeSlider/MultiRangeSlider';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { logoutProfile } from '../../../bll/reducers/profile-reducer';

const Profile = () => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const dispatch = useAppDispatch();

    const isAuth = useAppSelector<boolean>(state => state.login.isAuth)
    const avatar = useAppSelector<string | undefined>(state => state.login.data.avatar)
    const name = useAppSelector<string>(state => state.login.data.name)
    const email = useAppSelector<string>(state => state.login.data.email)
    const packsCount = useAppSelector<number>(state => state.login.data.publicCardPacksCount)

    const onClickChangeEditModeHandler = () => {
        setEditMode(!editMode)
        console.log(editMode);
    }

    const onClickLogoutChangeHandler = () => {
        dispatch(logoutProfile())
    }

    if (!isAuth) return <Navigate to={'/login'} />

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
                            editMode={editMode}
                            setEditMode={setEditMode}
                            onClickChangeEditModeHandler={onClickChangeEditModeHandler}
                            onClickLogoutChangeHandler={onClickLogoutChangeHandler}
                        />
                        <div className={style.cardsInfo}>
                            <span className={style.textInCardsInfo}> information for cards </span>
                            <MultiRangeSlider min={0} max={100} />
                        </div>
                    </div>
                    <div className={style.cards}>
                        someday there will be cards
                    </div>
                </div>
            </div>


        </>
    );
};

export default Profile;
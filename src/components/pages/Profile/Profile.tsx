import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import style from './Profile.module.css'
import MultiRangeSlider from './MultiRangeSlider/MultiRangeSlider';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {logoutProfile} from '../../../bll/reducers/profile-reducer';
import Button from '@mui/material/Button';
import {styleBtn} from "../Login/LoginProperties";
import {PackCard} from "../../../api/pack-api";
import {
    setPage,
    setPageCount,
    setSearchPackName,
    selectPack,
    fetchCardsPack,
    setPackOwner
} from "../../../bll/reducers/pack-reducer";
import {PackTable} from "../PacksList/PackTable/PackTable";
import {Pagination} from "../../common/Pagination/Pagination";
import {controlModalWindowAC} from "../../../bll/reducers/modal-reducer";
import SearchField from "../../common/SearchField/SearchField";

const Profile = () => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const dispatch = useAppDispatch();

    const isAuth = useAppSelector<boolean>(state => state.login.isAuth)
    const avatar = useAppSelector<string | undefined>(state => state.login.data.avatar)
    const name = useAppSelector<string>(state => state.login.data.name)
    const email = useAppSelector<string>(state => state.login.data.email)
    const packsCount = useAppSelector<number>(state => state.login.data.publicCardPacksCount)
    const packName = useAppSelector(selectPack).packName
    const owner = useAppSelector<'all' | 'my'>(state => state.pack.packOwner)
    const cardsPacksTotalCount = useAppSelector<number>(state => state.pack.cardPacksTotalCount)
    const page = useAppSelector<number>(state => state.pack.page)
    const pageCount = useAppSelector<number>(state => state.pack.pageCount)
    const pack = useAppSelector<PackCard[]>(state => state.pack.cardPacks)
    const sortBy = useAppSelector<string>(state => state.pack.sortBy)
    const order = useAppSelector<'desc' | 'asc'>(state => state.pack.order)
    const maxSort = useAppSelector<number>(state => state.pack.maxSort)
    const minSort = useAppSelector<number>(state => state.pack.minSort)

    const searchByPackName = (search: string) => {
        dispatch(setSearchPackName(search))
    }

    const onClickChangeEditModeHandler = () => {
        setEditMode(!editMode)
        console.log(editMode);
    }

    const onClickLogoutChangeHandler = () => {
        dispatch(logoutProfile())
    }

    const setPackPageCallback = (page: number) => {
        dispatch(setPage(page + 1));
    }

    const setPackPageCountCallback = (page: number) => {
        dispatch(setPageCount(page))
    }

    const openAddModalWindowHandle = () => {
        dispatch(controlModalWindowAC(true, "ADD"))
    }

    React.useEffect(() => {
        isAuth && dispatch(setPackOwner('my'))
    }, [dispatch, isAuth])

    React.useEffect(() => {
        isAuth && dispatch(fetchCardsPack());
    }, [sortBy, order, minSort, maxSort, packName, pageCount, page])

    if (!isAuth) return <Navigate to={'/login'}/>

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
                            <MultiRangeSlider min={0} max={100}/>
                        </div>
                    </div>
                </div>

                <div className={style.content}>
                    <SearchField searchCallback={searchByPackName} placeholder={'Search'} initState={packName}/>

                    <div className={style.buttonPosition}>
                        <Button
                            sx={[styleBtn, {
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                margin: '0px 0 14px 0',
                                padding: '8px 16px 4px',
                                color: '#2c2b3f',
                                height: 'auto'
                            }]}
                            variant={'contained'}
                            onClick={openAddModalWindowHandle}
                        >
                            Add new Pack
                        </Button>
                    </div>

                    {pack.length === 0 && owner === 'my'
                        ? <div>You have no packs. Do you want to add?</div>
                        : <>
                            <PackTable pack={pack} sortBy={sortBy} order={order}/>

                            <Pagination page={page}
                                        pageCount={pageCount}
                                        cardsPacksTotalCount={cardsPacksTotalCount}
                                        setPageCallback={setPackPageCallback}
                                        setPageCountCallback={setPackPageCountCallback}
                            />
                        </>
                    }

                </div>
            </div>


        </>
    );
};

export default Profile;
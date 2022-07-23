import React from 'react'
import style from '../Profile.module.css'
import Button from '@mui/material/Button';
import { styleBtn } from '../../Login/LoginProperties';
import { PackTable } from '../../PacksList/PackTable/PackTable';
import { Pagination } from '../../../common/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../../../bll/store';
import { PackCard } from '../../../../api/pack-api';
import { fetchCardsPack, selectPack, setPackOwner, setPage, setPageCount, setSearchPackName } from '../../../../bll/reducers/pack-reducer';
import { controlModalWindowAC } from '../../../../bll/reducers/modal-reducer';
import { SearchField } from '../../../common/SearchField/SearchField';

export type PacksType = {
    isAuth: boolean
}

export const Packs = ({ isAuth }: PacksType) => {

    const dispatch = useAppDispatch();

    const owner = useAppSelector<'all' | 'my'>(state => state.pack.packOwner)
    const cardsPacksTotalCount = useAppSelector<number>(state => state.pack.cardPacksTotalCount)
    const pack = useAppSelector<PackCard[]>(state => state.pack.cardPacks)
    const packName = useAppSelector(selectPack).packName
    const page = useAppSelector<number>(state => state.pack.page)
    const pageCount = useAppSelector<number>(state => state.pack.pageCount)
    const sortBy = useAppSelector<string>(state => state.pack.sortBy)
    const order = useAppSelector<'desc' | 'asc'>(state => state.pack.order)
    const maxSort = useAppSelector<number>(state => state.pack.maxSort)
    const minSort = useAppSelector<number>(state => state.pack.minSort)



    const setPackPageCallback = (page: number) => {
        dispatch(setPage(page + 1));
    }

    const setPackPageCountCallback = (page: number) => {
        dispatch(setPageCount(page))
    }

    const openAddModalWindowHandle = () => {
        dispatch(controlModalWindowAC(true, "ADD"))
    }

    const searchByPackName = (search: string) => {
        dispatch(setSearchPackName(search))
    }


    React.useEffect(() => {
        isAuth && dispatch(setPackOwner('my'))
    }, [dispatch, isAuth])

    React.useEffect(() => {
        isAuth && dispatch(fetchCardsPack());
    }, [sortBy, order, minSort, maxSort, packName, pageCount, page, isAuth, dispatch])



    return (
        <div className={style.content}>
            <SearchField searchCallback={searchByPackName} placeholder={'Search'} initState={packName} />

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
                    <PackTable pack={pack} sortBy={sortBy} order={order} />

                    <Pagination page={page}
                        pageCount={pageCount}
                        cardsPacksTotalCount={cardsPacksTotalCount}
                        setPageCallback={setPackPageCallback}
                        setPageCountCallback={setPackPageCountCallback}
                    />
                </>
            }

        </div>
    )
}

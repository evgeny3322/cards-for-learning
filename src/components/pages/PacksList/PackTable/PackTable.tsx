import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {Button, ButtonProps, styled} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../../bll/store";
import {PackCard} from "../../../../api/pack-api";
import {setCurrentPackPropsAC, setSearchPackName, setSortBy} from "../../../../bll/reducers/pack-reducer";
import {PackItem} from "./PackItem/PackItem";
import {PackItemSkeleton} from "./PackItemSkeleton/PackItemSkeleton";
import {PackTableHeader} from "./PackTableHeader/PackTableHeader";
import {controlModalWindowAC, ModalComponentType} from "../../../../bll/reducers/modal-reducer";


type TablePackPropsType = {
    pack: PackCard[]
    sortBy: string
    order: 'desc' | 'asc'
}

export const PackTable: React.FC<TablePackPropsType> = ({pack, sortBy, order}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    //todo может потом перенести
    const authorizedUserId = useAppSelector(state => state.login.data._id)
    const status = useAppSelector(state => state.appReducer.loadingStatus)

    const rows = pack.map(el => createData(
        el.name,
        el.cardsCount,
        new Date(el.created).toLocaleDateString(),
        el.user_name,
        new Date(el.updated).toLocaleString(),
        el._id,
        el.user_id))

    const onClickSortByHandler = (sortBy: string) => () => {
        dispatch(setSortBy(sortBy))
    }

    const handlerGetCards = (e: React.MouseEvent<HTMLAnchorElement>, length: number, isOwner: boolean) => {
        if (length === 0 && !isOwner) {
            e.preventDefault()
        }
    }

    const handlerLearnCards = (id: string, name: string) => {
        navigate(`../card/${id}`)
        // dispatch(setPackId(id))
        dispatch(setSearchPackName(name))
    }

    const openModalWindowHandle = (isOpen: boolean, component: ModalComponentType, packID: string, packName: string) => {
        dispatch(controlModalWindowAC(isOpen, component))
        dispatch(setCurrentPackPropsAC(packName, packID))
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <PackTableHeader sortBy={sortBy} order={order} onClickSortByHandler={onClickSortByHandler}/>
                    <TableBody>
                        {rows.map((row) => {
                                if (status === "loading") {
                                    return <PackItemSkeleton key={row.packID}
                                                             isOwner={authorizedUserId === row.packUserID}/>
                                }
                                return (
                                    <PackItem
                                        authorizedUserId={authorizedUserId}
                                        key={row.packID}
                                        handlerLearnCards={handlerLearnCards}
                                        openModalWindow={openModalWindowHandle}
                                        handlerGetCards={handlerGetCards} {...row}/>
                                )
                            }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}


interface Data {
    packName: string;
    cardsCount: number;
    createdDate: string;
    createdByName: string;
    updatedDate: string;
    packID: string;
    packUserID: string;
    actions?: null;
}

function createData(
    packName: string,
    cardsCount: number,
    createdDate: string,
    createdByName: string,
    updatedDate: string,
    packID: string,
    packUserID: string
): Data {
    return {packName, cardsCount, createdDate, createdByName, updatedDate, packID, packUserID};
}

export const ButtonCP = styled(Button)<ButtonProps>(() => ({
    backgroundColor: '#33b198',
    color: '#fff',
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    transition: '.3s',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#33b198',
        opacity: '0.85',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
    },
    '&:disabled': {
        background: '#d9d9d9',
        color: '#858585',
        boxShadow: 'none'
    }
}))

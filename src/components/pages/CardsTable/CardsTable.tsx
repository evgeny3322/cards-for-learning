import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Rating, TableSortLabel} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {CardType} from '../../../api/cards-api';
import {OrderType, setSortCards} from '../../../bll/reducers/cards-reducer';
import {useAppDispatch} from '../../../bll/store';
import {ButtonCP} from '../PacksList/PackTable/PackTable';
import {
    controlModalWindowAC,
    ModalComponentType,
    setCurrentPackPropsAC
} from '../../../bll';

type TablePackPropsType = {
    cards: CardType[]
    sortCards: string
    order: OrderType
    packUserId: string
    authorizedUserId: string
}

export const CardsTable: React.FC<TablePackPropsType> = ({
                                                             cards,
                                                             order,
                                                             sortCards,
                                                             packUserId,
                                                             authorizedUserId
                                                         }) => {
    const dispatch = useAppDispatch()

    const rows = cards.map(el => createData(
        el.question,
        el.answer,
        new Date(el.updated).toLocaleString(),
        el.grade,
        el._id,
        el.cardsPack_id,
        el.user_id))

    const onClickSortByHandler = (sortCard: string) => () => {
        dispatch(setSortCards(sortCard))
    }

    const openModalWindowHandler = (isOpen: boolean, component: ModalComponentType, packID: string, packName: string) => {
        dispatch(controlModalWindowAC(isOpen, component))
        dispatch(setCurrentPackPropsAC(packName, packID))
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead sx={styleTHead}>
                        <TableRow sx={styleAlignCell}>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortCards === 'question'}
                                    direction={sortCards === 'question' ? order : 'asc'}
                                    onClick={onClickSortByHandler('question')}
                                >Question</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortCards === 'answer'}
                                    direction={sortCards === 'answer' ? order : 'asc'}
                                    onClick={onClickSortByHandler('answer')}
                                >Answer</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortCards === 'updated'}
                                    direction={sortCards === 'updated' ? order : 'asc'}
                                    onClick={onClickSortByHandler('updated')}
                                >Last Updated</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortCards === 'grade'}
                                    direction={sortCards === 'grade' ? order : 'asc'}
                                    onClick={onClickSortByHandler('grade')}
                                >Grade</TableSortLabel>
                            </TableCell>

                            {packUserId === authorizedUserId
                                ? <TableCell>Actions</TableCell>
                                : null
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.cardID}
                                sx={[styleTd, styleAlignCell]}>
                                <TableCell>{row.question}</TableCell>
                                <TableCell>{row.answer}</TableCell>
                                <TableCell>{row.updatedDate}</TableCell>
                                <TableCell>
                                    <Rating
                                        name="simple-controlled"
                                        value={row.grade}
                                        readOnly
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{opacity: 0.55}}
                                                             fontSize="inherit"/>}
                                    />
                                </TableCell>
                                {packUserId === authorizedUserId
                                    ? <TableCell>
                                        <div style={{
                                            display: 'flex',
                                            gap: '14px',
                                            justifyContent: 'end'
                                        }}>
                                            {row.cardsPackOwnerID === authorizedUserId &&
                                                <Button variant={'contained'}
                                                        color={'error'}
                                                        sx={{textTransform: 'none'}}
                                                        onClick={() => openModalWindowHandler(true, 'CARD-DELETE', row.cardID, row.question)}
                                                >Delete</Button>
                                            }
                                            {row.cardsPackOwnerID === authorizedUserId &&
                                                <ButtonCP
                                                    onClick={() => openModalWindowHandler(true, 'CARD-EDIT', row.cardID, row.question)}>Edit</ButtonCP>
                                            }
                                        </div>
                                    </TableCell>
                                    : null
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}

const styleTHead = {
    background: '#2c2b3f',
    'th': {color: '#fff', fontWeight: 'bold'},
    'th: nth-of-type(4)': {width: '158px'},
    'th: nth-of-type(5)': {width: '186px'}
}
const styleTd = {
    '&:last-child td, &:last-child th': {border: 0},
    '&:nth-of-type(even)': {background: ' #F8F7FD'}
}
const styleAlignCell = {
    '& :not(:first-of-type)': {textAlign: 'left'}
}
const styleActiveLabel = {
    color: '#fff !important',
    '& svg': {color: '#fff !important'}
}

interface Data {
    question: string;
    answer: string;
    updatedDate: string;
    grade: number;
    cardID: string;
    cardsPackID: string;
    cardsPackOwnerID: string
}

function createData(
    question: string,
    answer: string,
    updatedDate: string,
    grade: number,
    cardID: string,
    cardsPackID: string,
    cardsPackOwnerID: string
): Data {
    return {question, answer, updatedDate, grade, cardID, cardsPackID, cardsPackOwnerID};
}
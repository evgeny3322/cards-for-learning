import React from 'react';
import s from './CardsList.module.css';
import {Navigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {
    addNewCard,
    getCards,
    OrderType,
    searchByQuestion, setCardPage, setCardPageCount
} from '../../../bll/reducers/cards-reducer';
import {TableCards} from './TableCards';
import {CardType} from '../../../api/cards-api';
import {styleBtn} from '../Login/LoginProperties';
import {LoadingButton} from '@mui/lab';
import {BackArrow} from '../../common/BackArrow/BackArrow';
import SearchField from '../../common/SearchField/SearchField';
import {Pagination} from '../../common/Pagination/Pagination';

export const CardsList = () => {
    const dispatch = useAppDispatch()
    const urlParams = useParams<'cardPackID'>();
    const cardsPack_ID = urlParams.cardPackID as string;

    const isAuth = useAppSelector<boolean>(state => state.login.isAuth)
    const cards = useAppSelector<CardType[]>(state => state.cards.cards)
    const cardsCurrentPage = useAppSelector<number>(state => state.cards.page)
    const cardsPageCount = useAppSelector<number>(state => state.cards.pageCount)
    const cardsTotalCount = useAppSelector<number>(state => state.cards.cardsTotalCount)
    const cardsQuestion = useAppSelector<string>(state => state.cards.cardQuestion)
    const cardsAnswer = useAppSelector<string>(state => state.cards.cardAnswer)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const order = useAppSelector<OrderType>(state => state.cards.order)

    const searchByQuestionCallback = (question: string) => {
        dispatch(searchByQuestion(question))
    }
    const addNewCardHandler = () => {
        dispatch(addNewCard(cardsPack_ID))
    }
    const setCardsPageCallback = (page: number) => {
        dispatch(setCardPage(page + 1))
    }
    const setCardsPageCountCallback = (page: number) => {
        dispatch(setCardPageCount(page))
    }

    React.useEffect(() => {
        if (cardsPack_ID) {
            dispatch(getCards(cardsPack_ID));
        }
    }, [cardsAnswer, cardsQuestion, cardsCurrentPage, cardsPageCount, cardsPack_ID, sortCards, order])

    if (!isAuth) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={s.cardsPage}>
            <BackArrow/>
            <div className={s.search}>
                <SearchField
                    searchCallback={searchByQuestionCallback}
                    placeholder={'Search'}
                    initState={cardsQuestion}
                />
            </div>
            <LoadingButton
                sx={[styleBtn, {
                    width: '166px'
                }]}
                type={'submit'}
                onClick={addNewCardHandler}
            >
                Add New Card
            </LoadingButton>
            <TableCards cards={cards} order={order} sortCards={sortCards}/>
            <Pagination page={cardsCurrentPage}
                        pageCount={cardsPageCount}
                        cardsPacksTotalCount={cardsTotalCount}
                        setPageCallback={setCardsPageCallback}
                        setPageCountCallback={setCardsPageCountCallback}
            />
        </div>
    );
};

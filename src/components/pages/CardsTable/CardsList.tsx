import React from 'react';
import s from './CardsList.module.css';
import {Navigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {
    addNewCard,
    getCards,
    OrderType,
    searchByQuestion
} from '../../../bll/reducers/cards-reducer';
import {TableCards} from './TableCards';
import {CardType} from '../../../api/cards-api';
import {styleBtn} from '../Login/LoginProperties';
import {LoadingButton} from '@mui/lab';
import {BackArrow} from '../../common/BackArrow/BackArrow';
import SearchField from "../../common/SearchField/SearchField";
// import {SearchField} from "../../common/SearchField/SearchField";

export const CardsList = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams<{ id: string }>()

    const isAuth = useAppSelector<boolean>(state => state.login.isAuth)
    const cards = useAppSelector<CardType[]>(state => state.cards.cards)
    const cardsQuestion = useAppSelector<string>(state => state.cards.cardQuestion)
    const cardsAnswer = useAppSelector<string>(state => state.cards.cardAnswer)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const order = useAppSelector<OrderType>(state => state.cards.order)
    const cardsPackId = useAppSelector(state => state.cards.cardsPack_id)

    const searchByQuestionCallback = (question: string) => {
        dispatch(searchByQuestion(question))
    }
    const addNewCardHandler = () => {
        //id - for check
        dispatch(addNewCard('62c700b803564f0004867f3e'))//cardsPackId
    }
    React.useEffect(() => {
        //id - for check
        if ('62c700b803564f0004867f3e') {
            dispatch(getCards('62c700b803564f0004867f3e'));//id(useParams)
        }
    }, [cardsAnswer, cardsQuestion, cardsPackId, sortCards, order])

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
                    width: "166px"
                }]}
                type={'submit'}
                onClick={addNewCardHandler}
            >
                Add New Card
            </LoadingButton>
            <TableCards cards={cards} order={order} sortCards={sortCards}/>
        </div>
    );
};

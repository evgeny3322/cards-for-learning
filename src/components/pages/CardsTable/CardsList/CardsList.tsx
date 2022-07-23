import React from 'react';
import s from './CardsList.module.css';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../bll/store';
import {
    fetchCards,
    OrderType, searchByAnswer,
    searchByQuestion,
    setCardPage,
    setCardPageCount,
    setCards,
    setPackId
} from '../../../../bll/reducers/cards-reducer';
import { CardsTable } from '../CardsTable';
import { CardType } from '../../../../api/cards-api';
import { Button } from '@mui/material';
import styles from '../../Profile/Profile.module.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Pagination } from '../../../common/Pagination/Pagination';
import {
    controlModalWindowAC,
    ModalComponentType,
    setCurrentPackPropsAC
} from '../../../../bll';
import { styleBtn } from '../../../../styles/commonMui';
import { SearchField } from '../../../common/SearchField/SearchField';

export const CardsList = () => {
    const dispatch = useAppDispatch()
    const { id: packUrlId } = useParams()

    const cards = useAppSelector<CardType[]>(state => state.cards.cards)
    const cardsCurrentPage = useAppSelector<number>(state => state.cards.page)
    const cardsPageCount = useAppSelector<number>(state => state.cards.pageCount)
    const cardsTotalCount = useAppSelector<number>(state => state.cards.cardsTotalCount)
    const cardsQuestion = useAppSelector<string>(state => state.cards.cardQuestion)
    const cardsAnswer = useAppSelector<string>(state => state.cards.cardAnswer)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const order = useAppSelector<OrderType>(state => state.cards.order)
    const cardsPackUserID = useAppSelector(state => state.cards.packUserId)

    const authorizedUserId = useAppSelector(state => state.login.data._id)

    const searchByQuestionCallback = (question: string) => {
        dispatch(searchByQuestion(question))
    }
    const searchByAnswerCallback = (answer: string) => {
        dispatch(searchByAnswer(answer))
    }
    const backToPacksHandler = () => {
        dispatch(setCards([]))
        dispatch(searchByQuestion(''))
    }
    const setCardsPageCallback = (page: number) => {
        dispatch(setCardPage(page + 1))
    }
    const setCardsPageCountCallback = (page: number) => {
        dispatch(setCardPageCount(page))
    }
    const openModalWindowHandler = (isOpen: boolean, component: ModalComponentType, packID: string, packName: string) => {
        dispatch(controlModalWindowAC(isOpen, component))
        dispatch(setCurrentPackPropsAC(packName, packID))
    }

    React.useEffect(() => {
        packUrlId && dispatch(setPackId(packUrlId))
    }, [])

    React.useEffect(() => {
        dispatch(fetchCards())
    }, [cardsAnswer, cardsQuestion, cardsCurrentPage, cardsPageCount, packUrlId, sortCards, order])

    return (
        <div style={{ margin: '30px auto' }}>
            <div className={styles.container}>
                <div className={s.contentBlock}>
                    <div className={s.backLinkWrapper}>
                        <Link className={s.backLink} to={'../pack-table'}
                            onClick={backToPacksHandler}>
                            <ArrowRightAltIcon sx={arrow} />
                            Back</Link>
                    </div>
                    <div className={s.cardsSearchBar}>
                        <SearchField
                            searchCallback={searchByQuestionCallback}
                            placeholder={'Question'}
                            initState={cardsQuestion}
                        />
                        <SearchField
                            searchCallback={searchByAnswerCallback}
                            placeholder={'Answer'}
                            initState={cardsAnswer}
                        />
                    </div>

                    {cardsPackUserID === authorizedUserId &&
                        <div>
                            <Button
                                sx={[styleBtn, {
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    margin: '0 0 14px 0',
                                    padding: '8px 16px 4px',
                                    color: '#2c2b3f',
                                    height: 'auto'
                                }]}
                                variant={'contained'}
                                onClick={() => openModalWindowHandler(true, 'ADD-NEW-CARD', packUrlId as string, '')}
                            >
                                Add new Card
                            </Button>
                        </div>
                    }

                    <CardsTable cards={cards}
                        order={order}
                        sortCards={sortCards}
                        packUserId={cardsPackUserID}
                        authorizedUserId={authorizedUserId} />
                    <Pagination page={cardsCurrentPage}
                        pageCount={cardsPageCount}
                        cardsPacksTotalCount={cardsTotalCount}
                        setPageCallback={setCardsPageCallback}
                        setPageCountCallback={setCardsPageCountCallback}
                    />
                </div>
            </div>
        </div>
    );
};
const arrow = {
    height: '1.4em',
    width: '1.4em',
    transform: 'scale(-1)',
    marginRight: '6px'
}
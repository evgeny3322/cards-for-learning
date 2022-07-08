import {ThunkType} from '../store';
import {setAppError, setLoadingStatus} from './app-reducer';
import {CardsApi, CardType} from '../../api/cards-api';

export type OrderType = 'desc' | 'asc'
type InitialStateType = typeof initialState
const initialState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: '',

    sortCards: '',
    order: 'desc' as OrderType,
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    card_id: '',
    min: 0,
    max: 0
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return {...state, cards: action.cards}
        case 'CARDS/SET-QUESTION':
            return {...state, cardQuestion: action.cardQuestion}
        case 'CARDS/SET-SORT-CARDS':
            const isAsc = state.sortCards === action.sortCards && state.order === 'asc'
            return {...state, sortCards: action.sortCards, order: isAsc ? 'desc' : 'asc'}
        default:
            return state
    }
}

// action
export const setCards = (cards: CardType[]) => ({type: 'CARDS/SET-CARDS', cards} as const)
export const searchByQuestion = (cardQuestion: string) => ({
    type: 'CARDS/SET-QUESTION',
    cardQuestion
} as const)
export const setSortCards = (sortCards: string) => ({
    type: 'CARDS/SET-SORT-CARDS',
    sortCards
} as const)

// thunk
export const getCards = (cardsPackId: string): ThunkType => async (dispatch) => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsApi.getCards(cardsPackId)
        dispatch(setCards(res.data.cards))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}
export const addNewCard = (packID: string): ThunkType => async (dispatch) => {

    const question = 'What is React'
    const answer = 'library'

    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsApi.createCard(packID, question, answer)
        dispatch(getCards(res.data.newCard.cardsPack_id))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}
export const deleteCard = (id: string): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsApi.deleteCard(id)
        dispatch(getCards(res.data.deletedCard.cardsPack_id))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}

export const updateCard = (id: string): ThunkType => async dispatch => {
    const newU = 'Updated'
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsApi.updateCard(id, newU)
        dispatch(getCards(res.data.updatedCard.cardsPack_id))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}

// type
export type CardsReducerActionType = ReturnType<typeof setCards>
    | ReturnType<typeof searchByQuestion>
    | ReturnType<typeof setSortCards>

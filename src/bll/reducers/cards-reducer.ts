import {AppRootStateType, ThunkType} from '../store';
import {setAppError, setLoadingStatus, setTrash} from './app-reducer';
import {CardsApi, CardsQueryParams, CardType} from '../../api/cards-api';
import {controlModalWindowAC} from './modal-reducer';
import {fetchCardsPack, setCurrentPackPropsAC} from './pack-reducer';
import {CardsPackAPI} from "../../api/pack-api";

export type OrderType = 'desc' | 'asc'
const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: '',

    sortCards: '',
    order: 'desc',
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    card_id: '',
    min: 0,
    max: 0,
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-INFO':
            return {...state, ...action.info}
        case 'CARDS/SET_CARD_PAGE':
            return {...state, page: action.page}
        case 'CARDS/SET_CARD_PAGE_COUNT':
            return {...state, pageCount: action.pageCount}
        case 'CARDS/SET-CARDS':
            return {...state, cards: action.cards}
        case 'CARDS/SET-PACK-ID':
            return {...state, cardsPack_id: action.packId}
        case 'CARDS/SET-ANSWER':
            return {...state, cardAnswer: action.cardAnswer}
        case 'CARDS/SET-QUESTION':
            return {...state, cardQuestion: action.cardQuestion}
        case 'CARDS/UPDATE-GRADE':
            const newCards = state.cards.map((c: CardType) => c._id === action.id ?
                {...c, grade: action.grade, shots: action.shots} : c)
            return {...state, cards: newCards}
        case 'CARDS/SET-SORT-CARDS':
            const isAsc = state.sortCards === action.sortCards && state.order === 'asc'
            return {...state, sortCards: action.sortCards, order: isAsc ? 'desc' : 'asc'}
        default:
            return state
    }
}

export type CardsReducerActionType = ReturnType<typeof setCards>
    | ReturnType<typeof setCardsInfo>
    | ReturnType<typeof setCardPage>
    | ReturnType<typeof setCardPageCount>
    | ReturnType<typeof searchByAnswer>
    | ReturnType<typeof setPackId>
    | ReturnType<typeof searchByQuestion>
    | ReturnType<typeof setSortCards>
    | ReturnType<typeof updateGrade>

// actions
export const setCards = (cards: CardType[]) => ({type: 'CARDS/SET-CARDS', cards} as const)
export const setCardsInfo = (info: CardsInfoType) => ({
    type: 'CARDS/SET-INFO',
    info
} as const)
export const setCardPage = (page: number) => ({
    type: 'CARDS/SET_CARD_PAGE',
    page
} as const)
export const setCardPageCount = (pageCount: number) => ({
    type: 'CARDS/SET_CARD_PAGE_COUNT',
    pageCount
} as const)
export const setPackId = (packId: string) => ({
    type: 'CARDS/SET-PACK-ID',
    packId
} as const)
export const searchByQuestion = (cardQuestion: string) => ({
    type: 'CARDS/SET-QUESTION',
    cardQuestion
} as const)
export const searchByAnswer = (cardAnswer: string) => ({type: 'CARDS/SET-ANSWER', cardAnswer} as const)
export const setSortCards = (sortCards: string) => ({
    type: 'CARDS/SET-SORT-CARDS',
    sortCards
} as const)
export const updateGrade = (id: string, grade: number, shots: number) => (
    {type: 'CARDS/UPDATE-GRADE', id, grade, shots} as const)

// thunk
export const fetchCards = (): ThunkType => async (dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const params: CardsQueryParams = {
        cardQuestion: state.cards.cardQuestion,
        cardAnswer: state.cards.cardAnswer,
        cardsPack_id: state.cards.cardsPack_id,
        sortCards: (state.cards.order === 'desc' ? 0 : 1) + state.cards.sortCards,
        min: state.cards.min,
        max: state.cards.max,
        page: state.cards.page,
        pageCount: state.cards.pageCount,
    }
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsApi.fetchCards(params)
        dispatch(setCards(res.data.cards))
        const info: CardsInfoType = {
            page: res.data.page,
            pageCount: res.data.pageCount,
            cardsTotalCount: res.data.cardsTotalCount,
            maxGrade: res.data.maxGrade,
            minGrade: res.data.minGrade,
            packUserId: res.data.packUserId,
        }
        dispatch(setCardsInfo(info))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}

export const addNewCard = (packID: string, question: string, answer: string): ThunkType => async (dispatch) => {

    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsApi.addNewCard(packID, question, answer)
        dispatch(fetchCards())
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
        dispatch(controlModalWindowAC())
        dispatch(setCurrentPackPropsAC())
    }
}

export const removeCard = (id: string): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsApi.deleteCard(id)
        dispatch(fetchCards())
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
        dispatch(controlModalWindowAC())
        dispatch(setCurrentPackPropsAC())
    }
}

export const editCardTC = (id: string, question: string): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsApi.updateCard(id, question)
        dispatch(fetchCards())
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
        dispatch(controlModalWindowAC())
        dispatch(setCurrentPackPropsAC())
    }
}

export const updatePackNameTC = (id: string, name: string): ThunkType =>
    async (
        dispatch,
    ) => {
        try {
            dispatch(setLoadingStatus('loading'))
            const res = await CardsPackAPI.updatePack(id, name)
            dispatch(setTrash(res.data))
            dispatch(fetchCardsPack())
        } catch (e: any) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setAppError(error))
        } finally {
            dispatch(setLoadingStatus('idle'))
            dispatch(controlModalWindowAC())
            dispatch(setCurrentPackPropsAC())
        }
    }

export const updateCardGrade = (id: string, grade: number): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsApi.updateGrade(id, grade)
        const data = res.data.updatedGrade
        dispatch(updateGrade(data.card_id, data.grade, data.shots))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}


// type
type InitialStateType = CardsInfoType & {
    cards: CardType[]
    sortCards: string
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    order: OrderType
    card_id: string
}
type CardsInfoType = {
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
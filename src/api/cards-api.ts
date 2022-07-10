import {instance} from './auth-api';

export const CardsApi = {
    getCards(id: string) {
        return instance.get<CardsResponseType>(`cards/card?cardsPack_id=${id ? id : ''}`)
    },
    createCard(cardsPack_id: string, question: string, answer: string) {
        return instance.post<CreateCardResponseType>('/cards/card', {
            card: {
                cardsPack_id,
                question,
                answer
            }
        })
    },
    deleteCard(cardId: string) {
        return instance.delete<DeleteCardResponseType>(`cards/card/?id=${cardId}`);
    },
    updateCard(_id: string, question: string) {
        return instance.put<UpdatedCardResponseType>('cards/card', {
            card: {
                _id,
                question
            }
        });
    }
}

// type
export type CardType = {
    question: string
    answer: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
export type CardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
type CreateCardResponseType = {
    newCard: {
        cardsPack_id: string
    }
}
type DeleteCardResponseType = {
    deletedCard: {
        cardsPack_id: string
    }
}
type UpdatedCardResponseType = {
    updatedCard: {
        cardsPack_id: string
    }
}
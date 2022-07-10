import {AppRootStateType} from "../store";

const initialState: ModalStateType = {
    isOpen: false,
    component: null,
}

export const modalReducer =
    (
        state: ModalStateType = initialState,
        action: ModalReducerActionsType,
    ): ModalStateType => {

        switch (action.type) {
            case "SET_MODAL_WINDOW_PROP":
                return {
                    ...state,
                    ...action.payload
                }
            default:
                return state
        }
    }

//selector
export const selectModal = (state: AppRootStateType) => state.modal

//actionCreators
export const controlModalWindowAC =
    (isOpen: boolean = false, component: ModalComponentType = null) => {
        return {
            type: "SET_MODAL_WINDOW_PROP",
            payload: {
                isOpen,
                component
            }
        } as const
    }

//types
export type ModalComponentType =
    | "DELETE"
    | "ADD"
    | "EDIT"
    | "ADD-NEW-CARD"
    | "CARD-DELETE"
    | "CARD-EDIT"
    | null

export type ModalStateType = {
    isOpen: boolean,
    component: ModalComponentType,
}

export type ModalReducerActionsType =
    | ReturnType<typeof controlModalWindowAC>

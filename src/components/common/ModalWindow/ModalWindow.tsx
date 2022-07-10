import React, {ChangeEvent} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {
    addCardPackTC,
    removePackTC,
    selectPack,
    setCurrentPackPropsAC,
    updatePackNameTC,
} from "../../../bll/reducers/pack-reducer";
import {
    controlModalWindowAC,
    selectModal
} from "../../../bll/reducers/modal-reducer";
import classes from "./ModalWindow.module.css";
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {selectAppStatus} from "../../../bll/reducers/app-reducer";
import {AddModal} from "../ModalComponents/AddModal";
import {DeleteModal} from "../ModalComponents/DeleteModal";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: "5px",
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};



export const ModalWindow = () => {

    const isOpen = useAppSelector(selectModal).isOpen
    const component = useAppSelector(selectModal).component
    const currentPackID = useAppSelector(selectPack).currentPackID
    const currentPackName = useAppSelector(selectPack).currentPackName
    const status = useAppSelector(selectAppStatus)


    const dispatch = useAppDispatch()

    const closeModalClick = () => {
        dispatch(controlModalWindowAC())
        dispatch(setCurrentPackPropsAC())

    }

    const removePackClick = () => {
        dispatch(removePackTC(currentPackID as string))
    }

    // const removeCardClick = () => {
    //     dispatch(cards.removeCard(currentPackID as string))
    // }


    const updateCurrentPackName = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setCurrentPackPropsAC(e.currentTarget.value, currentPackID))
    }

    const addNewPack = () => {
        dispatch(addCardPackTC(currentPackName))
    }

    // const editCardQuestion = () => {
    //     dispatch(cards.editCardTC(currentPackID as string, currentPackName))
    // }
    //
    // const addNewCard = (question: string, answer: string) => {
    //     dispatch(cards.addNewCard(currentPackID as string, question, answer))
    // }

    // const updatePackName = () => {
    //     dispatch(updatePackNameTC(currentPackID as string, currentPackName))
    // }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={closeModalClick}
            >
                <Fade in={isOpen}>
                    <Box className={classes.modalWrapper} sx={style}>
                        {component === "ADD" && <AddModal newPackNameValue={currentPackName}
                                                          isLoading={status === "loading"}
                                                          addNewPack={addNewPack}
                                                          updateNewPackName={updateCurrentPackName}
                                                          closeModalClick={closeModalClick}/>
                        }
                        {component === "DELETE" && <DeleteModal isLoading={status === "loading"}
                                                                title={"Delete Pack"}
                                                                removeClick={removePackClick}
                                                                currentName={currentPackName}
                                                                closeModalClick={closeModalClick}/>
                        }
                        {/*{component === "CARD-DELETE" && <DeleteModal isLoading={status === "loading"}*/}
                        {/*                                             title={"Delete Card"}*/}
                        {/*                                             removeClick={removeCardClick}*/}
                        {/*                                             currentName={currentPackName}*/}
                        {/*                                             closeModalClick={closeModalClick}/>*/}
                        {/*}*/}
                        {/*{component === "ADD-NEW-CARD" && <AddCardModal closeModalClick={closeModalClick}*/}
                        {/*                                               addNewCard={addNewCard}*/}
                        {/*                                               isLoading={status === "loading"}/>*/}
                        {/*}*/}
                        {/*{component === "EDIT" && <EditModal onChangeValue={updateCurrentPackName}*/}
                        {/*                                    isLoading={status === "loading"}*/}
                        {/*                                    updatePackName={updatePackName}*/}
                        {/*                                    value={currentPackName}*/}
                        {/*                                    closeModalClick={closeModalClick}/>*/}
                        {/*}*/}
                        {/*{component === "CARD-EDIT" && <EditCardModal closeModalClick={closeModalClick}*/}
                        {/*                                             value={currentPackName}*/}
                        {/*                                             onChangeValue={updateCurrentPackName}*/}
                        {/*                                             editCardQuestion={editCardQuestion}*/}
                        {/*                                             isLoading={status === "loading"}/>*/}
                        {/*}*/}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};



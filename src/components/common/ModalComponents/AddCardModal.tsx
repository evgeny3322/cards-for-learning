import React, {ChangeEvent, FC, useState} from 'react';
import classes from "./AddModal.module.css";
import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ButtonCP } from '../../pages/PacksList/PackTable/PackTable';

type PropsType = {
    closeModalClick: () => void
    addNewCard: (question: string, answer: string) => void
    isLoading: boolean
}

export const AddCardModal: FC<PropsType> =
    ({
         closeModalClick,
         addNewCard,
         isLoading
     }) => {

        const [answer, setAnswer] = useState('')
        const [question, setQuestion] = useState('')

        const changeAnswerValue = (answer: string) => {
            setAnswer(answer)
        }

        const changeQuestionValue = (question: string) => {
            setQuestion(question)
        }

        const addClickHandler = () => {
            addNewCard(question, answer)
            setQuestion('')
            setAnswer('')
        }

        return (
            <div className={classes.wrapper}>
                <h3>Add new card</h3>
                <TextField id="standard-basic"
                           value={question}
                           onChange={(e) => changeQuestionValue(e.currentTarget.value)}
                           label="Question" variant="standard"/>
                <TextField id="standard-basic"
                           value={answer}
                           onChange={(e) => changeAnswerValue(e.currentTarget.value)}
                           label="Answer" variant="standard"/>
                <div className={classes.btnGroup}>
                    <ButtonCP style={{width: "130px", backgroundColor: '#7f8383'}}
                              onClick={closeModalClick}>Cancel</ButtonCP>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition="center"
                        variant="contained"
                        style={{width: "130px", backgroundColor: '#33b198'}}
                        sx={{textTransform: 'none'}}
                        onClick={addClickHandler}
                    >
                        Add
                    </LoadingButton>
                </div>
            </div>
        );
    };
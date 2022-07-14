import React, {ChangeEvent, FC} from 'react';
import classes from "./EditModal.module.css";
import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ButtonCP } from '../../pages/PacksList/PackTable/PackTable';

type PropsType = {
    closeModalClick: () => void
    value: string
    onChangeValue: (e: ChangeEvent<HTMLTextAreaElement>) => void
    editCardQuestion: () => void
    isLoading: boolean
}


export const EditCardModal: FC<PropsType> =
    ({
         closeModalClick,
         value,
         onChangeValue,
         editCardQuestion,
         isLoading
     }) => {
        return (
            <div className={classes.wrapper}>
                <h3>Edit question</h3>
                <TextField id="standard-basic"
                           value={value}
                           onChange={onChangeValue}
                           label="Question" variant="standard"/>
                <div className={classes.btnGroup}>
                    <ButtonCP style={{width: "130px", backgroundColor: '#7f8383'}}
                              onClick={closeModalClick}>Cancel</ButtonCP>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition="center"
                        variant="contained"
                        style={{width: "130px", backgroundColor: '#33b198'}}
                        sx={{textTransform: 'none'}}
                        onClick={editCardQuestion}
                    >
                        Edit
                    </LoadingButton>
                </div>
            </div>
        );
    };
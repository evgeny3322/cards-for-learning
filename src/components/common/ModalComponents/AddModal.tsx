import React, {ChangeEvent, FC} from 'react';
import classes from "./AddModal.module.css";
import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ButtonCP } from '../../pages/PacksList/PackTable/PackTable';

type PropsType = {
    closeModalClick: () => void
    updateNewPackName: (e: ChangeEvent<HTMLTextAreaElement>) => void
    newPackNameValue: string
    addNewPack: () => void
    isLoading: boolean
}

export const AddModal: FC<PropsType> =
    ({
         closeModalClick,
         newPackNameValue,
         updateNewPackName,
         addNewPack,
         isLoading
     }) => {

        return (
            <div className={classes.wrapper}>
                <h3>Add new pack</h3>
                <TextField id="standard-basic"
                           value={newPackNameValue}
                           onChange={updateNewPackName}
                           label="Name pack" variant="standard"/>
                <div className={classes.btnGroup}>
                    <ButtonCP style={{width: "130px", backgroundColor: '#7f8383'}}
                              onClick={closeModalClick}>Cancel</ButtonCP>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition="center"
                        variant="contained"
                        style={{width: "130px", backgroundColor: '#33b198'}}
                        sx={{textTransform: 'none'}}
                        onClick={addNewPack}
                    >
                        Add
                    </LoadingButton>
                </div>
            </div>
        );
    };

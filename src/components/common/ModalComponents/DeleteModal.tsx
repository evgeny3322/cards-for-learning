import React, {FC} from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import classes from "./DeleteModal.module.css";
import {ButtonCP} from "../../pages/PacksList/PackTable/PackTable";

type PropsType = {
    currentName?: string | null
    closeModalClick: () => void
    removeClick: () => void
    isLoading: boolean
    title: string
}

export const DeleteModal: FC<PropsType> =
    ({
         closeModalClick,
         removeClick,
         currentName,
         isLoading,
         title
     }) => {

        return (
            <div className={classes.wrapper}>
                <h3>{title}</h3>

                <p className={classes.text}>
                    Do you really want to remove
                    <span className={classes.packName}>{" " + currentName + " "}</span>?
                </p>

                <div className={classes.btnGroup}>
                    <ButtonCP
                        variant={'contained'}
                        sx={[{
                            height: 'auto',
                            background: 'linear-gradient(to right, #344654, #344654)'
                        }]}
                        onClick={closeModalClick}
                    >
                        Cancel
                    </ButtonCP>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition="center"
                        style={{width: "130px"}}
                        sx={[{
                            color: '#ffff',
                            height: 'auto',
                            background: 'linear-gradient(to right, #f50000, #f50000)'
                        }]}
                        variant={'contained'}
                        onClick={removeClick}
                    >
                        Delete
                    </LoadingButton>

                </div>
            </div>
        );
    };

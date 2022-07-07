import React from 'react';
import {useNavigate} from 'react-router-dom';
import arrowBack from '../../../assets/images/backArrow.png';
import style from './BackArrow.module.css';

export const BackArrow = () => {
    const PREVIOUS_PAGE = -1
    const navigate = useNavigate();
    const goBack = (): void => navigate(PREVIOUS_PAGE);
    return (
        <div>
            <img
                src={arrowBack}
                alt=""
                onClick={goBack}
                role="presentation"
                className={style.backButton}
            />
            <span>Back</span>
        </div>
    );
};
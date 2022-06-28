import React from 'react';
import SuperInputText from "../common/SuperComponents/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../common/SuperComponents/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../common/SuperComponents/c2-SuperButton/SuperButton";

export const TestsComponents = () => {
    return (
        <div>
            <h1>TEST PAGE</h1>
            <SuperInputText/>
            <div>
                <SuperButton/>
                <SuperCheckbox/>
            </div>

        </div>
    );
};


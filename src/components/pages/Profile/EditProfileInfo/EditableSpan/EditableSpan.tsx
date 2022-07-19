import { TextField } from '@material-ui/core'
import React, { ChangeEvent, useState } from 'react'
import SuperInputText from '../../../../common/SuperComponents/c1-SuperInputText/SuperInputText'

type EditableSpanType = {
    classes?: string
    title: string
    disabled: boolean
    setTitle: (title: string) => void
    name: string

}

export const EditableSpan = React.memo((props: EditableSpanType) => {

    const [inputValue, setInputValue] = useState<string>(props.title)
    const [error, setError] = useState<string>('')

    const widthInput = {
        minWidth: '250px',
        marginLeft: '7px'
    }
    const nameStyle = {
        display: 'inline-block',
        verticalAlign: 'middle',
        marginTop: '6px',
    }

    const currentValueInput = () => {
        setError('')
        let currentValue = inputValue.trim()
        currentValue = inputValue.replace(/[^\d.]/g, '')
        if (currentValue === '') {
            setError('invalid name')
            return;
        }
        setInputValue(currentValue)
        props.setTitle(currentValue)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            currentValueInput();
        }
    }
    const onBlurHandler = () => {
        currentValueInput();
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return (
        <div>
            <div style ={nameStyle}>{props.name}</div>
            {/* <SuperInputText disabled={props.disabled}
                style={widthInput}
                onBlur={onBlurHandler}
                value={inputValue}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressHandler} />
 */}

            <TextField
                disabled={props.disabled}
                style={widthInput}
                variant={'standard'}
                onBlur={onBlurHandler}
                value={inputValue}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressHandler}
                helperText={error}
            />
        </div>

    )
}
)
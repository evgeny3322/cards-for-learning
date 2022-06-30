import { TextField } from '@material-ui/core'
import React, { ChangeEvent, useState } from 'react'

type EditableSpanType = {
    editMode: boolean
    setEditMode:(  editMode: boolean) => void
    classes?: string
    title: string
    updateTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {

    const [title, setTitle] = useState<string>(props.title)

    const offEditMode = () => {

        props.setEditMode(false)
        props.updateTitle(title)

    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        props.editMode
            ? <TextField variant={'standard'} autoFocus onBlur={offEditMode} value={title} onChange={onChangeSetTitle} />
            : <span  className={props.classes}>{props.title}</span>

    )
}
)
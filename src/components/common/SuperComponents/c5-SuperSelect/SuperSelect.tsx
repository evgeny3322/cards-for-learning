import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
    width?: string
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        width,
        onChange, onChangeOption,
        ...restProps
    }
) => {

    const mappedOptions: any[] | undefined = options?.map((item, index) => {
        return <option key={index}>{item}</option>

    });

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChangeOption && onChangeOption(e.currentTarget.value)

    }

    const selectStyle = {
        width: width + 'px',
        height: '30px',
        fontSize: '20px',
        fontWeight: '500',
    }

    return (
        <select style={selectStyle} onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
        </select>
    )
}

export default SuperSelect

import { FC } from 'react';

const TextInput: FC<{
    value?: string;
    className?: string;
    placeholder?: string;
    onChange: (text: any) => void;
}> = (props) => {
    return (
        <input
            value={props.value ? props.value : ''}
            placeholder={props.placeholder}
            className={`${props.className} text-slate-300 bg-transparent border-2 outline-none border-gray-500 rounded-lg w-[100%] p-3 focus:shadow-lg hover:shadow-lg transition-all ease-out duration-300`}
            onChange={(e) => props.onChange(e.target.value)}
        />
    );
};

export default TextInput;

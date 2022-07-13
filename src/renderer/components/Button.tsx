import { FC } from 'react';

const Button: FC<{ onClick: () => void; className?: string; text: string }> = (
    props
) => {
    return (
        <button
            onClick={props.onClick}
            className={`${props.className} outline-none bg-gradient-to-r rounded-lg p-4 font-bold text-slate-50 transition-all ease-out duration-300`}
        >
            {props.text}
        </button>
    );
};

export default Button;

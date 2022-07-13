import React, { FC } from 'react';

const BigRoundedButton: FC<{
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}> = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={`${props.className} transition-all ease-out duration-300 shadow-xl hover:-translate-y-2 flex align-bottom text-2xl text-right font-bold justify-end items-end bg-gradient-to-br p-5 rounded-xl h-[200px] w-full`}
        >
            {props.children}
        </button>
    );
};

export default BigRoundedButton;

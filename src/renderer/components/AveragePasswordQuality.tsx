import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreStateType } from 'store/store';
import BigRoundedButton from './BigRoundedButton';

const getPasswordStrength = (password: string) => {
    const weak = /[a-zA-Z]{5,}/;
    const moderate = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z\d]{5,}/;
    const strong = /(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-_Z!@#$%^&*]{8,}$/;
    const veryStrong =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-_Z!@#$%^&*]{8,}$/;
    const superStrong =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!_@#$%^&*.])[0-9a-zA-_Z!@#$%^&.*]{8,}$/;

    if (superStrong.test(password)) return 6;
    if (veryStrong.test(password)) return 5;
    if (strong.test(password)) return 4;
    if (moderate.test(password)) return 3;
    if (weak.test(password)) return 2;
    return 1;
};

const getPercentage = (sum: number, total: number) => {
    return ((sum / (total * 6)) * 100).toFixed(2);
};

const AveragePasswordQuality: FC = () => {
    const appCtx = useSelector((state: StoreStateType) => state.password);
    const [percentage, setPercentage] = useState('');

    useEffect(() => {
        let sum = 0;
        appCtx.passwords.forEach((i) => {
            sum += getPasswordStrength(i.password);
        });
        if (appCtx.passwords.length === 0) {
            setPercentage('0');
        } else {
            setPercentage(getPercentage(sum, appCtx.passwords.length));
        }
    }, [appCtx.passwords]);

    return (
        <BigRoundedButton className="from-[#00cdac] to-[#02aab0] shadow-[#02aab052] text-slate-50 flex flex-col">
            <h2 className="mb-5 text-4xl">{percentage}%</h2>
            Your average password quality
        </BigRoundedButton>
    );
};

export default AveragePasswordQuality;

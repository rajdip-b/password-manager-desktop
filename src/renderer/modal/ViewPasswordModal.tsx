import { AccountCircleRounded, KeyRounded } from '@mui/icons-material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import Button from 'renderer/components/Button';
import { StoreStateType } from 'store/store';

const getFavIconURL = (domainName: string) => {
    return `https://${domainName}/favicon.ico`;
};

const getDecoratedDomainName = (domainName: string) => {
    const name: string[] = domainName.split('.');
    return name[0].charAt(0).toUpperCase().concat(name[0].substring(1));
};

const ViewPasswordModal: FC<{ onClose: () => void }> = (props) => {
    const appCtx = useSelector((state: StoreStateType) => state.password);
    const password = appCtx.passwords.find(
        (p) => p.id === appCtx.focusedPasswordId
    )!;
    if (!password) {
        props.onClose();
        return <></>;
    }
    return (
        <div className="w-[500px] bg-gray-700 rounded-xl mx-auto mt-20 p-10 flex flex-col gap-5">
            <div className="flex flex-row gap-5">
                <div>
                    <img
                        className="w-[40px]"
                        alt="icon"
                        src={getFavIconURL(password.domain)}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl text-slate-300">
                        {getDecoratedDomainName(password.domain)}
                    </h2>
                    <div className="flex flex-row gap-3 text-gray-400">
                        <AccountCircleRounded />
                        <h4>{password.login}</h4>
                    </div>
                    <div className="flex flex-row gap-3 text-gray-400">
                        <KeyRounded />
                        <h4>{password.password}</h4>
                    </div>
                </div>
            </div>
            <Button
                onClick={props.onClose}
                className="from-red-600 to-rose-500 hover:shadow-xl hover:shadow-[#fb404056]"
                text="Close"
            />
        </div>
    );
};

export default ViewPasswordModal;

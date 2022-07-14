import { Circle, DeleteRounded, EditRounded } from '@mui/icons-material';
import Password from '../../model/password';
import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { appActions } from 'store/store';

const getFavIconURL = (domainName: string) => {
    return `https://${domainName}/favicon.ico`;
};

const getDecoratedDomainName = (domainName: string) => {
    const name: string[] = domainName.split('.');
    return name[0].charAt(0).toUpperCase().concat(name[0].substring(1));
};

const getPasswordStrength = (password: string) => {
    const weak = /[0-9a-zA-_Z!@#$%^&.*]{5,}/;
    const moderate = /[0-9a-zA-_Z!@#$%^&.*]{8,}/;
    const strong = /(?=.*\D)[0-9a-zA-_Z!@#$%^&.*]{8,}$/;
    const veryStrong =
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-_Z!@#$%^&.*]{8,}$/;
    const superStrong =
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!_@#$%^&*.])[0-9a-zA-_Z!@#$%^&.*]{8,}$/;

    if (superStrong.test(password)) return 'border-b-violet-500 w-[100%]';
    if (veryStrong.test(password)) return 'border-b-fuchsia-500 w-[80%]';
    if (strong.test(password)) return 'border-b-green-500 w-[60%]';
    if (moderate.test(password)) return 'border-b-sky-500 w-[40%]';
    if (weak.test(password)) return 'border-b-amber-500 w-[20%]';
    return 'border-b-rose-500 w-[10%]';
};

const PasswordCard: FC<{ className?: string; password: Password }> = (
    props
) => {
    const dispatch = useDispatch();

    const handleClick = useCallback(() => {
        dispatch(appActions.setFocussedPasswordId(props.password.id));
        dispatch(appActions.openViewPasswordModal());
    }, [dispatch]);

    const handleEditClicked = useCallback(() => {
        dispatch(appActions.setFocussedPasswordId(props.password.id));
        dispatch(appActions.openEditPasswordModal());
    }, [dispatch]);

    const handleDelete = useCallback(() => {
        dispatch(appActions.deletePassword(props.password.id));
    }, [dispatch]);

    return (
        <div className="flex items-center justify-between p-4 gap-4 bg-gray-600 rounded-lg transition-all ease-out duration-300 hover:shadow-lg hover:shadow-gray-800/50 hover:-translate-y-2">
            <button
                className="flex flex-row items-center gap-5 grow"
                onClick={handleClick}
            >
                <div className="rounded-lg p-3 h-fit">
                    <img
                        className="w-[40px]"
                        alt="icon"
                        src={getFavIconURL(props.password.domain)}
                    />
                </div>
                <div>
                    <h2 className="text-lg text-left text-slate-200">
                        {getDecoratedDomainName(props.password.domain)}
                    </h2>
                    <div className="text-slate-400 text-sm flex flex-row gap-2">
                        <h4>{props.password.login}</h4>
                        <Circle fontSize="small" className="p-1" />
                        <h3>{props.password.updatedOn}</h3>
                    </div>
                </div>
                <div className="text-slate-300 text-sm flex flex-col w-[30%] gap-2 grow lg:mx-5">
                    <h1>Strength</h1>
                    <div className="flex">
                        <div
                            className={`${getPasswordStrength(
                                props.password.password
                            )} border-b-4 rounded-l-xl`}
                        ></div>
                        <div className="border-b-4 rounded-r-xl border-gray-500 grow"></div>
                    </div>
                </div>
            </button>
            <div className="flex flex-col gap-2 text-slate-400">
                <button onClick={handleEditClicked}>
                    <EditRounded />
                </button>
                <button onClick={handleDelete}>
                    <DeleteRounded />
                </button>
            </div>
        </div>
    );
};

export default PasswordCard;

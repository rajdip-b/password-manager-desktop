import Password from 'model/password';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from 'renderer/components/Button';
import TextInput from 'renderer/components/TextInput';
import { appActions, StoreStateType } from 'store/store';

const EditPasswordModal: FC<{ onClose: () => void }> = (props) => {
    const [domain, setDomain] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const appCtx = useSelector((state: StoreStateType) => state.password);

    useEffect(() => {
        if (appCtx.focusedPasswordId) {
            const p = appCtx.passwords.find(
                (i) => i.id === appCtx.focusedPasswordId
            )!;
            setDomain(p.domain);
            setEmail(p.login);
            setPassword(p.password);
        }
    }, [appCtx]);

    const handleSaveClicked = useCallback(() => {
        let flag: number = 1;
        if (domain.length === 0) {
            toast.error("Domain name can't be empty!");
            flag = 0;
        }
        if (email.length === 0) {
            toast.error("Email name can't be empty!");
            flag = 0;
        }
        if (password.length === 0) {
            toast.error("Password name can't be empty!");
            flag = 0;
        }

        if (flag) {
            const p = new Password(
                appCtx.focusedPasswordId!,
                domain,
                email,
                password,
                new Date()
            );
            dispatch(appActions.updatePassword(p));
            toast.success('Successfully updated your password!');
            props.onClose();
        }
    }, [domain, email, password, dispatch]);

    return (
        <div className="w-[500px] bg-gray-700 rounded-xl mx-auto mt-20 p-10 flex flex-col gap-4">
            <TextInput
                value={domain}
                placeholder="Domain (google.com, github.com)"
                className="focus:border-violet-500 hover:shadow-gray-800/40 focus:shadow-violet-500/40"
                onChange={(e) => setDomain(e)}
            />
            <TextInput
                value={email}
                placeholder="Email (johnDoe@gmail.com)"
                className="focus:border-violet-500 hover:shadow-gray-800/40 focus:shadow-violet-500/40"
                onChange={(e) => setEmail(e)}
            />
            <TextInput
                value={password}
                placeholder="Password"
                className="focus:border-violet-500 hover:shadow-gray-800/40 focus:shadow-violet-500/40"
                onChange={(e) => setPassword(e)}
            />
            <Button
                onClick={handleSaveClicked}
                className="from-green-600 to-emerald-500 hover:shadow-xl hover:shadow-emerald-600/40"
                text="Save"
            />
            <Button
                onClick={props.onClose}
                className="from-red-600 to-rose-500 hover:shadow-xl hover:shadow-[#fb404056]"
                text="Cancel"
            />
        </div>
    );
};

export default EditPasswordModal;

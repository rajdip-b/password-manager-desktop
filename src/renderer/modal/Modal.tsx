import { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appActions, StoreStateType } from 'store/store';
import AddPasswordModal from './AddPasswordModal';
import EditPasswordModal from './EditPasswordModal';
import GeneratePasswordModal from './GeneratePasswordModal';
import ViewPasswordModal from './ViewPasswordModal';

const Modal: FC = () => {
    const dispatch = useDispatch();
    const appCtx = useSelector((state: StoreStateType) => state.password);
    const [classes, setClasses] = useState('animate-modalHoverIn');

    const clearFocussedPasswordId = () => {
        dispatch(appActions.setFocussedPasswordId(null));
    };

    const closeAddPasswordModal = useCallback(() => {
        setTimeout(() => {
            dispatch(appActions.closeAddPasswordModal());
            setClasses('animate-modalHoverIn');
        }, 300);
        setClasses('animate-modalHoverOut');
    }, [dispatch]);

    const closeEditPasswordModal = useCallback(() => {
        setTimeout(() => {
            dispatch(appActions.closeEditPasswordModal());
            clearFocussedPasswordId();
            setClasses('animate-modalHoverIn');
        }, 300);
        setClasses('animate-modalHoverOut');
    }, [dispatch, clearFocussedPasswordId]);

    const closeViewPasswordModal = useCallback(() => {
        setTimeout(() => {
            dispatch(appActions.closeViewPasswordModal());
            clearFocussedPasswordId();
            setClasses('animate-modalHoverIn');
        }, 300);
        setClasses('animate-modalHoverOut');
    }, [dispatch, clearFocussedPasswordId]);

    const closeGeneratePasswordModal = useCallback(() => {
        setTimeout(() => {
            dispatch(appActions.closeGeneratePasswordModal());
            setClasses('animate-modalHoverIn');
        }, 300);
        setClasses('animate-modalHoverOut');
    }, [dispatch]);

    return (
        <>
            {(appCtx.isAddPasswordVisible ||
                appCtx.isViewPasswordVisible ||
                appCtx.isEditPasswordVisible ||
                appCtx.isGeneratePasswordVisible) && (
                <div
                    className={`absolute bg-gray-800/60 h-screen w-screen transition-all ease-out duration-300 ${classes}`}
                >
                    {appCtx.isAddPasswordVisible && (
                        <AddPasswordModal onClose={closeAddPasswordModal} />
                    )}
                    {appCtx.isEditPasswordVisible && (
                        <EditPasswordModal onClose={closeEditPasswordModal} />
                    )}
                    {appCtx.isViewPasswordVisible && (
                        <ViewPasswordModal onClose={closeViewPasswordModal} />
                    )}
                    {appCtx.isGeneratePasswordVisible && (
                        <GeneratePasswordModal
                            onClose={closeGeneratePasswordModal}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Modal;

import { SearchRounded } from '@mui/icons-material';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appActions, StoreStateType } from 'store/store';
import AveragePasswordQuality from './AveragePasswordQuality';
import BigRoundedButton from './BigRoundedButton';
import PasswordCard from './PasswordCard';

const Dashboard: FC = () => {
    const dispatch = useDispatch();
    const appCtx = useSelector((state: StoreStateType) => state.password);
    const [searchText, setSearchText] = useState('');

    return (
        <div className="p-10 h-screen bg-gray-700 overflow-y-auto">
            <div className="flex flex-col gap-5">
                <div className="grid justify-center gap-5 md:gap-0 md:flex md:justify-between items-center">
                    <h1 className="text-3xl font-medium text-slate-200">
                        Password Manager
                    </h1>
                    <div className="flex flex-row items-center border-2 text-slate-300 border-gray-500 hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/40 transition-all ease-out duration-300 rounded-lg p-3 ">
                        <input
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search by service"
                            className="grow font-light text-sm w-[300px] bg-transparent outline-none h-full"
                        />
                        <button>
                            <SearchRounded />
                        </button>
                    </div>
                </div>
                <div className="grid justify-center md:flex md:justify-between w-[100%] gap-10 py-5 pb-10">
                    <BigRoundedButton
                        onClick={() =>
                            dispatch(appActions.openAddPasswordModal())
                        }
                        className="from-[#e100ff] to-[#7f00ff] shadow-[#8000ff67] text-slate-50"
                    >
                        Add a new password
                    </BigRoundedButton>
                    <BigRoundedButton
                        onClick={() =>
                            dispatch(appActions.openGeneratePasswordModal())
                        }
                        className="from-[#f9ed32] to-[#fbb040] shadow-[#fbb04056] text-slate-50"
                    >
                        Generate a password
                    </BigRoundedButton>
                    <AveragePasswordQuality />
                </div>
                <h1 className="text-2xl font-medium text-slate-200">
                    Your passwords
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
                    {appCtx.passwords.length === 0 && (
                        <div className="text-lg font-light text-gray-400">
                            You dont have any passwords set.
                        </div>
                    )}
                    {appCtx.passwords.length !== 0 &&
                        appCtx.passwords
                            .filter((i) => i.domain.includes(searchText))
                            .map((password) => (
                                <PasswordCard
                                    key={password.id}
                                    password={password}
                                />
                            ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

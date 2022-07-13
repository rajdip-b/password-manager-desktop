import { FC, useState } from 'react';
import Button from 'renderer/components/Button';
import CheckBox from 'renderer/components/CheckBox';
import TextInput from 'renderer/components/TextInput';

const generatePassword = (length: number, charset: string) => {
    var result = '';
    var charactersLength = charset.length;
    for (var i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const GeneratePasswordModal: FC<{ onClose: () => void }> = (props) => {
    const [length, setLength] = useState('');
    const [charset, setCharset] = useState('');
    const [password, setPassword] = useState('');

    const updateSelectedOptions = (selected: boolean, id: number) => {
        if (id === 0 && selected)
            setCharset((prev) => prev.concat('abcdefghijklmnopqrstuvwxyz'));
        if (id === 1 && selected)
            setCharset((prev) => prev.concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'));
        if (id === 2 && selected)
            setCharset((prev) => prev.concat('1234567890'));
        if (id === 3 && selected)
            setCharset((prev) => prev.concat('!@#$%^&*.'));
        if (id === 0 && !selected)
            setCharset((prev) =>
                prev.replace('abcdefghijklmnopqrstuvwxyz', '')
            );
        if (id === 1 && !selected)
            setCharset((prev) =>
                prev.replace('ABCDEFGHIJKLMNOPQRSTUVWXYZ', '')
            );
        if (id === 2 && !selected)
            setCharset((prev) => prev.replace('1234567890', ''));
        if (id === 3 && !selected)
            setCharset((prev) => prev.replace('!@#$%^&*.', ''));
    };

    const onGenerateClicked = () => {
        setPassword(generatePassword(+length, charset));
    };

    return (
        <div className="w-[500px] bg-gray-700 rounded-xl mx-auto mt-20 p-10 flex flex-col gap-5">
            <CheckBox
                text="Add lower alphabets"
                onClick={(e, v) => updateSelectedOptions(e, v)}
                id={0}
            />
            <CheckBox
                text="Add upper alphabets"
                onClick={(e, v) => updateSelectedOptions(e, v)}
                id={1}
            />
            <CheckBox
                text="Add numbers"
                onClick={(e, v) => updateSelectedOptions(e, v)}
                id={2}
            />
            <CheckBox
                text="Add special chars(!@#$%^&*.)"
                onClick={(e, v) => updateSelectedOptions(e, v)}
                id={3}
            />
            <TextInput
                value={length}
                placeholder="Set length"
                className="border-gray-500 focus:border-violet-500 hover:shadow-lg focus:shadow-violet-500/40"
                onChange={(e) => setLength(e)}
            />
            <div className="bg-gray-800 p-3 rounded-lg text-gray-300">
                {password.length === 0 && 'Click on generate'}
                {password.length !== 0 && password}
            </div>
            <Button
                onClick={onGenerateClicked}
                className="from-[#e100ff] to-[#7f00ff] hover:shadow-xl hover:shadow-[#8000ff67]"
                text="Generate"
            />
            <Button
                onClick={props.onClose}
                className="from-red-600 to-rose-500 hover:shadow-xl hover:shadow-[#fb404056]"
                text="Close"
            />
        </div>
    );
};

export default GeneratePasswordModal;

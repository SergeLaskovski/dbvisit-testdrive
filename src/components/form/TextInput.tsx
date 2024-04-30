import React, { useState, useRef } from 'react';

import './TextInput.scss'

interface Props {
    inputType?: string;
    inputLabel: string;
    isRequired: boolean;
    setVal: Function;
    err: string;
    handleStartClick: Function;
    defaultValue?: string;
}


const TextInput = ({ inputType = "text", inputLabel, isRequired, setVal, err, handleStartClick, defaultValue = "" }: Props) => {


    const [focusClass, setFocusClass] = useState<string>(defaultValue ? ' focus' : '');

    const ref = useRef<null | HTMLInputElement>(null);

    const makeFocused = () => {
        ref.current?.focus();
        setFocusClass(' focus');
    }

    const launchChange = (val: string) => {
        makeFocused();
        val = val.trim().substring(0, 255);
        setVal(val);
    }


    return (
        <>
            <div className={`text-input${focusClass}${err ? ' error' : ''}`} onClick={() => makeFocused()}>
                <div className="label">
                    {inputLabel}
                    {isRequired && (<span className="red"> *</span>)}
                </div>
                <div className="input">
                    <input
                        type={inputType}
                        onFocus={() => makeFocused()}
                        onBlur={(e) => { !e.target.value ? setFocusClass('') : '' }}
                        onChange={(e) => launchChange(e.target.value.substring(0, 320))}
                        onKeyDown={(e) => { e.code === 'Enter' && handleStartClick() }}
                        ref={ref}
                        placeholder=""
                        value={defaultValue}
                    />
                </div>
                <div className={`err${err && ' visible'}`}>{err}</div>
            </div>

        </>
    );

}

export default TextInput;
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './StartButton.scss'

interface ButtonProps {
    callBack: Function;
    text?: String;
    spin?: Boolean;
    disabled?: Boolean
}

const StartButton = ({ callBack, spin = false, text = "Start", disabled = false }: ButtonProps) => {

    return (
        <button className={`start-btn${disabled ? ' disabled' : ''}`} onClick={() => callBack()}>
            <div className="txt">{text}</div>
            <div className="ico">
                {
                    spin ?
                        <FontAwesomeIcon icon={["fad", "spinner"]} size="xl" pulse />
                        :
                        <FontAwesomeIcon icon={["fad", "angle-right"]} size="xl" />

                }
            </div>
        </button>
    );
}

export default StartButton;
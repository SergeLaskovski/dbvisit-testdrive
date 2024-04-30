import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './CopyClip.scss'

interface ButtonProps {
    text: string
}

const CopyClip = ({ text = '' }: ButtonProps) => {

    const [tipText, setTipText] = useState<string>('');

    const copyToClip = () => {
        navigator.clipboard.writeText(text);
        setTipText('Copied');
    }

    useEffect(() => {
        if (tipText === "Copied") {
            setTimeout(() => {
                setTipText('')
            }, 2000);
        }

    }, [tipText]);


    return (
        <span className="copy-clip">
            <div
                className="tip-ico"
                onClick={copyToClip}
                onMouseEnter={() => setTipText('Copy to clipboard')}
                onMouseLeave={() => setTipText('')}
            >
                <FontAwesomeIcon icon={["fad", "copy"]} size="sm" />
            </div>
            {
                tipText &&
                <div className="tooltip">{tipText}</div>
            }
        </span>
    );
}

export default CopyClip;
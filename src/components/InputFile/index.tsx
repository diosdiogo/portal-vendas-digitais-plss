import React, { InputHTMLAttributes } from 'react';

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

const File: React.FC<InputProps> = ({name, ...rest}) => {
    return (
        <div className="input-block">
            <input type="file" id={name} {...rest} multiple />
        </div>
    );
}

export default File;
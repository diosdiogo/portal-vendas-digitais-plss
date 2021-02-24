import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

interface BottomProps {
    path: string;
    cssclass: string;
    title: string;
    enabled?: boolean;
}

const SmallBottom: React.FC<BottomProps> = ({ path, cssclass, title, enabled = true, ...rest }) => {

    function handleClick(e: FormEvent) {
        if (!enabled)
            e.preventDefault();
    }

    return(
        <Link to={path} className={cssclass} onClick={handleClick}>
            {title}
        </Link>
    );
}

export default SmallBottom;
import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

interface BottomProps {
    path: string;
    linkClass: string;
    buttonClass?: string;
    title: string;
    id?: string
}

const Bottom: React.FC<BottomProps> = ({path, linkClass, title, buttonClass = "buttons-block", id}) => {

    return(
        <div className={buttonClass}>
            <Link id={id} to={path} className={linkClass}>
                {title}
            </Link>
        </div>
    );
}

export default Bottom;
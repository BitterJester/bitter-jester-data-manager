import React from 'react';
import '../static/css/title.css';

type Props = {
    className?: string;
    titleDisplayText: string;
}

export const Title = (props: Props) => {
    const titleDisplayText = props.titleDisplayText;

    return (
        <div className={props.className || 'titleContent'}>
            <h1>{titleDisplayText}</h1>
        </div>
    )
}
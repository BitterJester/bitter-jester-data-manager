import React from 'react';
import '../static/title.css';

type Props = {
    titleDisplayText: string;
}

export const Title = (props: Props) => {
    const titleDisplayText = props.titleDisplayText;

    return (
        <div className={'titleContent'}>
            <h1>{titleDisplayText}</h1>
            Patrick is poo
        </div>
    )
}
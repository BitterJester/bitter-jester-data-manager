import React from 'react';

type Props = {
    titleDisplayText: string;
}

export const Title = (props: Props) => {
    const titleDisplayText = props.titleDisplayText;

    return (
        <div>
            <h1>{titleDisplayText}</h1>
        </div>
    )
}
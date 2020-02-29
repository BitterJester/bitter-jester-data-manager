import React from 'react';

type Props = {
    displayText: string;
}

export const TableColumn = (props: Props) => {
    const {displayText} = props;

    return (
        <td>
            {displayText}
        </td>
    );
}
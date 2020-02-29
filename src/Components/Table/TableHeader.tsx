import React from 'react';

type Props = {
    tableColumnNamesOrderedFromLeftToRight: string[];
}

export const TableHeader = (props: Props) => {
    const { tableColumnNamesOrderedFromLeftToRight } = props;

    return (
        <th>
            {
                tableColumnNamesOrderedFromLeftToRight.map(columnName => {
                    return (
                        <td>{columnName}</td>
                    );
                })
            }
        </th>
    );
}
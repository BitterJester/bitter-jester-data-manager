import React from 'react';
import { TableColumn } from './TableColumn';

type Props = {
    flattenedDataToDisplay: object;
    key: string;
}

export const TableRow = (props: Props) => {
    const { flattenedDataToDisplay } = props;

    return (
        <tr>
            {
                Object.values(flattenedDataToDisplay).map(value => {
                    const stringifiedValue = JSON.stringify(value);
                    return (
                        <TableColumn displayText={stringifiedValue} key={stringifiedValue}/>
                    );
                })
            }
        </tr>
    );
}
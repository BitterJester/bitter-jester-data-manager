import React from 'react';

type Props = {
    count: number;
}

const TotalCount = (props: Props) => {
    return (
        <div style={{ textAlign: 'right', width: '100%', paddingRight: '32px' }}>
            <span style={{ paddingRight: '8px', fontStyle: 'italic', fontSize: '24px' }}>
                Total Bands
            </span>
            <span className={'totalCountValue'} style={{ fontSize: '24px' }}>
                {props.count}
            </span>
        </div>
    );
};

export default TotalCount;
import React from 'react';

type Props = {
    count: number;
}

const TotalCount = (props: Props) => {
    return (
        <div style={{ textAlign: 'right', width: '100%', paddingRight: '32px', display: 'inline' }}>
            <div style={{ fontStyle: 'italic', fontSize: '16px', color: 'rgb(204, 204, 204);' }}>
                Total Bands
            </div>
            <div className={'totalCountValue'} style={{ fontSize: '24px' }}>
                {props.count}
            </div>
        </div>
    );
};

export default TotalCount;
import React from 'react';
import { Card } from 'reactstrap';

const CardContainer = (props) => {
    const { className } = props;
    return (
        <Card className={className}>
            <div style={{ padding: '16px' }}>
                {props.children}
            </div>
        </Card>
    )
};

export default CardContainer;
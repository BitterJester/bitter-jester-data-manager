import React from 'react';
import { Card } from 'reactstrap';

const CardContainer = (props) => {
    return (
        <Card>
            <div style={{padding: '16px'}}>
                {props.children}
            </div>
        </Card>
    )
};

export default CardContainer;
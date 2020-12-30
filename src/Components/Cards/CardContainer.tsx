import React from 'react';
import {Card} from 'reactstrap';

const CardContainer = (props) => {
    const {className, style} = props;
    return (
        <div className={'card-container'}>
            <Card style={style} className={className}>
                <div style={{padding: '16px'}}>
                    {props.children}
                </div>
            </Card>
        </div>
    )
};

export default CardContainer;
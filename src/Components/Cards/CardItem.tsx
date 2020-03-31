import React from 'react';

import '../../static/card.css';
import { Col } from 'reactstrap';

type Props = {
    label: string;
    value: string;
}

const CardItem = (props: Props) => {
    const {label, value} = props;

    return (
        <Col className={'cardItemContainer'}>
            <div className={'cardItemLabel'}>{label}</div>
            <div className={'cardItemValue'} >{value}</div>
        </Col>
    );
};

export default CardItem;
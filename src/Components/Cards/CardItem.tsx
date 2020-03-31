import React from 'react';
import { Col } from 'reactstrap';
import '../../static/card.css';

type Props = {
    label: string;
    value: string;
}

const CardItem = (props: Props) => {
    const {label, value} = props;

    return (
        <Col>
            <div className={'cardItemLabel'}>{label}</div>
            <div className={'cardItemValue'} >{value}</div>
        </Col>
    );
};

export default CardItem;
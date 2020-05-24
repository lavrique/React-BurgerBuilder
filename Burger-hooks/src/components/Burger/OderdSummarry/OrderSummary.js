import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>)
        });

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)} $</strong></p>
            <p>Continue to Checkout?</p>
            <Button
                clicked={props.purchaseContinue}
                btnType={'Success'}
            >CONTINUE</Button>
            <Button
                clicked={props.purchaseCancelled}
                btnType={'Danger'}
            >CANCEL</Button>
        </Fragment>
    )
};

export default orderSummary;
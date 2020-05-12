import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OderdSummarry/OrderSummary'


const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 0.9,
    bacon: 1.4,
    meat: 2.1
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super (props);
    //     this.state = {...}
    // } the below method is a bit more modern because it's shorter syntax
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        price: 4,
        purchasable: false,
        purchasing: false
    }

    //TODO ask why not const? also try yourself
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.price;
        const updatedPrice = oldPrice + INGREDIENT_PRICES[type];

        this.setState({ ingredients: updatedIngredients, price: updatedPrice });
        this.updatePurchesState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.price;
        const updatedPrice = oldPrice - INGREDIENT_PRICES[type];

        this.setState({ ingredients: updatedIngredients, price: updatedPrice });
        this.updatePurchesState(updatedIngredients);//!!!!! We pass in the updated ingredients because when we get the ingredients from state in the updatePurchasState() method, they might not be updated!!!
    }

    updatePurchesState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0)

        this.setState({ purchasable: sum > 0 });
    }

    // This Will not work correctly, at leas if we want to use the "this." keyword if the method is triggered trough an event
    // do to the way the "this" keyword works in Javascript, it will then not refer to the class
    // that's why we need the arrow functions, which in the end are still methods, but internally, they take advantage of arrow functions which basically
    //  contain the state of the context of "this" 
    // purchaseHandler(){
    //     this.setState)_
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        alert('You have continued!');
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        purchaseContinue={this.purchaseContinueHandler}
                        purchaseCancelled={this.purchaseCancelHandler}
                        price={this.state.price}
                        ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    order={this.purchaseHandler}
                    price={this.state.price} />
            </Fragment>
        );
    }
}

export default BurgerBuilder;
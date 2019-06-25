import React, {Component, Fragment} from 'react';
import Burger from './../Burger/Burger';
import BuildControls from './../Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 2,
      meat: 1
    },
    totalPrice: 4
  };
  
  addIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
  };
  
  removeIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){ return };
    const updatedCount = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
  };
  
  
  render(){
    const disabledInfo = {...this.state.ingredients};
    
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    
    return(
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredient}
          ingredientsDeducted={this.removeIngredient}
          disabled={disabledInfo} price={this.state.totalPrice}/>
      </Fragment>
    )
  }
}

export default BurgerBuilder;

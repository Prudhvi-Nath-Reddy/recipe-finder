import React, { Component } from 'react';
import './RecipeCard.css';

class RecipeCard extends Component {
  render() {
    const { recipe } = this.props;
    return (
      <div className="recipe-card">
        <img src={recipe.image[0]} alt={recipe.name} className="recipe-image" />
        <div className="recipe-name">
          <strong>{recipe.name}</strong>
        </div>
        <div className="recipe-time">Time needed: {recipe.makingtime}</div>
      </div>
    );
  }
}
 
export default RecipeCard;


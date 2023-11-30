// RecipeCard.js
import React, { Component } from 'react';

class RecipeCard extends Component {
  render() {
    const { recipe } = this.props;
    return (
      <div style={{ width: '200px', height: '200px',maxHeight:'250px',overflowY: 'hidden', margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
        <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '60%', objectFit: 'cover' }} />
        <div style={{ marginTop: '10px' }}>
          <strong>{recipe.name}</strong>
        </div>
        <div>Time needed: {recipe.makingtime}</div>
      </div>
    );
  }
}

export default RecipeCard;

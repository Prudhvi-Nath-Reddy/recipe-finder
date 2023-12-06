import React from 'react';
import { useParams } from 'react-router-dom';
import './RecipeInfo.css';
import { useSelector } from 'react-redux';

const RecipeInfo = ({ }) => {
  const recipes = useSelector((state) => state.recipes)
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id.toString() === id);
  const len = recipe.image.length ;
  
  if (!recipe) {
    return <div>Recipe not found</div>;
  }
 
  return (
    <div className="recipe-info">
      <div className="recipe-halfs">
        <div className="left-half">
          <img src={recipe.image[0]} alt={recipe.name} className="main-image" />
          <div className="small-images">
            <img src={recipe.image[1%len]} alt={recipe.name} className="small-image" />
            <img src={recipe.image[2%len]} alt={recipe.name} className="small-image" />
            <img src={recipe.image[3%len]} alt={recipe.name} className="small-image" />
          </div>
        </div>

        <div className="right-half">
          <div className="recipe-header">
            <h1>{recipe.name}</h1>
            <p className="author">by {recipe.author}</p>
          </div>
          <h2>Ingredients</h2>
          <div className="ingredients">
            <div className="ingredient-columns">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient">{ingredient}</div>
              ))}
            </div>
          </div>

          <div className="recipe-details">
            <h2>Instructions</h2>
            <div className="instructions">
              <pre>{recipe.instructions}</pre>
            </div>            
          </div>
        </div>
      </div>

      <div className="cooking-process">
        <h2>Cooking Process</h2>
        <pre>{recipe.cookingProcess}</pre>
      </div>
    </div>
  );
};

export default RecipeInfo;


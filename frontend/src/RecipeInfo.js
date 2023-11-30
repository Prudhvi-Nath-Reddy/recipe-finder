// RecipeDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const RecipeInfo = ({ recipes }) => {
  const { id } = useParams();

  // Find the recipe with the matching id
  const recipe = recipes.find((recipe) => recipe.id.toString() === id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Left and Right Half */}
      <div style={{ display: 'flex' }}>
        {/* Left Half */}
        <div style={{ width: '50%', padding: '10px 10px' }}>
          <img src={recipe.image} alt={recipe.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
          <div style={{ display: 'flex', padding: '0 0px' }}>
            <img src={recipe.image} alt={recipe.name} style={{ width: '33.33%', maxHeight: '200px', objectFit: 'cover', marginRight: '5px' }} />
            <img src={recipe.image} alt={recipe.name} style={{ width: '33.33%', maxHeight: '200px', objectFit: 'cover', marginRight: '5px' }} />
            <img src={recipe.image} alt={recipe.name} style={{ width: '33.33%', maxHeight: '200px', objectFit: 'cover' }} />
          </div>
        </div>
  
        {/* Right Half */}
        <div style={{ width: '50%', padding: '0 20px' }}>
          <div style={{display:'flex',flexDirection:'row',alignItems:'baseline'}}>
          <h1>{recipe.name}</h1>
          <p style={{paddingLeft:'3px'}}>by {recipe.author}</p>
          </div>
          {/* Ingredients in Multiple Columns */}
          <h2>Ingredients</h2>
          <div style={{ display: 'flex', flexDirection: 'column', columnGap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
            
            <div style={{ columnCount:5 }}>
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} style={{ paddingBottom: '5px' }}>{ingredient}</div>
              ))}
            </div>
          </div>
  
          {/* Additional details about the recipe */}
          <div style={{ width: '90%' }}>
            <h2>Instructions</h2>
            <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{recipe.instructions}</pre>
            </div>            
          </div>
        </div>
      </div>
  
      {/* Cooking Process below both left and right columns */}
      <div style={{ width: '90%', padding: '0 20px' }}>
        <h2>Cooking Process</h2>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{recipe.cookingProcess}</pre>
      </div>
    </div>   

  );
  
  
  
  
};

export default RecipeInfo;

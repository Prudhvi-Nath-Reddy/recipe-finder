import HomePage from './HomePage';
import LandingPage from './LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeInfo from './RecipeInfo';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const dispatch = useDispatch();
    const loginUsername = useSelector((state) => state.loginUsername);
    const recipes = useSelector((state) => state.recipes);
    const [fileContent1, setFileContent1] = useState('');
    const [fileContent2, setFileContent2] = useState('');

    const handleLoginusername = (username) => {
      dispatch({ type: 'SET_LOGIN_USERNAME', payload: username });
      sessionStorage.setItem('loginusername', username);
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/getrecipe', {});
        const recipe_list = response.data;
        const newRecipes = recipe_list.map((element) => ({
          id: element._id,
          name: element.recipename,
          image: element.recipeimage,
          ingredients: element.ingredients,
          cookingProcess: element.process,
          instructions: element.instructions,
          makingtime: element.timeneeded,
          author: element.author,
        }));

        
        console.log(newRecipes);


        dispatch({ type: 'SET_RECIPES', payload: newRecipes });
      } catch (error) {
        console.log(error);
      }

    };

    fetchData();
  }, [dispatch]);
  
  // console.log(recipes)
  // for (let i = 1; i <= 10; i++) 
  // {
  //   recipes.push({
  //     id: i,
  //     name: `Chicken Biryani ${i}`,
  //     image: 'https://imgs.search.brave.com/fq5XQP7deYTygo4Hc4ABXWgiAdgR-YMk9RFVFTh56s8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9mcmllcy1mb29k/LWZyZWUtcGhvdG8u/anBnP3c9NjAwJnF1/YWxpdHk9ODA',
  //     ingredients: Array.from({ length: 10 }, (_, index) => `Ingredient ${String.fromCharCode(65 + index)}`),
  //     cookingProcess: fileContent1, // Replace 'fileContent' with the actual content
  //     instructions: fileContent2,
  //     makingtime: '10 hours',
  //     author:'Prasanth'
  //   });
  // }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage handleLoginusername={handleLoginusername} />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/recipe/:id' element={<RecipeInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
 
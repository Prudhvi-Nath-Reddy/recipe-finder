import HomePage from './HomePage';
import LandingPage from './LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeInfo from './RecipeInfo';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {

    const [fileContent1, setFileContent1] = useState('');
    const [fileContent2, setFileContent2] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleLogin = (username) => {
      // Your login logic
      setLoginUsername(username);
    };
  
  const theme = {
    colors: {
      heading: "rgb(3 3 3)",
      text: "rgba(3 ,3, 3, 1)",
      white: "#fff",
      black: " #212529",
      button: "#080a0b"
    },
    media: {
      mobile: "768px",
      tab: "1108px"
    },
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

        setRecipes(newRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  
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
          <Route path='/' element={<LandingPage theme={theme} handleLogin={handleLogin} />} />
          <Route path='/home' element={<HomePage theme={theme} recipes={recipes} loginUsername={loginUsername}/>} />
          <Route path='/recipe/:id' element={<RecipeInfo recipes={recipes} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
 
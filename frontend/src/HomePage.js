import React, { useState, useEffect } from 'react';
import profile from './images/Icon utensils.png';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import AddRecipePopup from './AddRecipePopup';
import Select from 'react-select';
import axios from 'axios' ;
import './HomePage.css';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const alldata = [];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isAddRecipePopupOpen, setIsAddRecipePopupOpen] = useState(false);
  const [allingredients, setAllIngredients] = useState(alldata);
  const [profileimage, setProfileImage] = useState('');
  const [issidenavopen, setIsSidenavOpen] = useState(false);

  // const loginUsername = useSelector((state) => state.loginUsername);
  const loginUsername = sessionStorage.getItem('loginusername') ;
  const recipes = useSelector((state) => state.recipes)
  console.log('username:',loginUsername)
  console.log('recipes:',recipes)
  useEffect(() => {
    try {
      console.log('user name bacha :', loginUsername);
      const storedProfileImage = sessionStorage.getItem('profileImage');
      if (storedProfileImage) {
        setProfileImage(storedProfileImage);
      } else {
        axios.post('http://localhost:8000/getprofileimage', { username: loginUsername }).then((res) => {
          var gotprofimage = res.data;
          console.log('progimage:', gotprofimage);
  
          // Save profile image to sessionStorage
          sessionStorage.setItem('profileImage', gotprofimage);
  
          setProfileImage(gotprofimage);
        });
      }
    } catch (error) {
      console.log(error);
    }

    try {
      axios.post('http://localhost:8000/getingredients', {}).then((res) => {
        const ingredientsdata = res.data;
        for (let i = 0; i < ingredientsdata.length; i++) {
          const id = ingredientsdata[i]._id;
          const name = ingredientsdata[i].name;
          const data2 = {
            id: id,
            label: name,
            value: name,
          };
          alldata.push(data2);
        }

        setAllIngredients(alldata);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleAddRecipeClick = () => {
    setIsAddRecipePopupOpen(true);
  };

  const handleOptionSelect = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const handleCloseAddRecipePopup = () => {
    setIsAddRecipePopupOpen(false);
  };

  const handleClickProfile = () => {
    setIsSidenavOpen((prev) => !prev);
  };

  const handleSignout = () => {
    console.log('signed out');
  };

  const filteredRecipes = recipes.filter((recipe) => {
    return selectedOptions.every((selectedOption) => recipe.ingredients.includes(selectedOption.value));
  });

    return (
      <div >
        <div className={`main-content ${issidenavopen ? '' : 'open-sidenav'}`}>
          <div className='topnavcontainer'>
            <div className='searchBarContainer'>
              <div className='searchBar'>
                <Select
                  isMulti
                  options={allingredients}
                  value={selectedOptions}
                  onChange={handleOptionSelect}
                  placeholder="Select Ingredients"
                />
              </div>
            </div>
            <button className='addrecipebutton' onClick={handleAddRecipeClick}>
              Add a Recipe
            </button>
            <img className = {"profileimage"} style={{ marginRight: '2%' }} src={profileimage} onClick={handleClickProfile} alt="profile image" />
            
          </div>
          {isAddRecipePopupOpen && (
            <AddRecipePopup
              ingredientsdata ={allingredients}
              onClosePopup={handleCloseAddRecipePopup}
              loginUsername={loginUsername}
            />
          )}

          <div className='recipecardscontainer'>
              {filteredRecipes.map((recipe, index) => (
              <div style={{ marginLeft: index === 0 && searchText ? '50%' : '0' }} key={recipe.id}>
                <Link to={`/recipe/${recipe.id}`} key={recipe.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <RecipeCard recipe={recipe} />
                </Link>
              </div>
            ))}
          </div>
        </div>
        {issidenavopen && 
          <div className="sidenav">
            <p>{loginUsername}</p>
            <t onClick={handleSignout} >signout</t>
          </div> 
        }
      </div>
    );
  }


export default HomePage;

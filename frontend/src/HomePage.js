import React, { useState, useEffect } from 'react';
import profile from './images/Icon utensils.png';
import RecipeCard from './RecipeCard';
import { Link, Navigate } from 'react-router-dom';
import AddRecipePopup from './AddRecipePopup';
import Select from 'react-select';
import axios from 'axios';
import './HomePage.css';
import { useSelector } from 'react-redux';
const logger = require('./logger.js');

const HomePage = () => {
  const alldata = [];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isAddRecipePopupOpen, setIsAddRecipePopupOpen] = useState(false);
  const [allingredients, setAllIngredients] = useState(alldata);
  const [profileimage, setProfileImage] = useState('');
  const [issidenavopen, setIsSidenavOpen] = useState(false);
  const [isUpdatePasswordPopupOpen, setIsUpdatePasswordPopupOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isDeleteAccountPopupOpen, setIsDeleteAccountPopupOpen] = useState(false);

  const loginUsername = sessionStorage.getItem('loginusername');
  const recipes = useSelector((state) => state.recipes)
  console.log('username:', loginUsername)
  console.log('recipes:', recipes)
  useEffect(() => {
    try {
      const storedProfileImage = sessionStorage.getItem('profileImage');
      if (storedProfileImage) {
        setProfileImage(storedProfileImage);
      } else {
        axios.post('http://localhost:8000/getprofileimage', { username: loginUsername }).then((res) => {
          var gotprofimage = res.data;
          console.log('progimage:', gotprofimage);

          sessionStorage.setItem('profileImage', gotprofimage);

          setProfileImage(gotprofimage);
        });
      }
    } catch (error) {
      console.log(error);
      logger.error('Error fetching profile image:', error);
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
        logger.info('fetched all ingredients data')
      });
    } catch (error) {
      console.log(error);
      logger.error('Error fetching ingredients:', error);
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

  const handleUpdatePasswordClick = () => {
    setIsUpdatePasswordPopupOpen(true);
  };

  const handleCloseUpdatePasswordPopup = () => {
    setIsUpdatePasswordPopupOpen(false);
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleUpdatePassword = () => {
    if (newPassword === confirmNewPassword) {
      try {
        axios.post("http://localhost:8000/updatepass", {
          username: loginUsername, 
          password: newPassword,
        })
          .then(res => {
            if (res.data === "done") {

              alert("Successfully Updated");
              logger.info('Password updated successfully for ' + loginUsername);
              handleSignout();
  
            }
            else if (res.data === "err") {
              alert("Something wen WRONG!!!");
              logger.error('Error updating password for ' + loginUsername);
            }
          
  
          })
  
      } catch (error) {
  
        console.log(error);
        logger.error('Error updating password:', error);
      }
      setIsDeleteAccountPopupOpen(false);
      
      handleCloseUpdatePasswordPopup();
    } else {
      console.log('Passwords do not match');
      alert("Passwords Dont match")
      logger.warn('Passwords do not match for ' + loginUsername);
    }
  };

  const handleDeleteAccountClick = () => {
    setIsDeleteAccountPopupOpen(true);
  };

  const handleDeleteAccount = () => {
    try {
      axios.post("http://localhost:8000/deleteaccount", {
        username: loginUsername, 
      })
        .then(res => {
          if (res.data === "done") {
            handleSignout();
            alert("Successfully deleted")
            logger.info('Account deleted successfully for ' + loginUsername);

          }
          else if (res.data === "err") {
            alert("Something wen WRONG!!!")
            logger.error('Error deleting account for ' + loginUsername);
          }
        

        })

    } catch (error) {

      console.log(error);
      logger.error('Error deleting account:', error);
    }
    setIsDeleteAccountPopupOpen(false);
  };

  const handleCloseDeleteAccountPopup = () => {
    setIsDeleteAccountPopupOpen(false);
  };

  const handleSignout = () => {
    logger.info('User signed out: ' + loginUsername);
    sessionStorage.removeItem('loginusername');
    sessionStorage.removeItem('profileImage');
    window.location.href = '/';
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
          <img className={"profileimage"} style={{ marginRight: '2%' }} src={profileimage} onClick={handleClickProfile} alt="profile image" />

        </div>
        {isAddRecipePopupOpen && (
          <AddRecipePopup
            ingredientsdata={allingredients}
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
      {issidenavopen && (
        <div className="sidenav">
          <text className='sidenavusername'>{loginUsername}</text>
          <text style={{ cursor: 'pointer',marginBottom:'15px'}} onClick={handleUpdatePasswordClick}>Update Password</text>
          <text style={{ cursor: 'pointer',marginBottom:'15px'}} onClick={handleDeleteAccountClick} >Delete your account</text>
          <text style={{ cursor: 'pointer',marginBottom:'15px' }} onClick={handleSignout}>Signout</text>
        </div>
      )}
      {isUpdatePasswordPopupOpen && (
        <div className='signuppopupBackground'>
          <div className="signuppopupContainer">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '25px', fontWeight: 'bold' }}>Dear {loginUsername} </div>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}> Do you wanna update the Password?</div>
              <input className='signupinput' type="password" placeholder='New Password' value={newPassword} onChange={handleNewPasswordChange} />
              <input className='signupinput' type="password" placeholder='Confirm New Password' value={confirmNewPassword} onChange={handleConfirmNewPasswordChange} />
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <button className='signupbutton' onClick={handleUpdatePassword}>Update Password</button>
                <button className='signupbutton' onClick={handleCloseUpdatePasswordPopup}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isDeleteAccountPopupOpen && (
        <div className='signuppopupBackground'>
          <div className="signuppopupContainer">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '25px', fontWeight: 'bold' }}>Dear {loginUsername}</div>
              <div style={{ fontSize: '20px', marginBottom: '15px' }}>Do you want to permanently delete your account?</div>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <button className='signupbutton' onClick={handleDeleteAccount}>Yes</button>
                <button className='signupbutton' onClick={handleCloseDeleteAccountPopup}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default HomePage;

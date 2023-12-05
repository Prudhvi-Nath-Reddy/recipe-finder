import React, { Component } from 'react';
import profile from './images/Icon utensils.png';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import AddRecipePopup from './AddRecipePopup';
import Select from 'react-select';
import axios from 'axios' ;
import './HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    const alldata = [] ;
    this.state = {
      selectedOptions: [],
      searchText: '',
      filteredOptions: [],
      isAddRecipePopupOpen: false,
      allingredients: alldata,
      profileimage : '' ,
    
    };
    try {
      console.log('user name bacha :', this.props.loginUsername)
      axios.post("http://localhost:8000/getprofileimage",{username : this.props.loginUsername,
    })
      .then(res=>{
        var gotprofimage = res.data ;

        console.log(gotprofimage)
        this.setState({profileimage: gotprofimage})

            

      })
      
    } catch (error) {
      console.log(error);
      // console.log("bye")
    }


    try {
        axios.post("http://localhost:8000/getingredients",{
      
        })
        .then(res=>{
          const ingredientsdata = res.data ;
          
          
          for (let i = 0; i < ingredientsdata.length; i++) {
            const id = ingredientsdata[i]._id;
            const name= ingredientsdata[i].name;
            const data2  = {
              id:id,
              label :name,
              value: name

            }
            alldata.push(data2);
          }         

        })
        
      } catch (error) {
        console.log(error);
        // console.log("bye")
      }


    
  }

  handleAddRecipeClick = () => {
    this.setState({ isAddRecipePopupOpen: true });
  };

  handleOptionSelect = (selectedOptions) => {
    this.setState({ selectedOptions });
  };

  handleCloseAddRecipePopup = () => {
    this.setState({ isAddRecipePopupOpen: false });
  };

  

  render() {
    const { theme, recipes,loginUsername } = this.props;
    const { searchText, selectedOptions, isAddRecipePopupOpen } = this.state;
    const filteredRecipes = recipes.filter(recipe => {
      return selectedOptions.every(selectedOption => recipe.ingredients.includes(selectedOption.value));
    });

    return (
      <div>
        <div className='topnavcontainer'>
          <div className='searchBarContainer'>
            <div className='searchBar'>
              <Select
                isMulti
                options={this.state.allingredients}
                value={selectedOptions}
                onChange={this.handleOptionSelect}
                placeholder="Select Ingredients"
              />
            </div>
          </div>
          <button className='addrecipebutton' onClick={this.handleAddRecipeClick}>
            Add a Recipe
          </button>
          <img className = {"profileimage"} style={{ marginRight: '5%' }} src={this.state.profileimage} alt="profile image" />
        </div>
        {isAddRecipePopupOpen && (
          <AddRecipePopup
            theme={theme} ingredientsdata ={this.state.allingredients}
            onClosePopup={this.handleCloseAddRecipePopup}
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
    );
  }
}

export default HomePage;

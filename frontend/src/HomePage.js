import React, { Component } from 'react';
import profile from './images/Icon utensils.png';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import AddRecipePopup from './AddRecipePopup';
import Select from 'react-select';
import axios from 'axios' ;

class HomePage extends Component {
  constructor(props) {
    super(props);
    const alldata = [] ;
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


    this.state = {
      selectedOptions: [],
      searchText: '',
      filteredOptions: [],
      isAddRecipePopupOpen: false,
      allingredients: alldata,
    
    };
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

    const styles = {
      topnavcontainer: {
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'space-between',
        padding: '10px',
      },
      searchBarContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
      },
      searchBar: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
      },
      selectedOptionsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '5px',
      },
      selectedOption: {
        background: '#eee',
        borderRadius: '3px',
        padding: '3px 8px',
        margin: '2px',
        display: 'flex',
        alignItems: 'center',
      },
      removeOption: {
        marginLeft: '5px',
        cursor: 'pointer',
      },
      addrecipebutton: {
        backgroundColor: theme.colors.button,
        color: theme.colors.white,
        width: '10%',
        minHeight: '40px',  // Corrected property name
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '15px',
      },
    };

    return (
      <div>
        <div style={styles.topnavcontainer}>
          <div style={styles.searchBarContainer}>
            <div style={styles.searchBar}>
              <Select
                isMulti
                options={this.state.allingredients}
                value={selectedOptions}
                onChange={this.handleOptionSelect}
                placeholder="Select Ingredients"
              />
            </div>
          </div>
          <button style={{ ...styles.addrecipebutton, marginRight: '3%' }} onClick={this.handleAddRecipeClick}>
            Add a Recipe
          </button>
          <img style={{ marginRight: '3%' }} src={profile} alt="profile image" />
        </div>
        {isAddRecipePopupOpen && (
          <AddRecipePopup
            theme={theme} ingredientsdata ={this.state.allingredients}
            onClosePopup={this.handleCloseAddRecipePopup}
            loginUsername={loginUsername}
          />
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
        {recipes.map((recipe,index) => (
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

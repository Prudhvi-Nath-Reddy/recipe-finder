import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios' ;
import "./AddRecipePopup.css";

class AddRecipePopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeName: '',
      selectedIngredients: [],
      timeNeeded: '',
      process: '',
      precautions: '',
      allIngredients: [],
      author : localStorage.getItem('author'),
    };
    console.log(this.state)


  }


    
  componentDidMount() {
    // Call handleIngredients to populate allIngredients
    this.handleauthor();
    this.handleIngredients();
  }
  handleIngredients = ()=> {
    const  {ingredientsdata} = this.props
    this.setState({allIngredients:ingredientsdata})
  }

  handleRecipeNameChange = (event) => {
    this.setState({ recipeName: event.target.value });
  };

  handleIngredientsChange = (selectedIngredients) => {
    this.setState({ selectedIngredients });
  };

  handleTimeNeededChange = (event) => {
    this.setState({ timeNeeded: event.target.value });
  };

  handleProcessChange = (event) => {
    this.setState({ process: event.target.value });
  };

  handlePrecautionsChange = (event) => {
    this.setState({ precautions: event.target.value });
  };

  handleauthor = () => {
    const { loginUsername } = this.props;
  
    if (loginUsername) {
      // Store author name in localStorage
      localStorage.setItem('author', loginUsername);
  
      this.setState({ author: loginUsername }, () => {
        console.log(this.state.author);
      });
    } else {
      console.log(false);
    }
  };
  
  
  

  handleAddRecipe = () => {

    const { recipeName, selectedIngredients, timeNeeded, process, precautions,author } = this.state;
    
    console.log({ recipeName, selectedIngredients, timeNeeded, process, precautions,author })

    try {
            const onlyselingrenames = []
            for (let i = 0; i < selectedIngredients.length; i++) {
                const element = selectedIngredients[i].label;
                onlyselingrenames.push(element);
                
            }
            axios.post("http://localhost:8000/sendrecipe",{
                recipename: recipeName,
                selectedIngredients:onlyselingrenames,
                timeneeded:timeNeeded,
                process:process,
                precautions:precautions,
                author:author,
            })
        } catch (error) {
            console.log(error)
            
        }
    // console.log('Adding recipe:', { recipeName, selectedIngredients, timeNeeded, process, precautions });

    // Close the popup
    this.handleClosePopup();
  };

  handleClosePopup = () => {
    this.setState({
      recipeName: '',
      selectedIngredients: [],
      timeNeeded: '',
      process: '',
      precautions: '',
    });
    this.props.onClosePopup();
  };

  render() {
    const { theme,loginUsername } = this.props;
    const { recipeName, selectedIngredients, timeNeeded, process, precautions, allIngredients ,author} = this.state;
    
    return (
      
      <div className='popupBackground'>
        <div className='popupContainer'>
          <div className='title'>Create Recipe</div>
          <input
            className='addrecipeinputField'
            type="text"
            placeholder="Recipe name"
            value={recipeName}
            onChange={this.handleRecipeNameChange}
          />
          <div className='selectContainer'>
            <Select
              isMulti
              options={allIngredients}
              value={selectedIngredients}
              onChange={this.handleIngredientsChange}
              placeholder="Select Ingredients"
            />
          </div>
          <input
            className='addrecipeinputField'
            type="text"
            placeholder="Time needed"
            value={timeNeeded}
            onChange={this.handleTimeNeededChange}
          />
          <textarea
            className='addrecipetextArea'
            placeholder="Process"
            value={process}
            onChange={this.handleProcessChange}
          />
          <textarea
            className='addrecipetextArea'
            placeholder="Precautions"
            value={precautions}
            onChange={this.handlePrecautionsChange}
          />
          <div className='buttonContainer'>
            <button className='addrecipebutton' onClick={this.handleAddRecipe}>
              Add Recipe
            </button>
            <button className='addrecipebutton' onClick={this.handleClosePopup}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddRecipePopup;

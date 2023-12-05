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
      selectedImages: [],
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

    const { recipeName, selectedIngredients, timeNeeded, process, precautions,author,selectedImages } = this.state;
    
    console.log({ recipeName, selectedIngredients, timeNeeded, process, precautions,author,selectedImages})
 
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

  handleImageChange = (event) => {
    const files = event.target.files;
    const imagePromises = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      imagePromises.push(
        new Promise((resolve, reject) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(file);
        })
      );
    }
  
    Promise.all(imagePromises)
      .then((base64Images) => {
        this.setState({ selectedImages: base64Images });
      })
      .catch((error) => {
        console.error('Error converting images to base64:', error);
      });
  };
  
  

  render() {
    const { theme,loginUsername,profileimage } = this.props;
    const { recipeName, selectedIngredients, timeNeeded, process, precautions, allIngredients ,author,selectedImages} = this.state;
    const imagePreview = selectedImages.length > 0 && (
      <div className="image-preview">
        {selectedImages.map((base64Image, index) => (
          <img
            key={index}
            src={base64Image}
            alt={`Selected Image ${index + 1}`}
            className="preview-image"
          />
        ))}
      </div>
    );
    return (
      
      <div className='popupBackground'>
        <div className='popupContainer'>
          <div className='title'>Create Recipe</div>
          {imagePreview}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={this.handleImageChange}
          />
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
          <div className='addrecipebuttonContainer'>
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

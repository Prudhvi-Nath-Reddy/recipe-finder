import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Importing useSelector from react-redux
import "./AddRecipePopup.css";

const AddRecipePopup = (props) => {
  const [recipeName, setRecipeName] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [timeNeeded, setTimeNeeded] = useState('');
  const [process, setProcess] = useState('');
  const [precautions, setPrecautions] = useState('');
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [author, setAuthor] = useState(localStorage.getItem('author'));

  const loginUsername = useSelector((state) => state.loginUsername);

  useEffect(() => {
    handleIngredients();
    handleAuthor();
  }, [loginUsername]); // Trigger useEffect when loginUsername changes

  const handleIngredients = () => {
    const { ingredientsdata } = props;
    setAllIngredients(ingredientsdata);
  };

  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);
  };

  const handleIngredientsChange = (selectedIngredients) => {
    setSelectedIngredients(selectedIngredients);
  };

  const handleTimeNeededChange = (event) => {
    setTimeNeeded(event.target.value);
  };

  const handleProcessChange = (event) => {
    setProcess(event.target.value);
  };

  const handlePrecautionsChange = (event) => {
    setPrecautions(event.target.value);
  };

  const handleAuthor = () => {
    if (loginUsername) {
      localStorage.setItem('author', loginUsername);
      setAuthor(loginUsername);
    }
  };

  const handleAddRecipe = () => {
    if (!selectedImages || selectedImages.length === 0 || selectedImages.length > 4) {
      alert('Please upload 1 to 4 images only');
      return;
    }

    const onlySelectedIngredients = selectedIngredients.map((ingredient) => ingredient.label);

    try {
      axios.post("http://localhost:8000/sendrecipe", {
        recipename: recipeName,
        recipeimage: selectedImages,
        selectedIngredients: onlySelectedIngredients,
        timeneeded: timeNeeded,
        process: process,
        precautions: precautions,
        author: author,
      })
      .then(res => {
        if (res.data === "done") {
          alert("Recipe added successfull!!");
          
        } else {
          alert("something went wrong")
          
        }
      })
    } catch (error) {
      console.log(error);
    }

    handleClosePopup();
  };

  const handleClosePopup = () => {
    setRecipeName('');
    setSelectedIngredients([]);
    setTimeNeeded('');
    setProcess('');
    setPrecautions('');
    props.onClosePopup();
  };

  const handleImageChange = (event) => {
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
        setSelectedImages((prevImages) => [...prevImages, ...base64Images]);
      })
      .catch((error) => {
        console.error('Error converting images to base64:', error);
      });
  };

  const handleRemoveImage = (indexToRemove) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(indexToRemove, 1);
      return updatedImages;
    });
  };

  const imagePreview = selectedImages.length > 0 && (
    <div className="image-preview">
      {selectedImages.map((base64Image, index) => (
        <div key={index} className="image-container">
          <img
            src={base64Image}
            alt={`Selected Image ${index + 1}`}
            className="preview-image"
          />
          <button
            className="remove-image-button"
            onClick={() => handleRemoveImage(index)}
          >
            X
          </button>
        </div>
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
          onChange={handleImageChange}
        />
        <input
          className='addrecipeinputField'
          type="text"
          placeholder="Recipe name"
          value={recipeName}
          onChange={handleRecipeNameChange}
        />
        <div className='selectContainer'>
          <Select
            isMulti
            options={allIngredients}
            value={selectedIngredients}
            onChange={handleIngredientsChange}
            placeholder="Select Ingredients"
          />
        </div>
        <input
          className='addrecipeinputField'
          type="text"
          placeholder="Time needed"
          value={timeNeeded}
          onChange={handleTimeNeededChange}
        />
        <textarea
          className='addrecipetextArea'
          placeholder="Process"
          value={process}
          onChange={handleProcessChange}
        />
        <textarea
          className='addrecipetextArea'
          placeholder="Precautions"
          value={precautions}
          onChange={handlePrecautionsChange}
        />
        <div className='addrecipebuttonContainer'>
          <button className='addrecipebutton' onClick={handleAddRecipe}>
            Add Recipe
          </button>
          <button className='addrecipebutton' onClick={handleClosePopup}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRecipePopup;

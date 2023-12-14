import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import RecipeInfo from '../RecipeInfo';

// Mock useSelector and useParams
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
}));

describe('RecipeInfo', () => {
  const mockRecipe = {
    id: 1,
    name: 'Test Recipe',
    author: 'Test Author',
    image: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
    ingredients: ['Ingredient 1', 'Ingredient 2'],
    instructions: 'Test instructions',
    cookingProcess: 'Test cooking process',
  };

  it('renders without crashing', () => {
    useSelector.mockReturnValue([mockRecipe]);
    render(<RecipeInfo />, { wrapper: BrowserRouter });
  });

  it('displays the recipe when found', () => {
    useSelector.mockReturnValue([mockRecipe]);
    render(<RecipeInfo />, { wrapper: BrowserRouter });
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('by Test Author')).toBeInTheDocument();
    expect(screen.getByText('Ingredient 1')).toBeInTheDocument();
    expect(screen.getByText('Test instructions')).toBeInTheDocument();
  });

  it('shows a not found message when the recipe does not exist', () => {
    useSelector.mockReturnValue([]);
    render(<RecipeInfo />, { wrapper: BrowserRouter });
    expect(screen.getByText('Recipe not found')).toBeInTheDocument();
  });

});


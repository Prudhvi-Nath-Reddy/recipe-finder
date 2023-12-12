// src/LandingPage.test.js
const React = require('react');
const { render, screen } = require('@testing-library/react');
const LandingPage = require('./LandingPage');


test('renders LandingPage component', () => {
  render(<LandingPage />);
  expect(screen.getByText(/Discover Delicious Recipes/i)).toBeInTheDocument();
});

// Add more test cases as needed


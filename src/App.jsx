import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<PokemonList />} />
      <Route path='/pokemon/:name' element={<PokemonDetail />} />
    </Routes>
  </Router>
);

export default App;

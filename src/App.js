import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom/cjs/react-router-dom';
import MainPage from './Components/MainPage';
import CharacterDetailPage from './Components/CharacterDetailPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/characterDetail/:id" exact component={CharacterDetailPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

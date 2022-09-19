import './App.css';
import React from 'react';
import Home from './Components/home/Home';
import Router from './Router';
import Filter from './Components/filters/Filter';
import RestaurantDetail from './Components/details/Restaurantdetail';

// Class Component
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="app">
  <Router/>
    </div>)
  }
}

export default App;


import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.scss';
import FormComponent from './components/formComponent/FormComponent';
import ImagesBlock from './components/imagesBlock/imagesBlock';

class App extends Component {

  render() {
    return (
      <div className="app">
        <FormComponent/>
        <ImagesBlock/>
      </div>
    )
  }
}



export default connect()(App);
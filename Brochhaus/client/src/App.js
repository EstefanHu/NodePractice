import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomeView from './views/HomeView';
import CreateView from './views/CreateView';
import DetailView from './views/DetailView';
import {ApolloClient, ApolloProvider, createBatchingNetworkInterface} from 'react-apollo';

class App extends Component {
  render() {
    return <div className="App" />
  }
}

export default App;

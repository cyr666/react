import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { View as componentIndex } from '../components/CommonWrapper/';
import { View as pagesIndex } from '../pages/index/';
import { View as pagesList } from '../pages/list/';
import { View as pagesDetail } from '../pages/detail/';
import { Provider } from 'react-redux';
import store from './store'
import './app.css';
export default class App extends Component {
  render() {
    return(
      <Provider store = {store}>
          <div className = "wrapper">
          	<Router history = { browserHistory }>
          		<Route path = "/" component = {componentIndex}>
  					   <IndexRoute component = {pagesIndex}></IndexRoute>
               <Route path = "list/:id" component = {pagesList}></Route>
               <Route path = "detail/:id" component = {pagesDetail}></Route>
          		</Route>      		
          	</Router>
          </div>
      </Provider>
      )
  }
}



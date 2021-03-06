/* eslint-disable import/default */
/* eslint-disable react/jsx-no-bind */

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { retrieveUser } from './reducers/initialState';

// To load styles globally without CSS modules, use the !style!css!{{path}} format.
// https://github.com/css-modules/css-modules/pull/65#issuecomment-248280248
import '!style!css!../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '!style!css!../node_modules/font-awesome/css/font-awesome.min.css';
import '!style!css!../node_modules/toastr/build/toastr.min.css';
import '!style!css!./styles/colors.css';

import '!style!css!../node_modules/animate.css/animate.min.css';
import './styles/toastrOptions';

import '!style!css!../node_modules/dashboard-styles/dist/dashboard.min.css';
import '!style!css!./styles/spinner.css';

import './images/favicon.ico';
import './images/apple-touch-icon.png';
import './images/favicon-16x16.png';
import './images/favicon-32x32.png';
import './images/mstile-150x150.png';
import './images/safari-pinned-tab.svg';

import '../node_modules/jquery/dist/jquery.min';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import '../node_modules/metismenu/dist/metisMenu.min';
import '../node_modules/jquery-slimscroll/jquery.slimscroll.min';

import './inspinia.js';

import pace from '../node_modules/pace-progress/pace.min';
pace.start();

// Necessary for Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Application from './components/Application.jsx';
import Dashboard from './components/dashboard';
import ItemPage from './components/item';
import ItemDetailPage from './components/itemDetail';

import Login from './components/login';

const store = configureStore();

function isAuthorized(nextState, replace, callback) {
  if (nextState.location.pathname === '/login') {
    callback();
    return;
  }
  const state = store.getState();
  if (state.user && state.user.loggedIn === true) {
    callback();
    return;
  }

  retrieveUser((store.dispatch), (error) => {
    if (!!error) {
      replace('/login');
    }
    callback();
  });
}


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Application} onEnter={(nextState, replace, callback) => isAuthorized(nextState, replace, callback)}>
        <IndexRoute component={Dashboard} />
        <Route path="login" component={Login} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="items" component={ItemPage} />
        <Route path="item(/:id)" component={ItemDetailPage} />
        <Route path="item-categories" component={Dashboard} />
        <Route path="modifiers" component={Dashboard} />
        <Route path="taxes" component={Dashboard} />
        <Route path="discounts" component={Dashboard} />
        <Route path="orders" component={Dashboard} />
        <Route path="users" component={Dashboard} />
        <Redirect to="dashboard" from="*" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('application')
);

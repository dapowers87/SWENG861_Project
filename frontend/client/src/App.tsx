import React, { Fragment, useReducer } from 'react';
import './App.css';
import { reducer, initialState, AppContext } from './store';
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {createBrowserHistory} from 'history';
import LandingPage from './pages/Landing/LandingPage';

export const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);  

  return (
    <Fragment>
      <ToastContainer position="bottom-right" />
      <AppContext.Provider value={{ state, dispatch }}> 
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
          </Switch>
        </Router>
      </AppContext.Provider>
    </Fragment>
  );
}

export const history = createBrowserHistory();

export default App;

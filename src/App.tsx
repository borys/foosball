import React from 'react';
// import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
//import { Lobby } from 'lobby/container/Lobby';

import { initAppStore } from 'common/store';
import { GameCreate } from 'create-game/containers/GameCreate';
import { Lobby } from 'lobby/container/Lobby';
import { GameContainer } from 'game/containers/Game';

const store = initAppStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Lobby} />
          <Route exact path="/create" component={GameCreate} />
          <Route exact path="/game" component={GameContainer} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

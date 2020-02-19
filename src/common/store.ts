import {
  Reducer,
  ReducersMapObject,
  Store,
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  LobbyState,
  lobbyReducer,
  initState as lobbyInitState
} from 'lobby/reducers';

import {
  GameCreateState,
  createGameReducer,
  initState as createGameInitState
} from 'create-game/reducers';
import {
  GameState,
  gameReducer,
  initState as gameInitState
} from 'game/reducers';

export interface AppStore {
  lobby: LobbyState;
  gameCreate: GameCreateState;
  game: GameState;
}

const staticReducers = {
  lobby: lobbyReducer,
  gameCreate: createGameReducer,
  game: gameReducer
};

export interface WithAsync {
  asyncReducers: ReducersMapObject;
  injectReducer: (key: string, asyncReducer: Reducer) => void;
}

const createReducers = (staticReducers: ReducersMapObject) => (
  asyncReducer: ReducersMapObject
) => {
  return combineReducers({ ...staticReducers, ...asyncReducer });
};

const createAsyncReducers = createReducers(staticReducers);

const withAsyncReducers = (store: Store): Store & WithAsync => {
  return {
    ...store,
    asyncReducers: {},
    injectReducer(key: string, asyncReducer: Reducer) {
      this.asyncReducers[key] = asyncReducer;
      this.replaceReducer(createAsyncReducers(this.asyncReducers));
      console.log(`Injected reducer ${key}`);
    }
  };
};

export const initAppStore = () => {
  const middleware = [thunk];

  const initState: AppStore = {
    lobby: lobbyInitState,
    gameCreate: createGameInitState,
    game: gameInitState
  };

  const reducers = createReducers(staticReducers)({});

  let appliedMiddlewares = applyMiddleware(...middleware);
  if (process.env.NODE_ENV !== 'production') {
    appliedMiddlewares = composeWithDevTools(appliedMiddlewares);
  }

  return withAsyncReducers(
    createStore(reducers, initState, appliedMiddlewares)
  );
};

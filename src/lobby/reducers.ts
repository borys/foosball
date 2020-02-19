import { AnyAction, Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import { fetchPlayersAsync } from './actions';
import { Player } from 'common/models';

export interface LobbyState {
  loading: boolean;
  data: Player[] | null;
}

export const initState: LobbyState = {
  loading: false,
  data: null
};

export const lobbyReducer: Reducer<LobbyState, AnyAction> = (
  state: LobbyState | undefined,
  action: AnyAction
) => {
  if (state === undefined) {
    return initState;
  }

  switch (action.type) {
    case getType(fetchPlayersAsync.request):
      return {
        ...state,
        loading: true
      };
    case getType(fetchPlayersAsync.failure):
      return {
        ...state,
        loading: false
      };
    case getType(fetchPlayersAsync.success):
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

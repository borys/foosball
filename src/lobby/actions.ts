import config from 'config';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createAsyncAction } from 'typesafe-actions';
import { Player } from 'common/models';

export const fetchPlayersAsync = createAsyncAction(
  'FETCH_PLAYERS_REQUEST',
  'FETCH_PLAYERS_SUCCESS',
  'FETCH_PLAYERS_FAILURE'
)<undefined, Player[], undefined>();

export const fetchPlayers = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(fetchPlayersAsync.request());

    try {
      const res = await fetch(`${config.url}/players`);

      if (res.ok) {
        const data = await res.json();
        dispatch(fetchPlayersAsync.success(data));
      } else {
        dispatch(fetchPlayersAsync.failure());
      }
    } catch {
      dispatch(fetchPlayersAsync.failure());
    }
  };
};

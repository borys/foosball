import config from 'config';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createAsyncAction, action } from 'typesafe-actions';
import { Player, Game, Teams } from 'common/models';

export const searchPlayersAsync = createAsyncAction(
  'SEARCH_PLAYERS_REQUEST',
  'SEARCH_PLAYERS_SUCCESS',
  'SEARCH_PLAYERS_FAILURE'
)<undefined, Player[], undefined>();

export const searchPlayers = (
  name: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(searchPlayersAsync.request());

    try {
      const res = await fetch(`${config.url}/players`);

      if (res.ok) {
        const data = await res.json();
        dispatch(searchPlayersAsync.success(data));
      } else {
        dispatch(searchPlayersAsync.failure());
      }
    } catch {
      dispatch(searchPlayersAsync.failure());
    }
  };
};

export const saveGameAsync = createAsyncAction(
  'SAVE_GAME_REQUEST',
  'SAVE_GAME_SUCCESS',
  'SAVE_GAME_FAILURE'
)<undefined, Player[], undefined>();

export const saveGame = (
  game: Game
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(saveGameAsync.request());

    try {
      const res = await fetch(`${config.url}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
      });

      if (res.ok) {
        const data = await res.json();
        dispatch(saveGameAsync.success(data));
      } else {
        dispatch(saveGameAsync.failure());
      }
    } catch {
      dispatch(saveGameAsync.failure());
    }
  };
};

export const ADD_PLAYER_TO_TEAM = 'ADD_PLAYER_TO_TEAM';
export const addPlayerToTeam = (team: Teams, player: Player | null) =>
  action(ADD_PLAYER_TO_TEAM, { team, player });

export const CLEAR_GAME = 'CLEAR_GAME';
export const clearGame = () => action(CLEAR_GAME);

import config from 'config';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createAsyncAction } from 'typesafe-actions';
import { Player, Game } from 'common/models';
import { Teams } from 'common/models';
import { action } from 'typesafe-actions';

export const SET_SCORES = 'SET_SCORES';
export const setScores = (team: Teams, idx: number, scores: number) =>
  action(SET_SCORES, { team, idx, scores });

export const updateGameAsync = createAsyncAction(
  'UPDATE_GAME_REQUEST',
  'UPDATE_GAME_SUCCESS',
  'UPDATE_GAME_FAILURE'
)<undefined, Player[], undefined>();

export const updateGame = (
  game: Game
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(updateGameAsync.request());

    try {
      const res = await fetch(`${config.url}/games/${game.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
      });

      if (res.ok) {
        const data = await res.json();
        dispatch(updateGameAsync.success(data));
      } else {
        dispatch(updateGameAsync.failure());
      }
    } catch {
      dispatch(updateGameAsync.failure());
    }
  };
};

import { Game, Teams, PlayerGameResult } from 'common/models';
import { SET_SCORES } from './actions';
import { AnyAction, Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import { saveGameAsync } from 'create-game/actions';

export interface GameState {
  game: Game;
}

export const initState: GameState = {
  game: {
    [Teams.TEAM_A]: [null, null],
    [Teams.TEAM_B]: [null, null]
  }
};

export const gameReducer: Reducer<GameState, AnyAction> = (
  state: GameState | undefined,
  action: AnyAction
) => {
  if (state === undefined) {
    return initState;
  }

  switch (action.type) {
    case getType(saveGameAsync.success):
      const game: Game = action.payload;

      return {
        ...state,
        game
      };
    case SET_SCORES:
      const { team, idx, scores } = action.payload as {
        team: Teams;
        idx: number;
        scores: number;
      };
      const newScores = [...state.game[team]];
      (newScores[idx] as PlayerGameResult).score = scores;

      return {
        ...state,
        game: {
          ...state.game,
          [team]: newScores
        }
      };

    default:
      return state;
  }
};

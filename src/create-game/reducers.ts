import { AnyAction, Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import { searchPlayersAsync, ADD_PLAYER_TO_TEAM, CLEAR_GAME } from './actions';
import { Player, Game, Teams, PlayerGameResult } from 'common/models';

export interface GameCreateState {
  allPlayers: Player[];
  availablePlayers: Player[];
  game: Game;
}

export const initState: GameCreateState = {
  allPlayers: [],
  availablePlayers: [],
  game: {
    [Teams.TEAM_A]: [null, null],
    [Teams.TEAM_B]: [null, null]
  }
};

export const createGameReducer: Reducer<GameCreateState, AnyAction> = (
  state: GameCreateState | undefined,
  action: AnyAction
) => {
  if (state === undefined) {
    return initState;
  }

  switch (action.type) {
    case getType(searchPlayersAsync.request):
      return {
        ...state,
        searchLoading: true
      };
    case getType(searchPlayersAsync.failure):
      return {
        ...state,
        searchLoading: false
      };
    case getType(searchPlayersAsync.success):
      return {
        ...state,
        allPlayers: action.payload,
        availablePlayers: action.payload,
        searchLoading: false
      };

    case ADD_PLAYER_TO_TEAM:
      const { team, player } = action.payload as {
        team: Teams;
        player: Player;
      };

      const newTeam = [
        { player: player, scores: 0 },
        ...state.game[team]
      ].slice(0, 2);

      const availablePlayers = state.availablePlayers.filter(
        p => p.id !== player.id
      );

      if (state.game[team][1] != null) {
        availablePlayers.push((state.game[team][1] as PlayerGameResult).player);
      }

      return {
        ...state,
        availablePlayers,
        game: {
          ...state.game,
          [team]: newTeam
        }
      };

    case CLEAR_GAME:
      return {
        ...state,
        availablePlayers: state.allPlayers,
        game: {
          [Teams.TEAM_A]: [null, null],
          [Teams.TEAM_B]: [null, null]
        }
      };

    default:
      return state;
  }
};

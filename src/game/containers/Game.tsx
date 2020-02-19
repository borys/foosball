import React from 'react';
import { GameView } from 'game/components/GameView';
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from 'common/store';
import { useHistory } from 'react-router-dom';
import { Teams, NullablePlayerGameResult } from 'common/models';
import { setScores, updateGame } from 'game/actions';
import { useThunkDispatch } from 'utils/useThunkDispatch';

export const GameContainer: React.FC = () => {
  const game = useSelector((state: AppStore) => state.game.game);
  const history = useHistory();
  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();

  const onScoreChange = (team: Teams, idx: number, score: number) => {
    dispatch(setScores(team, idx, score));
  };

  const countTeamScore = (team: NullablePlayerGameResult[]) =>
    team.map(p => p?.score ?? 0).reduce((acc, val) => acc + val);

  const teamAScore = countTeamScore(game[Teams.TEAM_A]);
  const teamBScore = countTeamScore(game[Teams.TEAM_B]);

  const winner =
    teamAScore === teamBScore
      ? null
      : teamAScore > teamBScore
      ? Teams.TEAM_A
      : Teams.TEAM_B;

  const onSave = () => {
    thunkDispatch(updateGame(game));
  };

  const onReturnToCreate = () => {
    history.push('/create');
  };

  return (
    <GameView
      game={game}
      onSave={onSave}
      onScoreChange={onScoreChange}
      winner={winner}
      onReturnToCreate={onReturnToCreate}
    />
  );
};

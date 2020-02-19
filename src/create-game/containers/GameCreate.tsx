import { GameCreateView } from '../components/GameCreateView';
import React, { useState, useEffect } from 'react';
import { Player, Teams } from 'common/models';
import { useThunkDispatch } from 'utils/useThunkDispatch';
import {
  searchPlayers,
  addPlayerToTeam,
  saveGame,
  clearGame
} from 'create-game/actions';
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from 'common/store';
import { useHistory } from 'react-router-dom';

export const GameCreate: React.FC = () => {
  const thunkDispatch = useThunkDispatch();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    thunkDispatch(searchPlayers(''));
  }, [thunkDispatch]);

  const availablePlayers: Player[] = useSelector(
    (state: AppStore) => state.gameCreate.availablePlayers
  );

  const onSelect = (id: number) => {
    setSelectedPlayer(availablePlayers.find(p => p.id === id) || null);
  };

  const game = useSelector((state: AppStore) => state.gameCreate.game);
  const countA = game[Teams.TEAM_A].filter(p => !!p).length;
  const countB = game[Teams.TEAM_B].filter(p => !!p).length;
  const isGameValid = countA > 0 && countA === countB;

  const onSave = () => {
    thunkDispatch(saveGame(game));
    history.push('/game');
  };

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const onAdd = (team: Teams) => {
    if (!selectedPlayer) {
      return;
    }

    dispatch(addPlayerToTeam(team, { ...selectedPlayer }));
    setSelectedPlayer(null);
  };

  const onClear = () => {
    dispatch(clearGame());
  };

  return (
    <GameCreateView
      game={game}
      players={availablePlayers}
      onSelect={onSelect}
      onSave={onSave}
      onClear={onClear}
      onAdd={onAdd}
      isGameValid={isGameValid}
    />
  );
};

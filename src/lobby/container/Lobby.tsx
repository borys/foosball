import { useSelector } from 'react-redux';
import { AppStore } from 'common/store';
import { LobbyView } from 'lobby/components/LobbyView';
import React, { useEffect } from 'react';
import { useThunkDispatch } from 'utils/useThunkDispatch';
import { fetchPlayers } from 'lobby/actions';
import { useHistory } from 'react-router-dom';

export const Lobby: React.FC = () => {
  const loading = useSelector((state: AppStore) => state.lobby.loading);
  const players = useSelector((state: AppStore) => state.lobby.data);
  const thunkDispatch = useThunkDispatch();
  let history = useHistory();

  useEffect(() => {
    thunkDispatch(fetchPlayers());
  }, [thunkDispatch]);

  const onCreate = () => {
    history.push('/create');
  };

  return <LobbyView players={players} loading={loading} onCreate={onCreate} />;
};

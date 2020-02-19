import { AppStore } from 'common/store';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const useThunkDispatch = () =>
  useDispatch<
    (action: ThunkAction<Promise<void>, AppStore, {}, AnyAction>) => void
  >();

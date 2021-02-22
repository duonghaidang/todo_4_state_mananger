import API from '../../utils/api';
import {REDUX} from '../store/types';

export const searchExample = (name: String, onCompleted: Function) => {
  return async (dispatch: any) => {
    try {
      const {data} = await API.get(
        `artist?filter={"name" : { "$iLike" : "%25${name}%25" }}&fields=["$all"]`,
      );
      const arr = data?.results?.objects?.rows;
      dispatch({type: REDUX.ADD_SEARCH, payload: arr});
      onCompleted(true);
      return arr;
    } catch (err) {
      onCompleted(false);
      return [];
    }
  };
};

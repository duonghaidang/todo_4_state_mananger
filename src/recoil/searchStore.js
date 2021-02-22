import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
  useRecoilValue,
} from 'recoil';
import API from '../utils/api';
import AsyncStorage from '@react-native-community/async-storage';
import {asyncStorageEffect} from './asyncStorageEffect';
import {TYPE_RECOIL} from './type';

export const searchList = atom({
  key: TYPE_RECOIL.SEARCH_LIST,
  default: [],
  effects_UNSTABLE: [asyncStorageEffect(TYPE_RECOIL.SEARCH_LIST)],
});

export const listQuery = selectorFamily({
  key: TYPE_RECOIL.GET_SEARCH_LIST,
  get: (name) => async () => {
    try {
      const response = await API.get(
        `artist?filter={"name" : { "$iLike" : "%25${name}%25" }}&fields=["$all"]`,
      );

      return response?.data?.results?.objects?.rows || [];
    } catch (e) {
      console.log('e', e);
    }
  },
});

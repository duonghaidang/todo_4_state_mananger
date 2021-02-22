import AsyncStorage from '@react-native-community/async-storage';
import {DefaultValue} from 'recoil';

export const asyncStorageEffect = (key) => ({setSelf, onSet}) => {
  /** If there's a persisted value - set it on load  */
  const loadPersisted = async () => {
    const savedValue = await AsyncStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  };

  loadPersisted();

  onSet((newValue) => {
    if (newValue instanceof DefaultValue) {
      AsyncStorage.removeItem(key);
    } else {
      AsyncStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

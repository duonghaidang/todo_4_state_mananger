/// Imports: Dependencies
import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import todoReducer from './todoReducer';
/// Redux: Root Reducer
const reducers = combineReducers({
  todoReducer: persistReducer(
    {
      key: 'todoReducer',
      storage: AsyncStorage,
    },
    todoReducer,
  ),
});
// Exports
export default reducers;

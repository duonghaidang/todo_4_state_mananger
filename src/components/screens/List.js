import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {Modal, Checkbox} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  todoList,
  updateCheckedTodo,
  deleteTodoRecoil,
} from '../../recoil/todoStore';
import {REDUX} from '../../redux/store/types';
import {WIDTH} from '../../utils/scale';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {akita} from '../../akita';
import {todoListHook, useTodoHookState} from '../../hookstate';
import {useObserver} from 'mobx-react';
import {useTodoStore} from '../../mobx/context';
import {ROUTE_KEYS} from '../../utils/route_keys';
import {useRecoilState} from 'recoil';
import {none} from '@hookstate/core';
import randomcolor from 'randomcolor';
import persistStore from 'redux-persist/es/persistStore';
import {store} from '../../redux/store';

export default function Redux({navigation}) {
  const color = '#ef4a6b'; // randomcolor();

  const listTodoRx = useSelector((state) => state.todoReducer.todoList);

  const listTodoRc = useRecoilValue(todoList);

  const listTodoHook = useTodoHookState();

  const todoStore = useTodoStore();
  const listTodoMobx = todoStore?.todoList
    ? Object.values(todoStore?.todoList)
    : [];

  const [listTodoRedux, setListTodoRedux] = useState(Object.values(listTodoRx));

  const [listTodoRecoil, setListTodoRecoil] = useState(
    Object.values(listTodoRc),
  );

  const listTodoHookState = Object.values(listTodoHook.get());

  const loadTodoRedux = () => {
    persistStore(store, null, async () => {
      // console.log('~~~~~~~~~~!', store.getState().todoReducer.searchList);
    });
  };

  useEffect(() => {
    loadTodoRedux();
  }, []);

  useEffect(() => {
    setListTodoRedux(Object.values(listTodoRx));
  }, [listTodoRx]);

  useEffect(() => {
    setListTodoRecoil(Object.values(listTodoRc));
  }, [listTodoRc]);

  const dispatch = useDispatch();
  const updateCheckedRecoil = useSetRecoilState(updateCheckedTodo);

  const updateChecked = (type, id) => {
    if (type === 'REDUX') {
      const payload = {id};
      dispatch({type: REDUX.UPDATE_CHECKED, payload: payload});
    } else if (type === 'RECOIL') {
      updateCheckedRecoil(id);
    } else if (type === 'HOOK') {
      let listTodoHookTemp = {...todoListHook.get()};
      const payload = {
        ...listTodoHookTemp[id],
        checked: !listTodoHookTemp[id].checked,
      };
      todoListHook[id].set(payload);
    } else if (type === 'MOBX') {
      todoStore.updateCheckedTodo(id);
    }
  };

  const deleteTodoRecoil2 = useSetRecoilState(deleteTodoRecoil);

  const deleteTodo = (type, id) => {
    if (type === 'REDUX') {
      const payload = {id};
      dispatch({type: REDUX.DELETE_TODO, payload: payload});
    } else if (type === 'RECOIL') {
      deleteTodoRecoil2(id);
    } else if (type === 'HOOK') {
      todoListHook[id].set(none);
    } else if (type === 'MOBX') {
      todoStore.deleteTodo(id);
    }
  };

  const renderItem = ({item, index}) => {
    const backgroundColor = '#fa2';
    return (
      <View
        key={item.id}
        style={{
          width: WIDTH * 0.9,
          paddingVertical: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: backgroundColor,
          borderRadius: 10,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => updateChecked(item.type, item.id)}
            style={{
              height: 30,
              width: 30,
              borderRadius: 4,
              marginHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: 'pink',
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>
              {item?.checked ? '√' : ''}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              textDecorationLine: item?.checked ? 'line-through' : 'none',
              textDecorationStyle: 'solid',
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {item.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => deleteTodo(item.type, item.id)}
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            marginHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 30}}>{'×'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return useObserver(() => (
    <View style={{flex: 1}}>
      <View
        style={{
          width: WIDTH,
          height: 40,
          justifyContent: 'center',
          backgroundColor: color,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: '#fff',
            fontWeight: 'bold',
          }}>
          TODO APP
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {listTodoRedux?.length ? (
            <View style={{flex: 1, marginVertical: 20}}>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                Redux List:
              </Text>
              <FlatList
                data={listTodoRedux}
                renderItem={renderItem}
                contentContainerStyle={{flex: 1}}
              />
            </View>
          ) : null}
          {listTodoRecoil?.length ? (
            <View style={{flex: 1, marginVertical: 20}}>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                Recoil List:
              </Text>
              <FlatList
                data={listTodoRecoil}
                renderItem={renderItem}
                contentContainerStyle={{flex: 1}}
              />
            </View>
          ) : null}
          {listTodoHookState?.length ? (
            <View style={{flex: 1, marginVertical: 20}}>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                Hook List:
              </Text>
              <FlatList
                data={listTodoHookState}
                renderItem={renderItem}
                contentContainerStyle={{flex: 1}}
              />
            </View>
          ) : null}
          {listTodoMobx?.length ? (
            <View style={{flex: 1, marginVertical: 20}}>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                MobX List:
              </Text>
              <FlatList
                data={listTodoMobx || []}
                renderItem={renderItem}
                contentContainerStyle={{flex: 1}}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTE_KEYS.INPUT)}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          backgroundColor: color,
          margin: 10,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Add todo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTE_KEYS.SEARCH)}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          backgroundColor: color,
          margin: 10,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Search screen</Text>
      </TouchableOpacity>
    </View>
  ));
}

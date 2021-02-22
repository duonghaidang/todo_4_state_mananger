import React, {useState} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {REDUX} from '../../redux/store/types';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {addTodo, todoList} from '../../recoil/todoStore';
import {createState, useState as useStateHook} from '@hookstate/core';
import {todoListHook, useTodoHookState} from '../../hookstate';
import {useTodoStore} from '../../mobx/context';
import {WIDTH} from '../../utils/scale';
import randomcolor from 'randomcolor';

export default function Input({navigation}) {
  const color = '#ef4a6b'; // randomcolor();

  //! REDUX
  const dispatch = useDispatch();
  const onSubmitRedux = (titleRedux) => {
    if (titleRedux?.length) {
      const payload = {
        id: Math.random().toString(36),
        title: titleRedux,
        checked: false,
        type: 'REDUX',
      };
      dispatch({type: REDUX.ADD_TODO, payload: payload});
    } else {
      ToastAndroid.show('Please fill input', 3000);
    }
  };
  //! RECOIL
  // const [listTodoRc, setTodoListRc] = useRecoilState(todoList);
  const setTodoList = useSetRecoilState(addTodo);
  const onSubmitRecoil = (titleRecoil) => {
    if (titleRecoil?.length) {
      const payload = {
        id: Math.random().toString(36),
        title: titleRecoil,
        checked: false,
        type: 'RECOIL',
      };
      setTodoList(payload);
    } else {
      ToastAndroid.show('Please fill input', 3000);
    }
  };
  //! HOOK STATE
  const onSubmitHook = (titleHook) => {
    if (titleHook?.length) {
      const id = Math.random().toString(36);
      const payload = {
        id,
        title: titleHook,
        checked: false,
        type: 'HOOK',
      };

      todoListHook[id].set(payload);
    } else {
      ToastAndroid.show('Please fill input', 3000);
    }
  };

  //! Mobx
  const todoStore = useTodoStore();
  const onSubmitMobx = (titleMobx) => {
    if (titleMobx?.length) {
      const payload = {
        id: Math.random().toString(36),
        title: titleMobx,
        checked: false,
        type: 'MOBX',
      };
      todoStore.addTodo(payload, (value) => {
        console.log(value);
      });
      console.log(
        '~~~~',
        todoStore.addTodo(payload, () => {}),
      );
    } else {
      ToastAndroid.show('Please fill input', 3000);
    }
  };

  return (
    <View>
      <View
        style={{
          width: WIDTH,
          height: 40,
          justifyContent: 'space-between',
          backgroundColor: color,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 30,
            width: 60,
            borderRadius: 15,
            marginHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 16}}>{`◄ back`}</Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: '#fff',
            fontWeight: 'bold',
          }}>
          TODO APP
        </Text>
        <View style={{width: 60}} />
      </View>
      <ScrollView>
        {InputTodo('Add todo redux', (title) => onSubmitRedux(title), color)}
        {InputTodo('Add todo recoil', (title) => onSubmitRecoil(title), color)}
        {InputTodo(
          'Add todo hook state',
          (title) => onSubmitHook(title),
          color,
        )}
        {InputTodo('Add todo mobx', (title) => onSubmitMobx(title), color)}
      </ScrollView>
    </View>
  );
}
function InputTodo(titleInput, onSubmit, color) {
  const [title, setTitle] = useState('');
  return (
    <View style={{marginTop: 20}}>
      <Text style={{fontSize: 18, marginLeft: 10, color: '#606060'}}>
        {titleInput}:
      </Text>
      <View style={{flexDirection: 'row', marginLeft: 10}}>
        <TextInput
          onChangeText={setTitle}
          value={title}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: color,
            flex: 1,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            onSubmit(title);
            title?.length && setTitle('');
          }}
          style={{
            alignSelf: 'flex-end',
            backgroundColor: color,
            alignItems: 'center',
            marginHorizontal: 10,
            paddingHorizontal: 10,
          }}>
          <Text style={{fontSize: 18, color: '#fff'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {REDUX} from '../../redux/store/types';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  selectorFamily,
  useRecoilValueLoadable,
  useRecoilCallback,
} from 'recoil';
import {todoList} from '../../recoil/todoStore';
import {createState, useState as useStateHook} from '@hookstate/core';
import {todoListHook, useTodoHookState} from '../../hookstate';
import {useTodoStore} from '../../mobx/context';
import {WIDTH} from '../../utils/scale';
import randomcolor from 'randomcolor';
import {searchExample} from '../../redux/actions/todoAction';
import ListSearch from '../view/ListSearch';
import API from '../../utils/api';
import {listQuery, searchList} from '../../recoil/searchStore';
import _ from 'lodash';

export default function Search({navigation}) {
  // console.log('Search -> currentUser', currentUser);
  const color = '#ef4a6b'; // randomcolor();

  const listSearchRx = useSelector((state) => state.todoReducer.searchList);
  const [searchListRecoil, setSearchList] = useRecoilState(searchList);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRecoil, setIsLoadingRecoil] = useState(false);
  // const [listSearch, setListSearch] = useState(listSearchRx || []);

  // useEffect(() => {
  //   setListSearch(listSearchRx);
  // }, [listSearchRx]);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          height: 50,
          paddingHorizontal: 20,
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
        }}>
        <Image
          source={{uri: item.avatar}}
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: 'pink',
          }}
        />
        <Text style={{color: '#000', fontSize: 20, marginLeft: 10}}>
          {item?.name}
        </Text>
      </View>
    );
  };

  const dispatch = useDispatch();
  // console.log('searchList', searchList);
  const onSubmit = (name) => {
    if (name?.length) {
      setIsLoading(true);
      setIsLoadingRecoil(true);
      dispatch(
        searchExample(name, () => {
          setIsLoading(false);
        }),
      );
      getData(name, (isSuccess) => {
        setIsLoadingRecoil(false);
      });
    } else {
      ToastAndroid.show('Please fill input', 3000);
    }
  };

  const getData = useRecoilCallback(
    ({snapshot}) => async (name, onCompleted) => {
      try {
        const dataSearchFetch = await snapshot?.getPromise(listQuery(name));
        setSearchList(dataSearchFetch);
        onCompleted(true);
      } catch (err) {
        onCompleted(false);
      }
    },
  );

  // const testCache = (a, b) => {
  //   if (!testCache.cache) {
  //     testCache.cache = {};
  //   }
  //   console.log('~~1', testCache.cache);
  //   const key = `${a}_${b}`;
  //   const key2 = `${b}_${a}`;
  //   console.log('~~2');
  //   if (testCache.cache[key]) return testCache.cache[key];
  //   console.log('~~3');
  //   if (testCache.cache[key2]) return testCache.cache[key2];
  //   console.log('~~4');

  //   const sum = a + b;

  //   console.log('~~5', sum);

  //   testCache.cache[key] = sum;
  //   testCache.cache[key2] = sum;

  //   console.log('~~6', testCache.cache);

  //   return sum;
  // };

  // useEffect(() => {
  //   console.log('testCache(5, 6)', testCache(1, 6));
  // }, []);

  return (
    <View style={{flex: 1}}>
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
          SEARCH SCREEN
        </Text>
        <View style={{width: 60}} />
      </View>
      {InputTodo(
        'Name',
        (title) => {
          onSubmit(title);
        },
        color,
      )}
      <View style={{flex: 1}}>
        <Text style={{marginTop: 10, marginLeft: 10}}>RECOIL</Text>
        {isLoadingRecoil || !searchListRecoil?.length ? (
          <Text style={{marginTop: 50, width: WIDTH, textAlign: 'center'}}>
            {!searchListRecoil?.length ? 'No data' : 'Loading...'}
          </Text>
        ) : (
          <FlatList data={searchListRecoil || []} renderItem={renderItem} />
        )}
      </View>
      <View style={{flex: 1}}>
        <Text style={{marginTop: 10, marginLeft: 10}}>REDUX</Text>
        {isLoading || !listSearchRx?.length ? (
          <Text style={{marginTop: 50, width: WIDTH, textAlign: 'center'}}>
            {!listSearchRx?.length ? 'No data' : 'Loading...'}
          </Text>
        ) : (
          <FlatList data={listSearchRx} renderItem={renderItem} />
        )}
      </View>
    </View>
  );
}
function InputTodo(titleInput, onSubmit, color) {
  const [title, setTitle] = useState('');

  const onChangeText = _.debounce((text) => {
    console.log('goi api ne');
    onSubmit(text);
  }, 1000);

  return (
    <View style={{marginTop: 20}}>
      <Text style={{fontSize: 18, marginLeft: 10, color: '#606060'}}>
        {titleInput}:
      </Text>
      <View style={{flexDirection: 'row', marginLeft: 10}}>
        <TextInput
          onChangeText={onChangeText}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: color,
            flex: 1,
          }}
          // onSubmitEditing={() => {
          //   onSubmit(title);
          // }}
        />
        {/* <TouchableOpacity
          onPress={() => {
            onSubmit(title);
          }}
          style={{
            alignSelf: 'flex-end',
            backgroundColor: color,
            alignItems: 'center',
            marginHorizontal: 10,
            paddingHorizontal: 10,
          }}>
          <Text style={{fontSize: 18, color: '#fff'}}>Search</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {useRecoilValue} from 'recoil';
import {searchList} from '../../recoil/searchStore';
import {WIDTH} from '../../utils/scale';

export default function ListSearch() {
  const searchListRecoil = useRecoilValue(searchList);
  const isLoadingRecoil = false;
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
  return (
    <View>
      {isLoadingRecoil || !searchListRecoil?.length ? (
        <Text style={{marginTop: 50, width: WIDTH, textAlign: 'center'}}>
          {!searchListRecoil?.length ? 'No data' : 'Loading...'}
        </Text>
      ) : (
        <FlatList data={searchListRecoil || []} renderItem={renderItem} />
      )}
    </View>
  );
}

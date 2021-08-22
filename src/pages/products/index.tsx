/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/core';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ListRenderItem,
  ActivityIndicator,
  RefreshControl,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import { getProducts, productItem } from '../../redux/produts/productAction';
import { RootState } from '../../redux/rootReducer';
import styleds from './styles';

interface productsProps {
  navigation: NavigationProp<RootStackParamList>
}
const Login: React.FC<productsProps> = ({ navigation }) => {

  const scrollY = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  const { loading, products } = useSelector<RootState, any>(state => state.productReducer);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const LoadingItem = () => {
    return (
      <View style={styleds.loadingComponent}>
        <ActivityIndicator size="large" color="#ff2656" />
      </View>
    );
  };

  const renderItem: ListRenderItem<productItem> = ({ item, index }) => {

    const inputRange = [-1, 0, 110 * (index), 110 * (index + 2)];
    const opacityRange = [-1, 0, 110 * (index), 110 * (index + 1)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange: opacityRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View style={[styleds.item, { transform: [{ scale }], opacity }]}>
        <Text
          numberOfLines={3}
          textBreakStrategy="highQuality"
          style={styleds.itemDescription}
        >{item.Descricao}</Text>
        <Text style={styleds.itemPrice}>R$ {(item.Preco).toFixed(2).replace('.', ',')}</Text>
      </Animated.View>
    );
  };

  const emptyComponent = () => (
    <View>
      <Text>Não há produtos a serem mostrados</Text>
    </View>
  );

  const clearStorage = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');

  };


  const onRefresh = () => {
    setRefreshing(false);
    dispatch(getProducts());
  };

  const LoggoutButton = () => {
    return (
      <View style={{ height: 70, marginBottom: 5, paddingHorizontal:15, backgroundColor: '#ff2656', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Image source={require('../../assets/market_easy.png')} style={{ width: 55, borderRadius: 50, height: 55, borderWidth: 1 }} />
        <TouchableOpacity onPress={clearStorage} style={{ flexDirection: 'row', padding: 10, width: 90, height: 40, backgroundColor: 'white', borderRadius: 12, justifyContent: 'space-around', alignItems: 'center' }}>
          <Image source={require('../../assets/logout.png')} />
          <Text>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <LoggoutButton/>
      {loading ? <LoadingItem /> : <Animated.FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.Codigo}-id`}
        ListEmptyComponent={emptyComponent}
        ListFooterComponent={() => <View style={{ height: 70, backgroundColor: 'white' }} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ], { useNativeDriver: false })}

      />
      }
      <View style={styleds.bottomContainer}>
        <View style={{ width: '50%' }} />
        <TouchableOpacity style={{ padding: 10, borderRadius: 12, elevation: 2, backgroundColor: 'white' }} onPress={() => dispatch(getProducts())}>
          <Text>Carregar produtos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

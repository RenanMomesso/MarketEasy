/* eslint-disable prettier/prettier */
import { NavigationProp } from "@react-navigation/core";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ListRenderItem,
  ActivityIndicator,
  RefreshControl,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../../../App";
import { getProducts, productItem } from "../../redux/produts/productAction";
import { RootState } from "../../redux/rootReducer";
import { Root, Popup } from "react-native-popup-confirm-toast";
import styleds from "./styles";
import { userReducerProps } from "../login";
import { clearTokens } from "../../redux/user/userAction";
import { tokenExpires } from "../../utils/tokenExpiration";

interface productsProps {
  navigation: NavigationProp<RootStackParamList>;
}

interface reducerStates {
  loading: boolean;
  products: productItem[];
  error?: any;
}

const Producuts: React.FC<productsProps> = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  const { loading, products } = useSelector<RootState, reducerStates>(
    state => state.productReducer,
  );

  const { token, tokenExpiration } = useSelector<RootState, userReducerProps>(
    state => state.userReducer,
  );

  const handleVerifyTokenExpiration = (): void => {
    const tokenExpired = tokenExpires(tokenExpiration);
    if (!token || tokenExpired) {
      Popup.show({
        type: "danger",
        title: "Token expirado",
        textBody: "Você será redirecionado",
        timing: 3000,
      });
      setTimeout(() => {
        navigation.navigate("Login");
        dispatch(clearTokens());
      }, 2000);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
    handleVerifyTokenExpiration();
  }, [dispatch]);

  const LoadingItem = () => {
    return (
      <View style={styleds.loadingComponent}>
        <ActivityIndicator size="large" color="#ff2656" />
      </View>
    );
  };

  const renderItem: ListRenderItem<productItem> = ({ item, index }) => {
    const inputRange = [-1, 0, 110 * index, 110 * (index + 2)];
    const opacityRange = [-1, 0, 110 * index, 110 * (index + 1)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange: opacityRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View
        style={[styleds.item, { transform: [{ scale }], opacity }]}
      >
        <Text
          numberOfLines={3}
          textBreakStrategy="highQuality"
          style={styleds.itemDescription}
        >
          {item.Descricao}
        </Text>
        <Text style={styleds.itemPrice}>
          R$ {item.Preco.toFixed(2).replace(".", ",")}
        </Text>
      </Animated.View>
    );
  };

  const emptyComponent = () => (
    <View>
      <Text>Não há produtos a serem mostrados</Text>
    </View>
  );

  const clearStorage = () => {
    dispatch(clearTokens());
    Popup.show({
      type: "success",
      title: "Logout realizado",
      textBody: "você será redirecionado",
      timing: 2000,
    });
    setTimeout(() => {
      navigation.reset({
        routes:[{name:'Login'}]
      })
    }, 2000);
  };

  const onRefresh = () => {
    setRefreshing(false);
    dispatch(getProducts());
  };

  const HeaderTop = () => {
    return (
      <View style={styleds.headerTop}>
        <Image
          source={require("../../assets/market_easy.png")}
          style={{ width: 55, borderRadius: 50, height: 55, borderWidth: 1 }}
        />
        <TouchableOpacity onPress={clearStorage} style={styleds.loggoutButton}>
          <Image
            source={require("../../assets/logout.png")}
            style={{ tintColor: "#ff2656" }}
          />
          <Text>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Root>
      <View style={{ flex: 1 }}>
        <HeaderTop />
        {loading ? (
          <LoadingItem />
        ) : (
          <Animated.FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={item => `${item.Codigo}-id`}
            ListEmptyComponent={emptyComponent}
            ListFooterComponent={() => (
              <View style={{ height: 70, backgroundColor: "white" }} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false },
            )}
          />
        )}
        <View style={styleds.bottomContainer}>
          <View style={{ width: "50%" }} />
          <TouchableOpacity
            style={styleds.loadButton}
            onPress={() => {
              dispatch(getProducts());
              handleVerifyTokenExpiration();
            }}
          >
            <Text>Carregar produtos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Root>
  );
};

export default Producuts;

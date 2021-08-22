import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions
} from "@react-navigation/stack";

import Login from "./src/pages/login";
import Products from "./src/pages/products";
import { PersistGate } from "redux-persist/integration/react";

export type RootStackParamList = {
  Login: undefined;
  Products: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const navigationOptions: StackNavigationOptions = {
    headerShown: false
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={navigationOptions}
        >
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

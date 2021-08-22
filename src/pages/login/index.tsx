/* eslint-disable prettier/prettier */
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import styleds from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/user/userAction";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { Root, Popup } from "react-native-popup-confirm-toast";
import Wave from "../../components/Wave";
import { RootState } from "../../redux/rootReducer";

interface loginProps {
  navigation: NavigationProp<RootStackParamList>;
}

export interface userReducerProps {
  token: string;
  tokenExpiration: string;
}

const Login: React.FC<loginProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const userInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [user, setUser] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const [userFocused, setUserFocused] = useState<boolean>(false);
  const [passFocused, setPassFocused] = useState<boolean>(false);

  const { token } = useSelector<RootState, userReducerProps>(
    state => state.userReducer
  );

  console.log("TOKEN", token)
  const getUserToken = () => {
    if (token) {
      navigation.navigate('Products')
    }
  };
  useFocusEffect(() => {
    getUserToken();
  });

  const handleLoginButton = () => {
    if (user.length < 1 && pass.length < 1) {
      Popup.show({
        type: "danger",
        title: "Error",
        textBody: "Email e senha obrigatórios",
        timing: 2000
      });
      return;
    }
    setTimeout(() => {
      dispatch(loginUser());
    }, 2000);

    Popup.show({
      type: "success",
      title: "Login efetuado com sucesso",
      textBody: "Você será redirecionado",
      timing: 2000
    });
    setTimeout(() => {
      navigation.navigate("Products");
      setUser("");
      setPass("");
    }, 2500);
  };

  return (
    <Root>
      <View
        style={{
          flex: 1,
          backgroundColor: "#f7f5f5e1"
        }}
      >
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <View style={styleds.topBg} />
          <Wave
            width={500}
            height={125}
            containerStyle={{
              marginTop: -20
            }}
          />
          <View style={styleds.logoBg}>
            <Image
              source={require("../../assets/market_easy.png")}
              style={[styleds.imageLogo, StyleSheet.absoluteFill]}
            />
          </View>

          <View style={styleds.modalLogin}>
            <Text style={styleds.h1}>Seja bem vindo</Text>
            <Text style={styleds.h4}>Faça o login para prosseguir.</Text>
            <TouchableOpacity
              style={styleds.inputButton}
              onPress={() => userInputRef.current?.focus()}
            >
              <Image
                source={require("../../assets/o-email.png")}
                style={[
                  styleds.iconImage,
                  { tintColor: userFocused ? "#ff2656" : "black" }
                ]}
              />
              <TextInput
                ref={userInputRef}
                style={[styleds.inputText]}
                value={user}
                onChangeText={e => setUser(e)}
                onFocus={() => setUserFocused(true)}
                onBlur={() => setUserFocused(false)}
                placeholder="Digite seu email"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styleds.inputButton}
              onPress={() => passwordInputRef.current?.focus()}
            >
              <Image
                source={require("../../assets/passkey.png")}
                style={[
                  styleds.iconImage,
                  { tintColor: passFocused ? "#ff2656" : "black" }
                ]}
              />
              <TextInput
                ref={passwordInputRef}
                style={styleds.inputText}
                value={pass}
                secureTextEntry={true}
                onFocus={() => setPassFocused(true)}
                onBlur={() => setPassFocused(false)}
                placeholder="Digite sua senha"
                onChangeText={e => setPass(e)}
              />
            </TouchableOpacity>
            <View style={styleds.forgotPassword}>
              <Text style={styleds.forgotPasswordText}>
                Esqueci minha senha
              </Text>
            </View>
            <TouchableOpacity
              style={styleds.loginButton}
              onPress={handleLoginButton}
            >
              <Text style={styleds.loginButtonText}>ENTRAR</Text>
            </TouchableOpacity>
          </View>
          <Wave
            width={500}
            height={125}
            containerStyle={{
              marginTop: 90,
              transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }],
              marginBottom: -25
            }}
          />

          <View style={styleds.bgFooter}>
            <View style={styleds.bgFooterImages}>
              <Image
                source={require("../../assets/googleIcon.png")}
                style={{ width: 47, height: 47 }}
              />
              <Image
                source={require("../../assets/facebook.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styleds.textRegisterFirst}>
                Ainda não é cadastrado?{" "}
              </Text>
              <Text style={styleds.textRegisterLast}>Cadastre-se aqui</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Root>
  );
};

export default Login;

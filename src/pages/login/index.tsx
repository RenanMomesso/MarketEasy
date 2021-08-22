/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import styleds from './styles';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/user/userAction';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Root, Popup } from 'react-native-popup-confirm-toast';

interface loginProps {
  navigation: NavigationProp<RootStackParamList>
}

const Login: React.FC<loginProps> = ({ navigation }) => {

  const dispatch = useDispatch();


  const userInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [user, setUser] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const [userFocused, setUserFocused] = useState<boolean>(false);

  const getUserToken = async () => {
    const getToken = await AsyncStorage.getItem('token');
    if (getToken) { navigation.navigate('Products'); }
  };
  useFocusEffect(() => {
    getUserToken();
  });

  const handleLoginButton = () => {
    if (user.length < 1 && pass.length < 1) {
      Popup.danger({
        type:'danger',
        title:'Erro ao logar',
        textBody:'Usuario ou senha maior que 1 dígito',
      });
    }
    dispatch(loginUser());
    Popup.show({
      type: 'success',
      title: 'Login efetuado com sucesso',
      textBody: 'você será redirecionado',
      timing:2000,
    });
    setTimeout(() => {
      navigation.navigate('Products');
    }, 3000);

  };

  return (
    <Root>


      <View style={{
        flex: 1,
        backgroundColor: '#f7f5f5e1',
      }}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <View style={styleds.topBg} />
          <Svg color="blue" viewBox="0 0 1440 320" width={500} height={125} style={{ marginTop: -20 }}>
            <Path fill={'#ff2656'} fillOpacity="1" fillRule="evenodd" d="M1,320L45,293.3C80,267,160,213,240,176C320,139,400,117,480,112C560,107,640,117,720,149.3C800,181,880,235,960,240C1040,245,1120,203,1200,197.3C1280,192,1360,224,1400,240L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z" />
          </Svg>
          <View style={styleds.logoBg}>
            <Image source={require('../../assets/market_easy.png')} style={[styleds.imageLogo, StyleSheet.absoluteFill]} />
          </View>

          <View style={styleds.modalLogin}>
            <Text style={styleds.h1}>Seja bem vindo</Text>
            <Text style={styleds.h4}>Faça o login para prosseguir.</Text>
            <TouchableOpacity
              style={styleds.inputButton}
              onPress={() => userInputRef.current?.focus()}>
              <Image
                source={require('../../assets/o-email.png')}
                style={[styleds.iconImage, { tintColor: userFocused ? '#ff2656' : 'black' }]} />
              <TextInput
                ref={userInputRef}
                style={[styleds.inputText]}
                value={user} onChangeText={(e) => setUser(e)}
                onFocus={() => setUserFocused(true)}
                onBlur={() => setUserFocused(false)}
                placeholder="Digite seu email"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styleds.inputButton}
              onPress={() => passwordInputRef.current?.focus()}>
              <Image
                source={require('../../assets/passkey.png')}
                style={styleds.iconImage} />
              <TextInput
                ref={passwordInputRef}
                style={styleds.inputText}
                value={pass}
                placeholder="Digite sua senha"
                onChangeText={(e) => setPass(e)} />
            </TouchableOpacity>
            <View style={styleds.forgotPassword}>
              <Text style={styleds.forgotPasswordText}>Esqueci minha senha</Text>
            </View>
            <TouchableOpacity style={styleds.loginButton} onPress={handleLoginButton}>
              <Text style={styleds.loginButtonText}>ENTRAR</Text>
            </TouchableOpacity>
          </View>
          <Svg color="blue" viewBox="0 0 1440 320" width={500} height={125} style={{ marginTop: 90, transform: [{ rotateX: '180deg' }, { rotateY: '180deg' }], marginBottom: -25 }}>
            <Path fill={'#ff2656'} fillOpacity="1" fillRule="evenodd" d="M1,320L45,293.3C80,267,160,213,240,176C320,139,400,117,480,112C560,107,640,117,720,149.3C800,181,880,235,960,240C1040,245,1120,203,1200,197.3C1280,192,1360,224,1400,240L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z" />
          </Svg>
          <View style={{
            backgroundColor: '#ff2656', width: '100%', height: 120, justifyContent: 'center',
            paddingBottom: 50,
            alignItems: 'center',
          }}>
            <View style={{
              width: '30%',
              height: 80,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>

              <Image source={require('../../assets/googleIcon.png')} style={{ width: 47, height: 47 }} />
              <Image source={require('../../assets/facebook.png')} style={{ width: 50, height: 50 }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styleds.textRegisterFirst}>Ainda não é cadastrado? </Text>
              <Text style={styleds.textRegisterLast}>Cadastre-se aqui</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Root>
  );
};



export default Login;

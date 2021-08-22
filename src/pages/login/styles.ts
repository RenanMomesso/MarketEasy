/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    logoBg: {
        borderRadius: 50,
        height: 120,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        marginTop: -120,
        alignSelf: 'center',
    },
    imageLogo: {
        height: 120,
        width: 120,
        borderRadius: 50,
    },
    topBg: {
        backgroundColor: '#ff2656',
        width: '100%',
        height: 100,
    },
    modalLogin: {
        width: width - 30,
        alignSelf: 'center',
        height: 250,
        paddingTop: 30,
    },
    inputButton: {
        width: '90%',
        alignSelf: 'center',
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        padding: 5,
        marginBottom: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {

        width: 300,
        height: 40,
        flexDirection: 'row',
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        alignItems: 'center',

    },
    iconImage: {
        width: 28,
        height: 28,
        marginLeft: 10,
    },
    loginButton:{
        width: width - 60,
        alignSelf:'center',
        backgroundColor:'#ff2656',
        padding: 5,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:15,
        height: 40,
    },
    loginButtonText:{
        fontSize:14,
        color: '#fff',
        fontWeight:'bold',
        textTransform:'uppercase',
    },
    h1:{
        alignSelf:'center',
        fontSize:25,
        fontWeight:'bold',


    },
    h4:{
        alignSelf:'center',
        fontSize:16,
        marginVertical:10,
    },
    forgotPassword:{
        width: width - 60,
        alignSelf:'center',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        paddingRight: 5,
    },
    forgotPasswordText:{
        color:'black',
        opacity: 0.5,
    },
    textRegisterFirst:{
        fontWeight: 'bold',
        fontSize: width * 0.04,
        color: 'white',
      },
      textRegisterLast:{
        fontWeight: 'bold',
        fontSize: width * 0.03,
        color: 'lightblue',
      },
});

export default styles;

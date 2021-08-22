import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    header: {
        height: 100,
    },
    headerTop: {
        height: 70,
        marginBottom: 5,
        paddingHorizontal: 15,
        backgroundColor: '#ff2656',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    loadingComponent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        position: 'absolute',
        height: 60,
        width: '100%',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        justifyContent: 'space-around',
        backgroundColor: '#ff2656',
        marginTop: 20,
    },
    item: {
        height: 100,
        width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 2,
        backgroundColor: 'white',
    },
    itemDescription: {
        flexWrap: 'wrap',
        width: '50%',
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    itemPrice: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'orange',
        fontSize: 15,
        fontWeight: 'bold',
    },
    loggoutButton: {
        flexDirection: 'row',
        padding: 10,
        width: 90,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 12,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    loadButton: {
        padding: 10,
        borderRadius: 12,
        elevation: 2,
        backgroundColor: 'white',
    },
});

export default styles;

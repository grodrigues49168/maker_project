import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      upperText: {
        position: 'absolute',
        top: 20,
        fontSize: 18,
      },
      lowerText: {
        position: 'absolute',
        bottom: 20,
        fontSize: 18,
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      card: {
        width: 200,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      buttonText: {
        marginLeft: 10,
        color: 'black'}
        
})
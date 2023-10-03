import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Adicionado padding para espaçamento interno
  },
  upperText: {
    fontSize: 18,
    marginBottom: 20, // Adicionado espaçamento inferior
  },
  lowerText: {
    fontSize: 18,
    marginTop: 20, // Adicionado espaçamento superior
  },
  buttonsContainer: {
    flexDirection: 'column', // Alterado para coluna para empilhar os botões em telas menores
    alignItems: 'center', // Centraliza os botões verticalmente
    marginTop: 20, // Adicionado espaçamento superior
  },
  card: {
    width: '100%', // Ocupa a largura máxima disponível
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10, // Adicionado espaçamento inferior
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
    padding: 20
  },
  buttonText: {
    marginLeft: 10,
    color: 'black',
  },
});
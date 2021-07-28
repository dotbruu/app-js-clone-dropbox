import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 30,
  },
  logo: {
    width: 160,
    height: 40,
    alignSelf: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 16,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  button: {
    height: 48,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#356C62',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});

export default styles;
